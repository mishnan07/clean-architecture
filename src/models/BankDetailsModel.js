const mongoose = require('mongoose');

const bankDetailsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  bankName: { type: String, required: true },
  accountNumber: { type: String, required: true },
  routingNumber: { type: String, required: true },
  accountHolderName: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('BankDetails', bankDetailsSchema);