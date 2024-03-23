const jwt = require('jsonwebtoken');
function auth(req,res,next){
    let {authorization} =req.headers;
    if(!authorization){
      return  res.json({message:"Please login"})
    }
    try{
        let decode = jwt.verify(authorization,process.env.SECRET_KEY);
        req.id=decode.data.id;
        next()
    }   catch(error){
        res.json({message: error});
    } 
 
}
module.exports={auth};