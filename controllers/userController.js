const bcrypt=require('bcryptjs')
const jwt=require("jsonwebtoken")
const userModel=require('../models/userModel');
const getAllUsers=async (req,res)=>{
    try{
        let users = await userModel.find({},{password:0});
        res.status(201).json({message:"Successfully fetched all the users",data:users});
    }catch(err){
        res.status(500).json({message:err.message})
    }
}
const registerNewUser=async (req,res)=>{  
    try{
        const data=req.body;
        const oldUser=await userModel.findOne({userName:data.userName});
        if(oldUser){
            return res.status(409).json("Username already exist");
        }
        const hashedPassword=await bcrypt.hash(data.password, 10)
        data.password=hashedPassword;
        const createUser= await userModel.create(data);
        res.json(createUser);
    }catch(err){
       
        res.status(409).json({message: err.message});
    }
   
}
const loginUser=async(req,res)=> {
    const {userName,password}= req.body;
    if(!userName || !password){
        return res.status(400).json({msg:"Please enter userName and password"});
    }
    const user=await userModel.findOne({userName:userName})
    if (!user) {
        return res.status(400).json({msg:"invalid userName"});
    }
    let isValid=await bcrypt.compare(password, user.password)
    if (!isValid) {
        return res.status(400).json({msg:'Invalid Password'})
    }
     //Create JWT  
     let token= await  jwt.sign({data:{userName:user.userName,id:user._id}},process.env.SECRET_KEY)
     res.json({message:'success',token:token});
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
    loginUser,
    getSingleUser,
    updateUser,
    deleteUser
}