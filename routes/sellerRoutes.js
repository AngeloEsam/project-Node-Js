const express = require('express');
const {getAllSellers,getAllProductsBySeller,addSeller,editProductBySeller,deleteProductBySeller}=require("../controllers/sellerController")
const router = express.Router();
//get all seller
router.get('/',getAllSellers)
// Get all products of a seller
router.get('/:id/products',getAllProductsBySeller)
// Create new  seller
router.post("/", addSeller);
//edit product by seller
router.put('/:sellerId/products/:productId',editProductBySeller)
//delete  product by seller
router.delete('/:sellerId/products/:productId', deleteProductBySeller)
module.exports=router;