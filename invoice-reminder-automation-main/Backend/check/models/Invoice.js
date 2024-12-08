const mongoose = require('mongoose');

const InvoiceSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    dueDate: { type: Date, required: true },
    recipient: { type: String, required: true },
    status: { type: String, enum: ['due', 'paid', 'past-due'], default: 'due' },
});

module.exports = mongoose.model('Invoice', InvoiceSchema);
