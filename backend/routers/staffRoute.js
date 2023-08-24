const express = require('express');
const staff_route = express.Router();
const authJWT=require('../middlewares/staffAuth')
const bookingController=require('../controllers/bookingController')
const userControllerRegistration = require('../controllers/userController');
const chatController=require('../controllers/chatController')
const messageController=require('../controllers/messageController')
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


  // multiple image storing

// const rStorage =multer.diskStorage({
//     destination : function(req,file,cb){
//       cb(null,path.join(__dirname,'../public/resort'))
//     },
//     filename  : function(req,file,cb){
//       const name = Date.now()+'-'+file.originalname;
//       cb(null,name);    
//     }
  
//   });

  const fileFilter = (req,file,cb)=>{
    if(file.mimetype ==='image/png' || file.mimetype ==='image/jpg' || file.mimetype ==='image/jpeg' || file.mimetype === 'image/webp'||file.mimetype === 'image/gif'){
        cb(null,true)
    }else{
     
        cb(null,false)
    }
   
  }



  

  const upload=multer({storage:storage,fileFilter:fileFilter})
  // const rUpload=multer({storage:rStorage,fileFilter:fileFilter})





// --------------------------------------------------------------------------------------------------






const staffAuth=require('../middlewares/staffAuth');
const staffController= require('../controllers/staffController');
const resortController=require('../controllers/resortController')

staff_route.post('/register',staffController.signup)
staff_route.post('/staff_Login',staffController.staff_Login)
staff_route.post('/verify_staff',staffController.verification);
staff_route.get('/token_v',authJWT,staffController.authStaff)

staff_route.get('/resortRegister',resortController.resortLocation);
staff_route.post('/resortRegister',upload.array('image',5),resortController.resort);
staff_route.get('/resortManagement/:staff',resortController.resortManagementView);
staff_route.get('/resort_u/:id',upload.array('image',5),resortController.getResort);
staff_route.post('/resort_ud/:id',upload.array('image',5),resortController.updateResort);


 staff_route.get('/adventureManagement',staffController.adventureManagement);
 staff_route.post('/adventureManagement/:id',upload.single('image'),staffController.addAdventure);
 staff_route.delete('/adventureManagement',staffController.deleteAdventure)

 staff_route.get('/bookingManagement',bookingController.bookingManagement)
 staff_route.get('/bookingResort/:id',bookingController.bookingResorts)
 staff_route.get('/singlebookingManagement/:id',bookingController.bookingSingleResorts)

 staff_route.get('/dashBoardChart/:id',staffController.dashBoardChart)

// staff_route.post('/resortRegister',upload.array('image',10),resortController.resort);
// staff_route.post('/resortRegister',upload.single('image2'),resortController.resort);

staff_route.get('/staffChats/:id',chatController.staffChats)
staff_route.get('/staff/:id',staffController.getStaff)
staff_route.get('/find/:firstId/:secondId',chatController.findChat)

staff_route.post('/message',staffController.addMessage)
staff_route.get('/message/:chatId',staffController.getMessage)
module.exports = staff_route;