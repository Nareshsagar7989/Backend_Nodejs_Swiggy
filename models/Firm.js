const mongoose = require('mongoose');

const firmSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
            },  
        area:{
            type: String,
            required: true
        },
        categoory:{
            type: [{
                type: String,
                enum : ['veg','non-veg']            }]
        },
        region : {
            type : [
                {
                    type: String,
                    enum : ['north-indian','south-indian','chinese' ] 
                }
            ]
        },
        offer : {
            type: String
        },
        image:{
            type: String,
        },
        vendor :[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Vendor'
            }
        ],
        product: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product'
                }
            ]

        }  );

        const Firm = mongoose.model('Firm', firmSchema);

        module.exports = Firm;