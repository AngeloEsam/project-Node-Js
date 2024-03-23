const orderModel = require("../models/orderModel");

const createOrder = async (req, res) => {
    try {
        const { userId, productsId } = req.body;

        // Ensure user ID and product IDs are provided
        if (!userId || !productsId || productsId.length === 0) {
            return res.status(400).json({ error: 'User ID and product IDs must be provided' });
        }

        // Create the order using the model and provided data
        const addNewOrder = await orderModel.create({
            userId: userId,
            productsId: productsId
        });

        // Check if order creation was successful
        if (!addNewOrder) {
            return res.status(400).json({ error: 'Failed to create the order' });
        }

        // Send successful response with the new order data
        res.status(200).json({ success: 'Order created successfully', data: addNewOrder });
    } catch (error) {
        // Handle errors in case of any internal server error
        res.status(500).json({ error: error.message });
    }
}

const getAllOrders=async(req,res)=>{
    try{
          let data = await orderModel.find().populate(["userId","productsId"]);
           res.status(201).json({success:true ,data : data});  
            }catch (err) { 
              return res.status(400).send(`Error ${err}`);
             }    
}
const editOrder=async(req,res)=>{
    const id = req.params.id;
    const updateOder =await orderModel.findByIdAndUpdate(id,req.body,{new: true}) ;
    if (!updateOder) {
        return res.status(404).json("No order with this Id found.");
      }
    res.status(200).json(updateOder);
}
const removeOrder=async(req,res)=>{
    const id = req.params.id;
    if(!id){
      return res.status(400).json({error:"No valid id provided"})
    }
    let data =await orderModel.findByIdAndDelete(id)
    if(!data){
       return res.status(400).json({error:`No record found for given id :${id}`})
    }
    res.status(200).json('Data Deleted Succesfully');
}
module.exports = { createOrder,
    getAllOrders,
    editOrder,
    removeOrder 
};
