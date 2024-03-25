const sellerModel=require("../models/sellerModel");
const productModel=require("../models/productModel");
 
const getAllSellers=async (req,res)=>{
    try{
        let sellers = await sellerModel.find();
        res.status(201).json({message:"Successfully fetched all the sellers",data:sellers});
    }catch(err){
        res.status(500).json({message:err.message})
    }
}
const getAllProducts=async (req,res)=>{
  try{
      let products = await productModel.find();
      res.status(201).json({message:"Successfully fetched all the products",data:products});
  }catch(err){
      res.status(500).json({message:err.message})
  }
}
const getAllProductsBySeller=async (req,res)=>{
    try {
        const products = await productModel.find({ sellerId: req.params.id }).populate('sellerId');
        res.json(products);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}
const addSeller= async (req, res) => {
    const product = new sellerModel({
        sellerName: req.body.sellerName,
    
    });
    try {
      const newProduct = await product.save();
      res.status(201).json(newProduct);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
 const addProductBySeller = async (req, res) => {
    try {
      const { sellerId } = req.params; 
      const photo=req.file.filename;
      const {name,description} = req.body;
  
      const seller = await sellerModel.findById(sellerId);
      if (!seller) {
        return res.status(404).json({ message: 'Seller not found.' });
      }
      const product = await productModel.create({photo,name,description,sellerId}); 
  
      res.status(201).json({ message: 'Product added successfully.', product });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
const editProductBySeller=async (req, res) => {
  try {
    const product = await productModel.findByIdAndUpdate(
      { _id: req.params.productId, seller: req.params.sellerId },
      req.body,
      { new: true }
    );
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  } 
}
const deleteProductBySeller=async (req, res) => {
  try {
    const product = await productModel.findByIdAndDelete({
      _id: req.params.productId,
      seller: req.params.sellerId,
    });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
module.exports={
    getAllSellers,
    getAllProducts,
    getAllProductsBySeller,
    addSeller,
    addProductBySeller,
    editProductBySeller,
    deleteProductBySeller
};