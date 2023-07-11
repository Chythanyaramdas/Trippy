const express = require('express');
const user_route = express.Router();
const authJWT=require('../middlewares/userAuth')
const userControllerRegistration = require('../controllers/userController');


user_route.get('/',userControllerRegistration.landPage);
user_route.post('/register', userControllerRegistration.signup);
// user_route.post('/otp',userControllerRegistration.otp)
user_route.post('/verify_otp',userControllerRegistration.verification)
user_route.post('/userLogin',authJWT,userControllerRegistration.userLogin)
user_route.post('/auth',authJWT,userControllerRegistration.authUser)


// user_route.post('/authUser',userControllerRegistration.authUser)


module.exports = user_route;

