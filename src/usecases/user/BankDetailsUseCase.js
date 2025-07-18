class BankDetailsUseCase {
  constructor(bankDetailsRepository) {
    this.bankDetailsRepository = bankDetailsRepository;
  }

  async addBankDetails(userId, bankData) {
    return await this.bankDetailsRepository.create({ ...bankData, userId });
  }

  async getUserBankDetails(userId) {
    return await this.bankDetailsRepository.findByUserId(userId);
  }

  async updateBankDetails(id, bankData) {
    const bankDetails = await this.bankDetailsRepository.findById(id);
    if (!bankDetails) {
      throw new Error('Bank details not found');
    }
    return await this.bankDetailsRepository.update(id, bankData);
  }

  async deleteBankDetails(id) {
    const bankDetails = await this.bankDetailsRepository.findById(id);
    if (!bankDetails) {
      throw new Error('Bank details not found');
    }
    return await this.bankDetailsRepository.delete(id);
  }
}

module.exports = BankDetailsUseCase;