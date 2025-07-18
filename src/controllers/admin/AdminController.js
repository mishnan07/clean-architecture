class AdminController {
  constructor(adminAuthUseCase, productUseCase) {
    this.adminAuthUseCase = adminAuthUseCase;
    this.productUseCase = productUseCase;
  }

  async register(req, res) {
    try {
      const result = await this.adminAuthUseCase.register(req.body);
      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const result = await this.adminAuthUseCase.login(email, password);
      res.json(result);
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  }

  async createProduct(req, res) {
    try {
      const product = await this.productUseCase.createProduct(req.body);
      res.status(201).json(product);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getProducts(req, res) {
    try {
      const products = await this.productUseCase.getAllProducts();
      res.json(products);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async updateProduct(req, res) {
    try {
      const product = await this.productUseCase.updateProduct(req.params.id, req.body);
      res.json(product);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async deleteProduct(req, res) {
    try {
      await this.productUseCase.deleteProduct(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = AdminController;