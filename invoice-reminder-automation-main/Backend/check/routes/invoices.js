const express = require('express');
const Invoice = require('../models/Invoice');
const router = express.Router();

// Middleware to check authentication
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/auth/google');
}

router.use(ensureAuthenticated);

// Endpoint to get due invoices
router.get('/', async (req, res) => {
    try {
        const invoices = await Invoice.find({ userId: req.user.id, status: 'due' });
        res.json(invoices);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch invoices' });
    }
});

// Endpoint to get past-due invoices and trigger Zapier automation
router.get('/past-due', async (req, res) => {
    try {
        const invoices = await Invoice.find({ userId: req.user.id, status: 'past-due' });
        res.json(invoices);
        invoices.forEach(invoice => {
            // Trigger Zapier webhook for each past-due invoice
            zapierService.triggerPastDueReminder(invoice);
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch invoices' });
    }
});

module.exports = router;
