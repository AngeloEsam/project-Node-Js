const express = require('express');
const path=require("path");
const multer = require('multer');
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.join(__dirname,'../images'))
    },
    filename: function (req, file, cb) {
      cb(null,new Date().toISOString().replace(/:/g,'-')+file.originalname) 
    }    
})
const upload=multer({storage:storage})
const {getAllSellers,getAllProducts,getAllProductsBySeller,addSeller,addProductBySeller,editProductBySeller,deleteProductBySeller}=require("../controllers/sellerController")
const router = express.Router();
//get all seller
router.get('/',getAllSellers)
// get all products
router.get("/products",getAllProducts)
// Get all products of a seller
router.get('/:id/products',getAllProductsBySeller)
// Create new  seller
router.post("/", addSeller);
//Add Product By Seller
router.post('/:sellerId/products',upload.single('photo'), addProductBySeller);
//edit product by seller
router.put('/:sellerId/products/:productId',editProductBySeller)
//delete  product by seller
router.delete('/:sellerId/products/:productId', deleteProductBySeller)
module.exports=router;