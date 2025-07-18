class ProductController {
  constructor(productUseCase) {
    this.productUseCase = productUseCase;
  }

  async getProducts(req, res) {
    try {
      const products = await this.productUseCase.getAllProducts();
      res.json(products);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getProduct(req, res) {
    try {
      const product = await this.productUseCase.getProductById(req.params.id);
      res.json(product);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
}

module.exports = ProductController;