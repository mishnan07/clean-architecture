const express = require('express');
const ProductController = require('../controllers/ProductController');
const ProductUseCase = require('../usecases/product/ProductUseCase');
const ProductRepository = require('../repositories/product/ProductRepository');

const router = express.Router();

// Initialize dependencies
const productRepository = new ProductRepository();
const productUseCase = new ProductUseCase(productRepository);
const productController = new ProductController(productUseCase);

// Public routes for users to view products
router.get('/', (req, res) => productController.getProducts(req, res));
router.get('/:id', (req, res) => productController.getProduct(req, res));

module.exports = router;