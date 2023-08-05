const express = require('express');
const user_route = express.Router();
const authJWT=require('../middlewares/userAuth')
const userControllerRegistration = require('../controllers/userController');
const bookingController=require('../controllers/bookingController')


user_route.get('/',userControllerRegistration.landPage);
user_route.post('/register', userControllerRegistration.signup);
user_route.post('/verify_otp',userControllerRegistration.verification)
user_route.post('/userLogin',userControllerRegistration.userLogin)
user_route.get('/token_v',authJWT,userControllerRegistration.authUser)

user_route.get('/singlePage',userControllerRegistration.resortPage)
user_route.get('/categoryPage/:id',userControllerRegistration.categoryPage)
user_route.get('/resortInfo',userControllerRegistration.staylocation)

user_route.post('/search',bookingController.searchDate)
user_route.get('/booking/:id',bookingController.getBookedResort)
user_route.post('/payment',bookingController.payment)


module.exports = user_route;

