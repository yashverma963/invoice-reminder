const Invoice = require('../models/Invoice');

const getInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find({ userId: req.session.userId });
    res.json(invoices);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch invoices' });
  }
};

const getDueInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find({ userId: req.session.userId, status: 'due' });
    res.json(invoices);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch due invoices' });
  }
};

module.exports = { getInvoices, getDueInvoices };
