const express = require('express');
const productController = require('../Controllers/productController');

const router = express.Router();    
router.post('/add-Product/:firmId', productController.addProduct);

module.exports = router;