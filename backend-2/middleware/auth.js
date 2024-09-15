import jwt from "jsonwebtoken"

const authMiddleWare = async(req,res,next)=>{
  
    const token = req.headers.authorization.split(" ")[1];
    console.log("token"+token)
    try{
        const token_decode = jwt.verify(token,process.env.JWT_SECRET);
        console.log("Token:"+token_decode.id);
        req.headers.id = token_decode.id;
        console.log("hello "+req.headers.id);
        next();
    }
    catch(err){
        console.log(err);
        return res.json({success:false,message:"Error in jwt"});
    }
}




export {authMiddleWare}