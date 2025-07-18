const express = require('express');
const UserController = require('../controllers/user/UserController');
const UserAuthUseCase = require('../usecases/user/UserAuthUseCase');
const BankDetailsUseCase = require('../usecases/user/BankDetailsUseCase');
const UserRepository = require('../repositories/user/UserRepository');
const BankDetailsRepository = require('../repositories/user/BankDetailsRepository');
const { authenticateUser } = require('../middlewares/authMiddleware');
const { validate } = require('../middlewares/validationMiddleware');
const { registerSchema, loginSchema, bankDetailsSchema } = require('../schemas/userSchemas');

const router = express.Router();

// Initialize dependencies
const userRepository = new UserRepository();
const bankDetailsRepository = new BankDetailsRepository();
const userAuthUseCase = new UserAuthUseCase(userRepository);
const bankDetailsUseCase = new BankDetailsUseCase(bankDetailsRepository);
const userController = new UserController(userAuthUseCase, bankDetailsUseCase);

// Auth routes
router.post('/register', validate(registerSchema), (req, res) => userController.register(req, res));
router.post('/login', validate(loginSchema), (req, res) => userController.login(req, res));

// Protected routes
router.get('/profile', authenticateUser, (req, res) => userController.getProfile(req, res));
router.post('/bank-details', authenticateUser, validate(bankDetailsSchema), (req, res) => userController.addBankDetails(req, res));
router.get('/bank-details', authenticateUser, (req, res) => userController.getBankDetails(req, res));
router.put('/bank-details/:id', authenticateUser, validate(bankDetailsSchema), (req, res) => userController.updateBankDetails(req, res));
router.delete('/bank-details/:id', authenticateUser, (req, res) => userController.deleteBankDetails(req, res));

module.exports = router;