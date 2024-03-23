const productModel=require("../models/productModel")
const getAllProducts=async(req,res)=>{
    try{
      const query=req.query;
      const limit=parseInt(query.limit) || 10;
      const page=parseInt(query.page)  || 1;
      const skip= (page - 1)* limit;
        let data = await productModel.find().populate('sellerId').limit(limit).skip(skip);  
         res.status(201).json({success:true ,data : data});  
          }catch (err) { 
            return res.status(400).send(`Error ${err}`);
           }                                        
}
const addProduct = async (req, res) => {
  try {
    const photo=req.file.filename
      const {name,description,sellerId} = req.body;
      const addNewProduct = await productModel.create({photo,name,description,sellerId});
      if (!addNewProduct) {
          return res.status(400).json({ error: 'Failed to add the product' });
      }
      res.status(200).json({ success: 'Product added successfully', data: addNewProduct });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
}
const updateProduct=async (req,res)=>{
    const id=req.params.id;
    const photo= req.body.photo;
    const {name,description,sellerId}=req.body; 
    const updateProduct=await productModel.findByIdAndUpdate(id,{name,description,photo,sellerId},{new: true});
      if (!updateProduct) {
        return res.status(404).json("No product with this Id found.");
      }
      res.status(200).json({user: updateProduct});
    }  

   
  const getOneProduct=async (req,res)=>{
    const id=req.params.id;
    const data=await productModel.findById(id).populate("sellerId");
    if(!data){
       return res.status(404).json('No Data With This ID')
    }
    res.status(200).json(data)
  }
const deleteProduct=async (req,res)=>{
    const id=req.params.id
    const data=await productModel.findByIdAndDelete(id)
    if(!data){
        return res.status(404).json('Id Not Found')
    }
    res.status(200).json('Data Deleted Succesfully')
}
module.exports={
    getAllProducts,
    getOneProduct,
    addProduct,
    updateProduct,
    deleteProduct
}