const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const banner=require('../models/bannerModel');
const nodemailer = require("nodemailer");
const config=require('../config/config');
const randormstring=require("randomstring");
const express=require("express");
const session=require("express-session");
const jwt=require('jsonwebtoken');
const dotenv =require("dotenv")
dotenv.config()
const Category=require('../models/categoryModel');
const resort=require('../models/resortModel')
const Location = require("../models/locationModel");

const {USER_MAIL,USER_PASSWORD,JWT_SECRET_KEY}=process.env


const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  service: 'gmail',
  auth: {
    user: config.emailUser,
    pass: config.emailPassword
  },
});
const min = 100000; // Minimum 6-digit number
const max = 999999; // Maximum 6-digit number
var otp = Math.floor(Math.random() * (max - min + 1)) + min;
// = Math.random()* 1000000;
// otp = parseInt(otp);



// ==================================otp===================

exports.otp=async(req,res,next)=>{

  try {
    console.log("haiiiiii", req.body);
    // req.session.name = req.body.name;
    // req.session.email = req.body.email;
    // req.session.mno = req.body.mobile;
    // req.session.password = req.body.password;
    const Email = req.body.email;
    console.log(req.body.email);

    const user = await User.findOne({ email: req.body.email });
    console.log(user, "hiiiiiihere");
    if (!user) {
      console.log("no user");

      // send mail with defined transport object
      var mailOptions = {
        from: USER_MAIL,
        to: req.body.email,
        subject: "Otp for registration is: ",
        html:
          "<h3>OTP for account verification is </h3>" +
          "<h1 style='font-weight:bold;'>" +
          otp +
          "</h1>", // html body
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        }else{
          console.log('success',{otp});

        }
        // res.render("otppage", { status: "false" });
      });
    } else {
      console.log('exit');
      // res.render("home", { status: "true" });
      // res.redirect('/home')
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};



// ===========================================================================


exports.signup = async (req, res) => {
  console.log("gghghghg");
  try {
    console.log("jhjhkjhjkhjkh");
    const { name, email, password, phone } = req.body;
    console.log(req.body);

    // Check if the email is already taken
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    } else {
     
      var mailOptions = {
        from: USER_MAIL,
        to: req.body.email,
        subject: "Otp for registration is: ",
        html:
          "<h3>OTP for account verification is </h3>" +
          "<h1 style='font-weight:bold;'>" +
          otp +
          "</h1>", // html body
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log('success', { otp });
        }
      });

      req.session.password = password;
      req.session.email=email;
      req.session.name=name;
      req.session.phone=phone

      

      res.status(200).json({ message: 'User signed up successfully' });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.verification = async (req, res) => {
  console.log("veriiii");
  try {
    console.log(req.body,"body is here");
    req.session.otp = req.body.numberOpt;
    console.log(req.body.result, "Entered otp");
    console.log(otp, "otp send");

    if (otp ==req.body.result) {
      console.log("iff");
      req.session.password = req.body.password;
      let hashedPassword = await bcrypt.hash(req.body.password, 10);
      let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        mobileNumber:req.body.phone,
        password: hashedPassword,
      });

      console.log(newUser,"userDatas");
     newUser.save().then((data) => {
        console.log(data, "oooo");
        // req.session.useremail = req.session.email;
        // req.session.userlogged = true;
        // req.session.user = newUser;
        res.status(200).json({ message:'Authenticated'})
      });
    } else {
      console.log("invalid otp page");
    }
  } catch (error) {
    console.log(error, "ree");
  }
};
// ==================================== user login========================================
module.exports.userLogin=async(req,res,next)=>{
  // console.log("Staffil ethiii");

  console.log("userlogin isss");

   try{

    const email=req.body.email;
    const password=req.body.password;
    console.log(email,password);
    const userData=await User.findOne({email:email})
    console.log(userData._id);
    console.log("correct");
      console.log(userData,"oooo");
    if(userData){
      console.log("is present");
      const passwordMatch= bcrypt.compareSync(password,userData.password)
      console.log(passwordMatch);
      
      if(passwordMatch){
        console.log(JWT_SECRET_KEY,"kkkk");
        const token=jwt.sign({userId:userData._id,role:"client"},process.env.JWT_SECRET_KEY,{expiresIn:30000})
        console.log(token,"token");
       
        res.status(200).json({token:token,message:"success token"})

      }
      

      else{

        res.status(401).json({message:"invalid password"})
      }
    }
      else{
        console.log("pottiii");
        res.status(404).json({message:"user not found"})


      }

    }

   
   catch(error){

    res.status(500).json({message:'Internal server error'})

   }
}

module.exports.authUser=async(req,res)=>{

  try{
console.log("authuser");

  }
  catch(error){
console.log("no auth");

  }
}


// ===================================================LandHome===================================

module.exports.landPage=async(req,res)=>{

  try{

    const bannerData = await banner.find({is_delete:false})
    const categoryData=await Category.find({is_delete:false})
    const resortData=await resort.find({is_delete:false, verify:true})
    
    res.json({
      banners:bannerData,
      status:true,
      category:categoryData,
      resort:resortData

    })
  }
  catch(error){

    console.log(error.message);
  }
}
module.exports.auth=async(req,res)=>{
  try{

    console.log("Augustine");

  }

  catch(error){
    console.log(error.message);
  }
}

// module.exports.resortPage=async(req,res)=>{
//   try {

//     // const{ id }=req.params;
//     const id=req.query.id;
//     console.log("sahrdya");
//    await resort.findOne({$and:[{_id:id},{verify:true}]}).populate({path:'location',populate:'district'}).then(async(response)=>{
//     const districtId=response.location.district
//     console.log(districtId);
//     const district=await Location.findById({_id:districtId})
//     // console.log(district,"the dis");
//     // console.log(response,"responn");
//     res.json({
//       status:true,
//       message:"successfully done",
//       resort:response,


//     })
//     .catch((err)=>{
//       console.log(err.message);
//     });
//    });

    
//   } catch (error) {

//     console.log(error.message);
    
//   }
// }


module.exports.resortPage=async(req,res)=>{
  try {

    // const{ id }=req.params;
    const id=req.query.id;
    console.log("sahrdya");
   await resort.findOne({$and:[{_id:id},{verify:true}]}).populate({path:'location',populate:'district'}).then((response)=>{
    // const districtId=response.location.district
    // console.log(districtId);
    // const district=await Location.findById({_id:districtId})
    // console.log(district,"the dis");
    // console.log(response,"responn");
    res.json({
      status:true,
      message:"successfully done",
      resort:response,


    })
  //   
   })

    
  } catch (error) {

    console.log(error.message);
    
  }
}


module.exports.categoryPage=async(req,res)=>{

try {


  const id=req.params.id;
  console.log(id);
  console.log("params come");
  await resort.find({$and:[{verify:true},{is_delete:false},{category:id}]}).then((response)=>{
    console.log(response,"rp");
    res.json({

      status:true,
      message:"successfully done it",
      category:response
    })

  })

  
  
} catch (error) {

  console.log(error.message);
  
}

}
