const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const PersonModel = require('../models/personModel');

// Configure multer for image upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Add new person
router.post('/add', upload.single('image'), async (req, res) => {
    try {
        const imagePath = req.file ? `/uploads/${req.file.filename}` : null;
        const personData = {
            ...req.body,
            image: imagePath
        };
        
        const id = await PersonModel.addPerson(personData);
        res.status(201).json({ id, message: 'Person added successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error adding person' });
    }
});

// Search by name
router.get('/search', async (req, res) => {
    try {
        const { query } = req.query;
        const results = await PersonModel.searchByName(query);
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: 'Error searching for person' });
    }
});

// Get person by ID
router.get('/person/:id', async (req, res) => {
    try {
        const person = await PersonModel.getPersonById(req.params.id);
        if (!person) {
            return res.status(404).json({ error: 'Person not found' });
        }
        res.json(person);
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving person details' });
    }
});

module.exports = router; 