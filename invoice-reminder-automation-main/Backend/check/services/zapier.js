const axios = require('axios');

exports.triggerPastDueReminder = async (invoice) => {
    try {
        await axios.post(process.env.ZAPIER_WEBHOOK_URL, {
            invoiceId: invoice._id,
            amount: invoice.amount,
            dueDate: invoice.dueDate,
            recipient: invoice.recipient,
        });
        console.log('Zapier webhook triggered for invoice:', invoice._id);
    } catch (error) {
        console.error('Failed to trigger Zapier webhook', error);
    }
};
