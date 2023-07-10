const express = require('express');
const admin_route = express.Router();
const adminController= require('../controllers/adminController');
const multer=require('multer')
const path=require('path')

const storage =multer.diskStorage({
    destination : function(req,file,cb){
      cb(null,path.join(__dirname,'../public/images'))
    },
    filename  : function(req,file,cb){
      const name = Date.now()+'-'+file.originalname;
      cb(null,name);    
    }
  
  });

  const fileFilter = (req,file,cb)=>{
    if(file.mimetype ==='image/png' || file.mimetype ==='image/jpg' || file.mimetype ==='image/jpeg' || file.mimetype === 'image/webp'||file.mimetype === 'image/gif'){
        cb(null,true)
    }else{
     
        cb(null,false)
    }
   
  }

  const upload=multer({storage:storage,fileFilter:fileFilter})

admin_route.post('/adminLogin',adminController.Admin_Login)
admin_route.post('/banner',upload.single('image'),adminController.bannerUpload)
admin_route.get('/banner',adminController.banners)
admin_route.delete('/banner',adminController.deleteBanner);

module.exports = admin_route;