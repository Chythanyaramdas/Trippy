const express = require('express');
const user_route = express.Router();
const authJWT=require('../middlewares/userAuth')
const userControllerRegistration = require('../controllers/userController');
const bookingController=require('../controllers/bookingController')


user_route.get('/',userControllerRegistration.landPage);
user_route.post('/register', userControllerRegistration.signup);
user_route.post('/verify_otp',userControllerRegistration.verification)
user_route.post('/userLogin',userControllerRegistration.userLogin)
user_route.post('/resetPasswordOtp',userControllerRegistration.resetPasswordOtp)
user_route.post('/verifiyNewPassword',userControllerRegistration.verifyNewPassword)
user_route.post('/newPassword',userControllerRegistration.newPassword)

user_route.get('/token_v',authJWT,userControllerRegistration.authUser)

user_route.get('/singlePage',userControllerRegistration.resortPage)
user_route.get('/categoryPage/:id',userControllerRegistration.categoryPage)
user_route.get('/destination',userControllerRegistration.destinationPage)
user_route.get('/destinationResort/:id',userControllerRegistration.destinationResort)
user_route.get('/resortInfo',userControllerRegistration.staylocation)

user_route.post('/search',bookingController.searchDate)
user_route.get('/booking/:id',bookingController.getBookedResort)
user_route.post('/payment',bookingController.payment)
user_route.get('/searchSingleResort/:checkInDate/:checkOutDate/:resort_id',bookingController.checkSingleResort)


module.exports = user_route;

