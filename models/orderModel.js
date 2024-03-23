const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    productsId: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Product',
        required: true
    }]
    
},{
    timestamps: true
});
const orderModel = mongoose.model('Order', orderSchema);

module.exports = orderModel;