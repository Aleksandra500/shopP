const express = require('express');
const router = express.Router();
const multer = require('multer')
const productController = require('../controllers/productController')
const upload = multer({ dest: './uploads/' })
const authorizationValidation = require('../utils/authorizationValidation')
router.route('/').get(productController.getAllProduct)
router.route('/addProduct').post(authorizationValidation.protect, upload.single('file'), productController.addProduct);
router.route('/singleProduct/:productID').get(productController.singleProduct)
router.route('/deleteProduct/:productID?/:productImage?').delete(authorizationValidation.protect, productController.deleteSingleProduct)
router.route('/editProduct').put(authorizationValidation.protect, upload.single('file'),  productController.editProduct)
module.exports = router;