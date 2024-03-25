const express = require('express');
const productModel=require("../models/productModel")
const {getAllProducts,getOneProduct,addProduct,updateProduct,deleteProduct}=require("../controllers/productController")
const router = express.Router();
const multer=require("multer");
const path=require("path");
const {auth}=require('../middlewares/auth')
//upload image
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.join(__dirname,'../images'))
    },
    filename: function (req, file, cb) {
      cb(null,new Date().toISOString().replace(/:/g,'-')+file.originalname) 
    }    
})
const upload=multer({storage:storage})
//get all products
router.get('/',getAllProducts);
// Search products by name or seller
router.get('/search',auth, async (req, res) => {
  try {
    const Name= req.query.name.toLowerCase();
    const products = await productModel.find({
      $or: [
        { name: Name }, 
        { sellerId: req.query.sellerId } 
      ]
    });
    
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//get single product
router.get( '/:id', getOneProduct)
//add  a new product
router.post("/",upload.single( 'photo' ),auth, addProduct );
//update a product
router.patch('/:id',auth,updateProduct)

//delete product
router.delete('/:id', deleteProduct);
 
module.exports=router;