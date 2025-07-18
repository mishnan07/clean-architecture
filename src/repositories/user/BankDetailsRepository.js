const BankDetailsModel = require('../../models/BankDetailsModel');
const BankDetails = require('../../domain/entities/BankDetails');

class BankDetailsRepository {
  async create(bankData) {
    const bankDetails = new BankDetailsModel(bankData);
    const savedBankDetails = await bankDetails.save();
    return new BankDetails(savedBankDetails.toObject());
  }

  async findByUserId(userId) {
    const bankDetails = await BankDetailsModel.find({ userId });
    return bankDetails.map(bank => new BankDetails(bank.toObject()));
  }

  async findById(id) {
    const bankDetails = await BankDetailsModel.findById(id);
    return bankDetails ? new BankDetails(bankDetails.toObject()) : null;
  }

  async update(id, bankData) {
    const bankDetails = await BankDetailsModel.findByIdAndUpdate(id, bankData, { new: true });
    return bankDetails ? new BankDetails(bankDetails.toObject()) : null;
  }

  async delete(id) {
    return await BankDetailsModel.findByIdAndDelete(id);
  }
}

module.exports = BankDetailsRepository;