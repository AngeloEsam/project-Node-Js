const userModel=require('../models/userModel');
const getAllUsers=async (req,res)=>{
    try{
        let users = await userModel.find();
        res.status(201).json({message:"Successfully fetched all the users",data:users});
    }catch(err){
        res.status(500).json({message:err.message})
    }
}
const registerNewUser=async (req,res)=>{
    const data=req.body;
    try{
        const createUser= await userModel.create(data);
        res.json(createUser);
    }catch(err){
       
        res.status(409).json("Error in creating new User");
    }
   
}
const getSingleUser= async (req,res)=>{
    const {id} = req.params;
    const singleUser=await userModel.findById(id);
    res.json(singleUser);
 }
 const updateUser=async (req,res)=>{
     const {id}=req.params;
     const {userName,password,orders}=req.body;
     const updateUser=await userModel.findByIdAndUpdate(id,{userName,password,orders},{new:true})
     if (!updateUser) {
        return res.status(404).json("No user with this Id found.");
      }
      res.status(200).json({user: updateUser});
 }  
 const deleteUser = async (req, res) => {
    const id = req.params.id;
    try {
        const data = await userModel.findByIdAndDelete(id);
        if (!data) {
            return res.status(404).json('Id Not Found');
        }
        res.status(200).json('User Deleted Successfully');
    } catch (error) {
        return res.status(500).json(error.message);
    }
}
module.exports={
    getAllUsers,
    registerNewUser,
    getSingleUser,
    updateUser,
    deleteUser
}