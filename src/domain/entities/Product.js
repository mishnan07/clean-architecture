class Product {
  constructor({ id, name, description, price, category, stock, createdAt, updatedAt }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.category = category;
    this.stock = stock;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

module.exports = Product;