const express = require('express');
const router = express.Router();

// Define routes for payments
router.get('/', (req, res) => {
    res.send('Get all payments');
});

router.get('/:id', (req, res) => {
    res.send(`Get payment with ID: ${req.params.id}`);
});

router.post('/', (req, res) => {
    res.send('Make a payment');
});

router.put('/:id', (req, res) => {
    res.send(`Update payment with ID: ${req.params.id}`);
});

router.delete('/:id', (req, res) => {
    res.send(`Delete payment with ID: ${req.params.id}`);
});

module.exports = router;
