const express = require('express');
const router = express.Router();

// Define routes for courses
router.get('/', (req, res) => {
    res.send('Get all courses');
});

router.get('/:id', (req, res) => {
    res.send(`Get course with ID: ${req.params.id}`);
});

router.post('/', (req, res) => {
    res.send('Create a new course');
});

router.put('/:id', (req, res) => {
    res.send(`Update course with ID: ${req.params.id}`);
});

router.delete('/:id', (req, res) => {
    res.send(`Delete course with ID: ${req.params.id}`);
});

module.exports = router;
