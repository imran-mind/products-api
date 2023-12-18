const ensureAuthenticated = require('../auth');
const { createProduct, getProducts, getProductById,
    updateProductById, deleteProductById } =
    require('../controllers/productController');
const router = require('express').Router();

// protected route
router.post('/', ensureAuthenticated, createProduct);
router.get('/', getProducts);
router.get('/:id', getProductById);
// protected route
router.put('/:id', ensureAuthenticated, updateProductById)
// protected route
router.delete('/:id', ensureAuthenticated, deleteProductById)

module.exports = router;