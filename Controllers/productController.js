const product = require('../models/Product');
const Firm = require('../models/Firm');
const path = require('path');
const multer = require('multer');

// Create a new product 
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() +Path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

const addProduct = async (req, res) => {
    try{
        productName,price,category,image,bestseller,description = req.body;
        const image = req.file ? req.file.filename : undefined;

        const firmId = req.params.firmId;

        const firm = await Firm.findById(firmId);
        if (!firm) {
            return res.status(404).json({ error: 'Firm not found' });
        }
        const product = new Product({
            productName,price,category,image,bestseller,description,firm: firm._id
        })

        const savedProduct = await product.save();
        firm.products.push(savedProduct);
        await firm.save();
        return res.status(200).json({ message: 'Product added successfully' });
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal Server error' });
    }
}

module.exports = { addProduct: [upload.single('image'), addProduct] };