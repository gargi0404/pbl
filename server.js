// Police Records Management System - Test Commit
const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const mysql = require('mysql2');
const natural = require('natural');
const multer = require('multer');
const metaphone = natural.Metaphone;
const JaroWinklerDistance = natural.JaroWinklerDistance;

// Load environment variables
dotenv.config();

// Create Express app
const app = express();
const port = process.env.PORT || 3000;

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/');
    },
    filename: function (req, file, cb) {
        // Create a unique filename with timestamp
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    },
    fileFilter: function (req, file, cb) {
        // Accept only image files
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
            return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
    }
});

// Basic middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// Add error handling for static files
app.use((err, req, res, next) => {
    if (err.code === 'ENOENT') {
        console.error('File not found:', req.path);
        res.status(404).send('File not found');
    } else {
        console.error('Error serving static file:', err);
        res.status(500).send('Error serving file');
    }
});

// Database connection
const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'police_records'
});

// Connect to database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// Basic routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/search', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'search.html'));
});

app.get('/details', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'details.html'));
});

// API routes
app.get('/api/persons', (req, res) => {
    const query = 'SELECT * FROM persons';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching persons:', err);
            res.status(500).json({ error: 'Error fetching persons' });
            return;
        }
        res.json(results);
    });
});

app.get('/api/persons/search', (req, res) => {
    const query = req.query.query;
    if (!query) {
        return res.status(400).json({ error: 'Search query is required' });
    }

    db.query('SELECT id, name, age, gender, address, phone, aadhaar_number, image_path, created_at, updated_at FROM persons', (err, persons) => {
        if (err) {
            console.error('Error searching persons:', err);
            res.status(500).json({ error: 'Failed to search persons' });
            return;
        }

        // Get all variations of the name
        const matches = persons.filter(person => {
            const jaroDistance = JaroWinklerDistance(query.toLowerCase(), person.name.toLowerCase());
            const metaphoneMatch = metaphone.compare(query, person.name);
            
            // Show all variations with similar pronunciation or spelling
            return jaroDistance > 0.7 || metaphoneMatch;
        });
        
        // Sort matches by Jaro-Winkler distance (closest matches first)
        matches.sort((a, b) => {
            const distA = JaroWinklerDistance(query.toLowerCase(), a.name.toLowerCase());
            const distB = JaroWinklerDistance(query.toLowerCase(), b.name.toLowerCase());
            return distB - distA;
        });

        if (matches.length === 0) {
            res.status(404).json({ error: 'No matches found' });
            return;
        }

        res.json(matches);
    });
});

app.get('/api/persons/:id', (req, res) => {
    const query = 'SELECT * FROM persons WHERE id = ?';
    db.query(query, [req.params.id], (err, results) => {
        if (err) {
            console.error('Error fetching person:', err);
            res.status(500).json({ error: 'Error fetching person' });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ error: 'Person not found' });
            return;
        }
        res.json(results[0]);
    });
});

// Add new route for photo upload
app.post('/api/upload', upload.single('photo'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }
    const imagePath = '/uploads/' + req.file.filename;
    res.json({ 
        success: true, 
        imagePath: imagePath,
        message: 'File uploaded successfully' 
    });
});

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.log(`Access the application at http://localhost:${port}`);
}).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`Port ${port} is already in use. Please try a different port.`);
        process.exit(1);
    } else {
        console.error('Server error:', err);
    }
});

// Handle process signals
const signals = ['SIGTERM', 'SIGINT', 'SIGUSR2'];
signals.forEach(signal => {
    process.on(signal, () => {
        console.log(`\n${signal} received. Starting graceful shutdown...`);
        console.log('Closing server...');
        server.close(() => {
            console.log('Server closed successfully');
            console.log('Closing database connection...');
            db.end((err) => {
                if (err) {
                    console.error('Error closing database connection:', err);
                } else {
                    console.log('Database connection closed successfully');
                }
                console.log('Shutdown complete. Exiting...');
                process.exit(0);
            });
        });
    });
}); 