const express = require('express');
const router = express.Router();

// Define routes for user profiles
router.get('/', (req, res) => {
    res.send('Get all profiles');
});

router.get('/:id', (req, res) => {
    res.send(`Get profile with ID: ${req.params.id}`);
});

router.post('/', (req, res) => {
    res.send('Create a new profile');
});

router.put('/:id', (req, res) => {
    res.send(`Update profile with ID: ${req.params.id}`);
});

router.delete('/:id', (req, res) => {
    res.send(`Delete profile with ID: ${req.params.id}`);
});

module.exports = router;
