const express = require('express');
const staff_route = express.Router();
const staffController= require('../controllers/staffController');

staff_route.post('/register',staffController.signup)
staff_route.post('/staff_Login',staffController.staff_Login)
staff_route.post('/verify_staff',staffController.verification)
module.exports = staff_route;