const bcrypt = require('bcryptjs');
const Admin = require('../models/adminModel');
const nodemailer = require("nodemailer");
const config=require('../config/config');
const randormstring=require("randomstring");
const express=require("express");
const session=require("express-session");
const jwt=require('jsonwebtoken');
const { admin } = require('../../main-project/src/services/adminApi');
const banner = require('../models/bannerModel')


module.exports.Admin_Login=async(req,res,next)=>{
    console.log("Staffil ethiii");
    
        console.log("stafflogin isss");
      try{
        const email=req.body.email;
        const aa= req.body.password
        const adminData=await Admin.findOne({email})
        
        if(adminData){
        const password= await bcrypt.compare(aa,adminData.password)
        if(password){
            res.json({status:true})
        }
       
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
      
     
    