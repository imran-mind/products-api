const ensureAuthenticated = require('../auth');
const { createProduct, getProducts, getProductById,
    updateProductById, deleteProductById } =
    require('../controllers/productController');
const router = require('express').Router();

// protected route
router.post('/products', ensureAuthenticated, createProduct);
router.get('/products', getProducts);
router.get('/products/:id', getProductById);
// protected route
router.put('/products/:id', ensureAuthenticated, updateProductById)
// protected route
router.delete('/products/:id', ensureAuthenticated, deleteProductById)

module.exports = router;