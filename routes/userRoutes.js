const express = require('express');
const {getAllUsers,registerNewUser,getSingleUser,updateUser,deleteUser}=require("../controllers/userController");
const router = express.Router();
//get All Users
router.get('/', getAllUsers)
//register new User
router.post("/", registerNewUser)
//get single User
router.get( "/:id" ,getSingleUser ) ; 
//update user
router.patch( '/:id' , updateUser)
//delete User
router.delete('/:id',deleteUser)
module.exports=router