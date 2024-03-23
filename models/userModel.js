const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userName: { type: String, required: true, unique: true },
  password: { type: String, required: true},
 // orders: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Product' }],
});
const userModel= mongoose.model('User',userSchema);
module.exports=userModel;