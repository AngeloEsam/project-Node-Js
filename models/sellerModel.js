const mongoose = require('mongoose');

const sellerSchema = new mongoose.Schema({
  sellerName: { type: String, required: true },
});
const sellerModel= mongoose.model("Seller", sellerSchema);
module.exports = sellerModel;