const express = require('express');
const {getAllSellers,getAllProductsBySeller,addSeller}=require("../controllers/sellerController")
const router = express.Router();
//get all seller
router.get('/',getAllSellers)
// Get all products of a seller
router.get('/:id/products',getAllProductsBySeller)
// Create new  seller
router.post("/", addSeller);
module.exports=router;