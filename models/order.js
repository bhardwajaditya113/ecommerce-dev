const mongoose = require('mongoose');
const CartSchema = require('../cart/Cart');

const OrderSchema = new mongoose.Schema({
    cart: [CartSchema],
    customer: [{
        name: String,
        address: String,
        phone: String,
        email: String
    }],
    date: { type: Date, default: Date.now }

});


mongoose.model('Order', OrderSchema);