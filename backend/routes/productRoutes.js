import express from 'express';
import multer from 'multer';
import {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    uploadProductImage,
} from '../controllers/productController.js';

const router = express.Router();

// Konfigurasi Multer untuk unggah gambar
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage: storage });

// Middleware untuk logging setelah Multer
const logAfterUpload = (req, res, next) => {
    console.log('--- [DEBUG] After Multer Middleware ---');
    console.log('req.body:', req.body);
    console.log('req.file:', req.file);
    console.log('--- End After Multer ---');
    next(); // Lanjutkan ke middleware/controller berikutnya
};

router.route('/').get(getProducts).post(upload.single('productImage'), logAfterUpload, createProduct);
router.route('/:id').get(getProductById).put(upload.single('productImage'), updateProduct).delete(deleteProduct);
router.post('/upload-image', upload.single('productImage'), uploadProductImage);

export default router;