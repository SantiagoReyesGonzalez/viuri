// Se importa mongoose
const mongoose = require('mongoose');

// Se define el esquema
const productSchema = new mongoose.Schema({
    urlImg: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
