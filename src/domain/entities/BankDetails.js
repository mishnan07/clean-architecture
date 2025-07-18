class BankDetails {
  constructor({ id, userId, bankName, accountNumber, routingNumber, accountHolderName, createdAt, updatedAt }) {
    this.id = id;
    this.userId = userId;
    this.bankName = bankName;
    this.accountNumber = accountNumber;
    this.routingNumber = routingNumber;
    this.accountHolderName = accountHolderName;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

module.exports = BankDetails;