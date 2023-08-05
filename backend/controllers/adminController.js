const bcrypt = require('bcryptjs');
const Admin = require('../models/adminModel');
const Resort=require('../models/resortModel');
const Staff=require('../models/staffModel')
const User=require('../models/userModel')
const nodemailer = require("nodemailer");
const config=require('../config/config');
const randormstring=require("randomstring");
const express=require("express");
const session=require("express-session");
const jwt=require('jsonwebtoken');
const { admin } = require('../../main-project/src/services/adminApi');
const banner = require('../models/bannerModel')
const dotenv=require("dotenv");
const { ObjectId } = require('mongodb');
dotenv.config()



module.exports.Admin_Login=async(req,res,next)=>{
    console.log("Staffil ethiii");
    
        console.log("stafflogin isss");
      try{
        const email=req.body.email;
        const aa= req.body.password
        const adminData=await Admin.findOne({email})
        console.log(adminData);
        if(adminData){
        const password= await bcrypt.compare(aa,adminData.password)
        const token=jwt.sign({userId:adminData._id,role:"admin"},process.env.JWT_SECRET_KEY,{expiresIn:30000})
        console.log(token);
        if(password){
            res.status(200).json({status:true,token:token,message:"success token"})
        }
        else{

          res.status(401).json({message:"invalid password"})
        }
       
        }

        else{

          console.log("pottiii");
          res.status(404).json({message:"admin not found"})
  
        }


      }

         catch(error){
      
          res.status(500).json({message:'Internal server error'})
      
         }
      }

      module.exports.bannerUpload=async(req,res)=>{

        try{

          const{title,description}=req.body
          console.log(title,description);
          const newBanner=new banner({
            title,
            description,
            image:req.file.filename
          })
          const bannerData=await newBanner.save()
          if(bannerData) res.status(201).json({status:true,message:"successfully created"})

        }
        catch(error){

          console.log(error.message);

        }
      }

      module.exports.banners = async(req,res)=>{
        try {
                
            const bannerCollection = await banner.find({is_delete:false})
          
            res.json({status : true,banners:bannerCollection})
            

        } catch (error) {
            console.log(error.message);
        }
    }

    module.exports.deleteBanner=async(req,res)=>{
      try{



        console.log(req.body.id);
        const bannerData = await banner.findByIdAndUpdate(req.body.id,{is_delete:true})
        if(bannerData){
            res.json({
                status:true,
                message:'Successfully deleted'
            })
        }
        

      }


       
      catch(error){

        console.log(error.message);
        res.json({
          status:false,
          message:"Can't find the data"
      })
      }
    }


    module.exports.getBanner=async(req,res)=>{
      try {

        console.log("banner geting");
        const bannerData=await banner.findOne({_id:req.params.id});
        console.log(bannerData);
        if( bannerData){

          res.json({
            status: true,
            banner:bannerData,
          });

        }
    

        
      } catch (error) {


        console.log(error.message);
        
      }
    }


    module.exports.updateBanner=async(req,res)=>{
      try {


        console.log(req.body,"kkkk");
        console.log("bannerUpdateszz");
        console.log(req.params);
        const id= req.params.id
        console.log(req.file,"filesss");
        if (req.file) {

          const categoryData = await banner.updateOne(
            { _id:id },
            {
              $set: {
                title: req.body.name,
                description: req.body.description,
                // image: req.file.filename,
              },
            }
          );
          if (categoryData) {
            console.log("done");
            res.json({
                status: true,
                banner: categoryData,
            });
          }
        } else {
          console.log("ividde");
          const categoryData = await banner.updateOne(
            { _id:id},
            {
                $set: {
                title: req.body.name,
                description: req.body.description,
            },
        }
        );
        if (categoryData) {
            console.log("done");
            res.json({
              status: true,
              banner: categoryData,
            });
          }
        }

        
      } catch (error) {

        console.log(error.message);
        
      }
    }
      
  module.exports.resortList=async(req,res)=>{
    try {

      const resortList=await Resort.find({verify:false}).populate('resortowner');
       

      
      // console.log(resortList,"rl");

      if(resortList){
        res.json({
          status:true,
          resort:resortList
        });
       } else{

        res.json({
          status:false,
          message:"no application "
        })

        }
      
      
    } catch (error) {

      console.log(error.message);
      
    }
  }
  
  module.exports.resortApproval=async(req,res)=>{
    try {

      const{ id }=req.params;
      await Resort.findByIdAndUpdate({_id:id},{verify:true}).then((response)=>{
        res.json({
          status: true,
            message: "Successfully Done",
        })

        .catch((err) => {
          console.log(err.message);
        });
      });
      
    } catch (error) {

      console.log(error.message);
      
    }
  }
     
  // module.exports.resortDetails=async(req,res)=>{

  //   try {

  //     const id=req.query.id
  //     const resortData=await Resort.findById({_id:id})
  //     console.log(resortData,"vanilaaa");
  //     if(resortData){
  //       res.json({
  //         status:true,
  //         resort:resortData
  //       })
  //     }
  //     else{
  //       res.json({
  //         status:false,
  //         message:"cant find id"
  //       })
  //     }
      
  //   } catch (error) {
  //     console.log(error.message);
      
  //   }
  // }  



  module.exports.resortDetails = async (req, res) => {
    try {
      const id = req.query.id;
      const resortData = await Resort.findById({ _id: id });
      console.log(resortData, "vanilaaa");
      if (resortData) {
        res.json({
          status: true,
          resort: resortData,
        });
      } else {
        res.json({
          status: false,
          message: "cant find id",
        });
      }
    } catch (error) {
      console.log(error.message);
      res.json({
        status: false,
        message: error.message,
      });
    }
  };
 module.exports.userInfo=async(req,res)=>{
  try {

   const response= await User.find({isBlocked:false}) 
    console.log(response,"USER");
    res.json({
      status:true,
      message:"successfully done",
      user:response
    })
    
  } catch (error) {
    console.log(error.message);
    
  }
 }
 module.exports.userAction=async(req,res)=>{
  try {
    const{ id }=req.params;
    const responseData=await User.findByIdAndUpdate({_id:id},{isBlocked:true})
    console.log( responseData,"RD");
    res.json({
      status:true,
      message:"successfully done it",
      user:responseData

    })
    
  } catch (error) {

    console.log(error.message);
    
  }
 }

  