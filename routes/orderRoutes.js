const express = require('express');
const {createOrder,getAllOrders,editOrder,removeOrder}=require("../controllers/orderController")
const router = express.Router();
router.get('/',getAllOrders);
router.post('/',createOrder);
router.patch('/:id', editOrder)
router.delete( '/:id', removeOrder)
module.exports=router;