const express = require("express");
const userRoutes=require('./routes/userRoutes')
const productRoutes=require('./routes/productRoutes');
const sellerRoutes=require('./routes/sellerRoutes');
const mongoose= require('mongoose');
const cors=require('cors');
const dotenv=require('dotenv').config();
const app = express();
app.use(express.json());
app.use(cors())
mongoose.connect(process.env.CONNECTION_DB).then(()=>console.log("connected to db"))
.catch((err)=>console.error(err))
app.use('/users',userRoutes)
app.use(express.static('./images'))
app.use('/products',productRoutes);
app.use('/sellers',sellerRoutes);
app.use('*',(req,res,next)=>{
    res.json({message:"Page not found"})
})
app.listen(process.env.PORT, () => console.log(`Example app listening on port ${process.env.PORT}`));