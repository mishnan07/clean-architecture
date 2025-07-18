class UserController {
  constructor(userAuthUseCase, bankDetailsUseCase) {
    this.userAuthUseCase = userAuthUseCase;
    this.bankDetailsUseCase = bankDetailsUseCase;
  }

  async register(req, res) {
    try {
      const result = await this.userAuthUseCase.register(req.body);
      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const result = await this.userAuthUseCase.login(email, password);
      res.json(result);
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  }

  async getProfile(req, res) {
    try {
      const user = await this.userAuthUseCase.getProfile(req.user.id);
      res.json(user);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async addBankDetails(req, res) {
    try {
      const bankDetails = await this.bankDetailsUseCase.addBankDetails(req.user.id, req.body);
      res.status(201).json(bankDetails);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getBankDetails(req, res) {
    try {
      const bankDetails = await this.bankDetailsUseCase.getUserBankDetails(req.user.id);
      res.json(bankDetails);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async updateBankDetails(req, res) {
    try {
      const bankDetails = await this.bankDetailsUseCase.updateBankDetails(req.params.id, req.body);
      res.json(bankDetails);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async deleteBankDetails(req, res) {
    try {
      await this.bankDetailsUseCase.deleteBankDetails(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = UserController;