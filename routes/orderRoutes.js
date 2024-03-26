const express = require('express');
const {auth, restrictTo}=require('../middlewares/auth')
const {createOrder,getAllOrders,removeOrder}=require("../controllers/orderController")
const router = express.Router();
router.get('/',auth,restrictTo('Seller'),getAllOrders);
router.post('/',auth,restrictTo('Buyer'),createOrder);
//router.patch('/:id', editOrder)
router.delete( '/:id', removeOrder)
module.exports=router;