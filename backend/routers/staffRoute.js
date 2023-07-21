const express = require('express');
const staff_route = express.Router();

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





// --------------------------------------------------------------------------------------------------






const staffAuth=require('../middlewares/staffAuth');
const staffController= require('../controllers/staffController');
const resortController=require('../controllers/resortController')

staff_route.post('/register',staffController.signup)
staff_route.post('/staff_Login',staffController.staff_Login)
staff_route.post('/verify_staff',staffController.verification);
staff_route.get('/resortRegister',resortController.resortLocation);
 staff_route.post('/resortRegister',upload.single('image'),resortController.resort);
// staff_route.post('/resortRegister',upload.array('image',10),resortController.resort);

module.exports = staff_route;