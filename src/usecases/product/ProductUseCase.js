class ProductUseCase {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  async createProduct(productData) {
    return await this.productRepository.create(productData);
  }

  async getAllProducts() {
    return await this.productRepository.findAll();
  }

  async getProductById(id) {
    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  }

  async updateProduct(id, productData) {
    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new Error('Product not found');
    }
    return await this.productRepository.update(id, productData);
  }

  async deleteProduct(id) {
    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new Error('Product not found');
    }
    return await this.productRepository.delete(id);
  }
}

module.exports = ProductUseCase;