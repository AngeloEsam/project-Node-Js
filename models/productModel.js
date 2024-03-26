const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true , unique:true},
  description: { type: String, required: true },
  photo: { type: String },
  sellerId: { type: mongoose.SchemaTypes.ObjectId, ref: 'User' }
}, { timestamps: true });

const productModel = mongoose.model('Product', productSchema);

module.exports = productModel;