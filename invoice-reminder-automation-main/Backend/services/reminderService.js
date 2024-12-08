const cron = require('node-cron');
const axios = require('axios');
const Invoice = require('../models/Invoice');

cron.schedule('0 0 * * *', async () => {  // Run every day at midnight
  try {
    const dueInvoices = await Invoice.find({ status: 'due' });

    for (const invoice of dueInvoices) {
      await axios.post(process.env.ZAPIER_WEBHOOK_URL, {
        invoiceId: invoice._id,
        amount: invoice.amount,
        dueDate: invoice.dueDate,
        recipient: invoice.recipient
      });
    }

    console.log('Daily reminders sent');
  } catch (error) {
    console.error('Error sending reminders:', error);
  }
});
