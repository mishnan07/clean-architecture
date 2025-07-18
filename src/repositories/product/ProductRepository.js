const ProductModel = require('../../models/ProductModel');
const Product = require('../../domain/entities/Product');

class ProductRepository {
  async create(productData) {
    const product = new ProductModel(productData);
    const savedProduct = await product.save();
    return new Product(savedProduct.toObject());
  }

  async findAll() {
    const products = await ProductModel.find();
    return products.map(product => new Product(product.toObject()));
  }

  async findById(id) {
    const product = await ProductModel.findById(id);
    return product ? new Product(product.toObject()) : null;
  }

  async update(id, productData) {
    const product = await ProductModel.findByIdAndUpdate(id, productData, { new: true });
    return product ? new Product(product.toObject()) : null;
  }

  async delete(id) {
    return await ProductModel.findByIdAndDelete(id);
  }
}

module.exports = ProductRepository;