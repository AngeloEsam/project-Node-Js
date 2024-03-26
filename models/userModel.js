const mongoose = require('mongoose');
const validator=require("validator");
const userSchema = new mongoose.Schema({
  userName: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true ,
  validate:[validator.isEmail,'Invalid Email'],lowercase:true
},
  password: { type: String, required: true},
  confirmPassword:{
    type:String,
    required:[true,"Confirm Password is Required!"],
  },
  role: {
    type: String,
    default:"Buyer",
     enum: ['Seller', 'Buyer']
    }

 // orders: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Product' }],
});
const userModel= mongoose.model('User',userSchema);
module.exports=userModel;