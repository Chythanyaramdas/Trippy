const jwt = require("jsonwebtoken");

const dotenv=require("dotenv")
dotenv.config()

console.log(process.env.JWT_SECRET_KEY,"jjjjjsssss");

const Admin=require("../models/adminModel")

const adminJwt=async(req,res,next)=>{
    try{
        
        const token=req.headers["authorization"].replace("Bearer ","");
        // console.log(token,"toooo");
        if(!token){
            throw new Error("Authentication failed:Token missing");
        }

        const decodedToken=jwt.verify(token,process.env.JWT_SECRET_KEY);
        console.log(decodedToken);
        if(decodedToken.role ==="admin"){
            
            const user =await Admin.findById(decodedToken.userId);
            if(!user){

                throw new Error("Authentication failed: User not found");

            }

            req.userID=decodedToken.userId;
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
module.exports=adminJwt;
