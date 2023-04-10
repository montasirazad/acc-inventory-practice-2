const mongoose = require("mongoose");

// Schema design

const productSchema = mongoose.Schema({

    name: {
        type: String,
        required: [true, "Please provide a name for this product"],
        trim: true,
        unique: [true, "Name must be unique"],
        minLength: [3, "Name must be 3 character"],
        maxLength: [100, "Name is too large"],
    },
    description: {
        type: String,
        required: true

    },
    price: {
        type: Number,
        required: true,
        min: [0, "Price can't be negative"],

    },
    unit: {
        type: String,
        required: true,
        enum: {
            values: ["kg", "litre", "pcs"],
            message: "unit value can't be {VALUES}, must be kg/litre/pcs"
        }
    },
    quantity: {
        type: Number,
        required: true,
        min: [0, "Quantity can't be negative"],
        validate: {
            validator: (value) => {
                const isInteger = Number.isInteger(value)
                if (isInteger) {
                    return true
                } else {
                    return false
                }
            }
        },
        message: "Quantity must be an integer"
    },
    status: {
        type: String,
        enum: {
            values: ["in-stock", "out-of-stock", "discontinued"],
            message: "status can't be {VALUES}"
        },
    },
    // supplier: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Supplier"
    // },
    // categories: [{
    //     name: {
    //         type: String,
    //         required: true,
    //     },
    //     _id: mongoose.Schema.Types.ObjectId
    // }]
    // , createdAt: {
    //     type: Date,
    //     default: Date.now
    // },
    // updatedAt: {
    //     type: Date,
    //     default: Date.now
    // }
}, {
    timesTamps: true
});
// middleware before saving data
productSchema.pre('save', function (next) {
    if (this.quantity === 0) {
        this.status = 'out-of-stock'
    }
    console.log('before saving data');
    next()
});


productSchema.methods.logger = function () {
    console.log(`data saved for ${this.name}`);
}

// middleware after saving data

// productSchema.post('save', function (doc, next) {
//     console.log('after saving data');
//     next()
// })
const Product = mongoose.model('Product', productSchema)


module.exports = Product;