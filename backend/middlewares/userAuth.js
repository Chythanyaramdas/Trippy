
const jwt = require("jsonwebtoken");

const dotenv=require("dotenv")
dotenv.config()

console.log(process.env.JWT_SECRET_KEY,"jjjjjsssss");
const User=require("../models/userModel");
const { Error } = require("mongoose");

const clientJwt=async(req,res,next)=>{
    try{
        // console.log(req.header,"headers");
        const token=req.header("Authorization").replace("Bearer ","");
        // console.log(token,"toooo");
        if(!token){
            throw new Error("Authentication failed:Token missing");
        }

        const decodedToken=jwt.verify(token,process.env.JWT_SECRET_KEY);
        // console.log(decodedToken);
        if(decodedToken.role ==="client"){
            
            const user =await User.findById(decodedToken.userId);
            if(!user){

                throw new Error("Authentication failed: User not found");

            }
            if(user.isBlocked===true)throw new Error("User blocked")

            req.user=user;
            next();
        }
        else{
            throw new Error("Authentication failed");
        }

    }
    catch(error){
        console.log(error.message);
        return res.status(401).json({ message: error.message });

    }
}
module.exports=clientJwt;
