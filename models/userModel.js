const mongoose = require('mongoose');
const validator=require("validator");
const userSchema = new mongoose.Schema({
  userName: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true ,
  validate:[validator.isEmail,'Invalid Email'],lowercase:true
},
  password: { type: String, required: true},
 // orders: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Product' }],
});
const userModel= mongoose.model('User',userSchema);
module.exports=userModel;