const express = require('express');
const {auth}=require('../middlewares/auth')
const {getAllUsers,registerNewUser,loginUser,getSingleUser,updateUser,deleteUser}=require("../controllers/userController");
const router = express.Router();
//get All Users
router.get('/', getAllUsers)
//register new User
router.post("/register", registerNewUser)
// Login User
router.post( '/login', loginUser);
//get single User
router.get( "/:id" ,auth,getSingleUser ) ; 
//update user
router.patch( '/:id' , updateUser)
//delete User
router.delete('/:id',deleteUser)
module.exports=router