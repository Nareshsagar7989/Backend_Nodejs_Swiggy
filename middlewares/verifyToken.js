const Vendor = require('../models/Vendor');
const jwt = require('jsonwebtoken');
const dotEnv = require('dotenv');
const { vendorLogin } = require('../Controllers/vendorController');
dotEnv.config();

const secretkey = process.env.WhatIsYourName;

const verifyToken = async (req,res,next) => {
    const token = req.headers.token;

    if (!token) {
        return res.status(401).json({ error: 'Access denied.Ttoken isprequired.' });
    }
    try{
        const decoded = jwt.verify(token,secretkey);
        constvendor = await Vendor.findById(decoded.vendorId);
        if (!vendor) {
            return res.status(404).json({ error: 'vendor not found' });
        }
        req.vendorId = vendorLogin._id
        next();

    }
    catch (error) {
        return res.status(500).json({ error: 'Invalid token' });
    }
}

module.exports = verifyToken;