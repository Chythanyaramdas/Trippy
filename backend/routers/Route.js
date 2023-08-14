const express = require('express');
const admin_route = express.Router();
const adminController= require('../controllers/adminController');
const categoryController=require('../controllers/categoreyController')
const locationController=require('../controllers/locationController')
const resortController=require('../controllers/resortController')
const adminAuth=require('../middlewares/adminAuth')
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
admin_route.get('/banner_u/:id',adminController.getBanner);
admin_route.post('/banner_ud/:id',upload.single('image'),adminController.updateBanner);


admin_route.get('/services',adminController.services)
admin_route.post('/services',adminController.servicesCreation)
admin_route.delete('/services',adminController.deleteServices);


admin_route.get('/categoryManagement',categoryController.categoreyManagement);
admin_route.post('/categoreyUpload',upload.single("image"),categoryController.categoreyCreation);
admin_route.post('/categoreyManagement_ud/:id',upload.single("image"),categoryController.updateCategory);
admin_route.get('/categoryManagement_u/:id',categoryController.getCategory)
admin_route.delete('/categoryManagement',categoryController.deleteCategory);

admin_route.post('/addLocation',upload.single("image"),locationController.locationCreation);
admin_route.get('/location',locationController.location)
admin_route.delete('/location',locationController.deleteLocation)
admin_route.get('/location_u/:id',locationController.getLocation)
admin_route.post('/location_ud/:id',upload.single('image'),locationController.updateLocation)

admin_route.get('/resortApplications',adminController.resortList)
admin_route.post('/resortRegister/:id',adminController.resortApproval)
admin_route.post('/resortRegisterReject/:reject',adminController.resortReject)
admin_route.get('/resortDetails',adminController.resortDetails)
admin_route.get('/resortList',resortController.resortManagement)
admin_route.get('/singleResort',resortController.singleResort)
admin_route.post('/resortPage/:id/:action',resortController.singleResortInfo)

admin_route.get('/userInfo',adminController.userInfo)
admin_route.post('/userBlock/:id/:action',adminController.userAction)







module.exports = admin_route;