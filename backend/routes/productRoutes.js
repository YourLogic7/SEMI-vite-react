import express from 'express';
import {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
} from '../controllers/productController.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.route('/').get(getProducts).post(upload.array('productImage', 8), createProduct);
router.route('/:id').get(getProductById).put(upload.array('productImage', 8), updateProduct).delete(deleteProduct);


export default router;