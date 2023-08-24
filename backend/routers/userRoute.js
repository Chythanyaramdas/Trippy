const express = require('express');
const user_route = express.Router();
const authJWT=require('../middlewares/userAuth')
const userControllerRegistration = require('../controllers/userController');
const bookingController=require('../controllers/bookingController')
const categoryController=require('../controllers/categoreyController')
const resortController=require('../controllers/resortController')
const chatController=require('../controllers/chatController')
const messageController=require('../controllers/messageController')


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
user_route.post('/create-checkout-session',bookingController.paymentStripe)
user_route.post('/payment-succes',bookingController.paymentSuccess)
user_route.get('/myBooking/:id',bookingController.paymentHistory)
user_route.get('/searchSingleResort/:checkInDate/:checkOutDate/:resort_id',bookingController.checkSingleResort)
user_route.post('/reviewSubmit/:resort_id/:users_id/:rating/:comment',resortController.reviews)
user_route.post('/editReview',resortController.reviewUpdate)
user_route.get('/searchService/:id',categoryController.searchService)
user_route.get('/cancelBooking/:id',bookingController.cancelBooking)
console.log("koo");
user_route.post('/createChat',chatController.createChat)
user_route.get('/userChats/:id',chatController.userChats)
user_route.get('/user/:id',userControllerRegistration.getUser)
user_route.get('/find/:firstId/:secondId',chatController.findChat)

user_route.post('/message',messageController.addMessage)
user_route.get('/message/:chatId',messageController.getMessage)
 user_route.get('/findChat/:resort_id/:users_id',resortController.createChat)
module.exports = user_route;

