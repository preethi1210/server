const express = require('express');
const router = express.Router();

// Define routes for users
router.get('/', (req, res) => {
    res.send('Get all users');
});

router.get('/:id', (req, res) => {
    res.send(`Get user with ID: ${req.params.id}`);
});

router.post('/', (req, res) => {
    res.send('Register a new user');
});

router.put('/:id', (req, res) => {
    res.send(`Update user with ID: ${req.params.id}`);
});

router.delete('/:id', (req, res) => {
    res.send(`Delete user with ID: ${req.params.id}`);
});

module.exports = router;
