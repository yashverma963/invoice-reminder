const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  amount: Number,
  dueDate: Date,
  recipient: String,
  status: { type: String, default: 'due' },
});

module.exports = mongoose.model('Invoice', invoiceSchema);
