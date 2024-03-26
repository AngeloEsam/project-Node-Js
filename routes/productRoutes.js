const express = require('express');
const productModel=require("../models/productModel")
const {getAllProducts,getAllProductsBySellerId,getOneProduct,addProduct,updateProduct,deleteProduct}=require("../controllers/productController")
const router = express.Router();
const multer=require("multer");
const path=require("path");
const {auth, restrictTo}=require('../middlewares/auth')
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
//get all products
router.get('/all', getAllProducts);
//get all products by sellerId
router.get('/:sellerId/productSellers',auth,restrictTo('Seller'), getAllProductsBySellerId);


//get single product
router.get( '/:id',auth, getOneProduct)
//add  a new product
router.post("/",upload.single( 'photo' ),auth,restrictTo('Seller'), addProduct );
//update a product
router.patch('/:id',auth,restrictTo('Seller'),updateProduct)

//delete product
router.delete('/:id',restrictTo('Seller'),auth, deleteProduct);
 
module.exports=router;
