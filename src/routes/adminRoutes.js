const express = require('express');
const AdminController = require('../controllers/admin/AdminController');
const AdminAuthUseCase = require('../usecases/admin/AdminAuthUseCase');
const ProductUseCase = require('../usecases/product/ProductUseCase');
const AdminRepository = require('../repositories/admin/AdminRepository');
const ProductRepository = require('../repositories/product/ProductRepository');
const { authenticateAdmin } = require('../middlewares/authMiddleware');
const { validate } = require('../middlewares/validationMiddleware');
const { registerSchema, loginSchema } = require('../schemas/userSchemas');
const { productSchema } = require('../schemas/productSchemas');

const router = express.Router();

// Initialize dependencies
const adminRepository = new AdminRepository();
const productRepository = new ProductRepository();
const adminAuthUseCase = new AdminAuthUseCase(adminRepository);
const productUseCase = new ProductUseCase(productRepository);
const adminController = new AdminController(adminAuthUseCase, productUseCase);

// Auth routes
router.post('/register', validate(registerSchema), (req, res) => adminController.register(req, res));
router.post('/login', validate(loginSchema), (req, res) => adminController.login(req, res));

// Protected routes
router.post('/products', authenticateAdmin, validate(productSchema), (req, res) => adminController.createProduct(req, res));
router.get('/products', authenticateAdmin, (req, res) => adminController.getProducts(req, res));
router.put('/products/:id', authenticateAdmin, validate(productSchema), (req, res) => adminController.updateProduct(req, res));
router.delete('/products/:id', authenticateAdmin, (req, res) => adminController.deleteProduct(req, res));

module.exports = router;