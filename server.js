// Police Records Management System - Test Commit
const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const mysql = require('mysql2');
const natural = require('natural');
const metaphone = natural.Metaphone;
const JaroWinklerDistance = natural.JaroWinklerDistance;

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Basic middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

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
        console.error('Database connection failed:', err);
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
    db.query('SELECT id, name, age, gender, address, phone, aadhaar_number, image_path, created_at, updated_at FROM persons', (err, results) => {
        if (err) {
            console.error('Error fetching persons:', err);
            res.status(500).json({ error: 'Failed to fetch persons' });
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
    const id = req.params.id;
    db.query('SELECT id, name, age, gender, address, phone, aadhaar_number, image_path, created_at, updated_at FROM persons WHERE id = ?', [id], (err, results) => {
        if (err) {
            console.error('Error fetching person:', err);
            res.status(500).json({ error: 'Failed to fetch person' });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ error: 'Person not found' });
            return;
        }
        res.json(results[0]);
    });
});

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
const PORT = 3000;  // Using fixed port 3000
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Access the application at http://localhost:${PORT}`);
}).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use. Please try a different port.`);
        process.exit(1);
    } else {
        console.error('Server error:', err);
    }
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM received. Shutting down gracefully...');
    server.close(() => {
        console.log('Server closed');
        db.end((err) => {
            if (err) {
                console.error('Error closing database connection:', err);
            }
            process.exit(0);
        });
    });
});

process.on('SIGINT', () => {
    console.log('SIGINT received. Shutting down gracefully...');
    server.close(() => {
        console.log('Server closed');
        db.end((err) => {
            if (err) {
                console.error('Error closing database connection:', err);
            }
            process.exit(0);
        });
    });
}); 