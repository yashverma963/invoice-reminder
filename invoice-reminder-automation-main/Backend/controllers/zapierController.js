const axios = require('axios');
const Invoice = require('../models/Invoice');

exports.sendReminder = async (req, res) => {
  try {
    const dueInvoices = await Invoice.find({ userId: req.session.userId, status: 'due' });
    
    dueInvoices.forEach(async (invoice) => {
      await axios.post(process.env.ZAPIER_WEBHOOK_URL, {
        invoiceId: invoice._id,
        amount: invoice.amount,
        dueDate: invoice.dueDate,
        recipient: invoice.recipient
      });
    });

    console.log('Reminders sent successfully'); // Log success
    res.status(200).json({ message: 'Reminders sent' });
  } catch (error) {
    console.error('Error sending reminders:', error); // Log error
    res.status(500).json({ error: 'Failed to send reminders' });
  }
};
