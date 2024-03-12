const sellerModel=require("../models/sellerModel");
const productModel=require("../models/productModel")
const getAllSellers=async (req,res)=>{
    try{
        let sellers = await sellerModel.find();
        res.status(201).json({message:"Successfully fetched all the sellers",data:sellers});
    }catch(err){
        res.status(500).json({message:err.message})
    }
}
const getAllProductsBySeller=async (req,res)=>{
    try {
        const products = await productModel.find({ sellerId: req.params.id });
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
const editProductBySeller=async (req, res) => {
  console.log('object')
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
    getAllProductsBySeller,
    addSeller,
    editProductBySeller,
    deleteProductBySeller
};