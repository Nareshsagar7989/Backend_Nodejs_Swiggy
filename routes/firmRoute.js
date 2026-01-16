const express = require('express');

const firmController = require('../Controllers/firmController');
const verifyToken = require('../middlewares/verifyToken');
const router = express.Router(); 

router.post('/add-firm',verifyToken,firmController.addFirm);

module.exports = router;