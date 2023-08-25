const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const services = require("../models/ServicesModel");
const staff = require("../models/staffModel");
const banner = require("../models/bannerModel");
const nodemailer = require("nodemailer");
const config = require("../config/config");
const randormstring = require("randomstring");
const express = require("express");
const session = require("express-session");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const Category = require("../models/categoryModel");
const resort = require("../models/resortModel");
const Location = require("../models/locationModel");
const booked = require("../models/bookingModel");
const { Long } = require("mongodb");

const { USER_MAIL, USER_PASSWORD, JWT_SECRET_KEY } = process.env;

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  service: "gmail",
  auth: {
    user: config.emailUser,
    pass: config.emailPassword,
  },
});
const min = 100000; // Minimum 6-digit number
const max = 999999; // Maximum 6-digit number
var otp = Math.floor(Math.random() * (max - min + 1)) + min;
// = Math.random()* 1000000;
// otp = parseInt(otp);

// ==================================otp===================

exports.otp = async (req, res, next) => {
  try {
    console.log("haiiiiii", req.body);
    
    const Email = req.body.email;
    console.log(req.body.email);

    const user = await User.findOne({ email: req.body.email });
    console.log(user, "hiiiiiihere");
    if (!user) {
      console.log("no user");

      // send mail with defined transport object
      var mailOptions = {
        from: USER_MAIL,
        to: req.body.email,
        subject: "Otp for registration is: ",
        html:
          "<h3>OTP for account verification is </h3>" +
          "<h1 style='font-weight:bold;'>" +
          otp +
          "</h1>", // html body
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log("success", { otp });
        }
        // res.render("otppage", { status: "false" });
      });
    } else {
      console.log("exit");
      // res.render("home", { status: "true" });
      // res.redirect('/home')
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// ===========================================================================

exports.signup = async (req, res) => {
  console.log("gghghghg");
  try {
    console.log("jhjhkjhjkhjkh");
    const { name, email, password, phone } = req.body;
    console.log(req.body);

    // Check if the email is already taken
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("already exit");
      res.status(400).json({ message: "Email already exists" });
    } else {
      var mailOptions = {
        from: USER_MAIL,
        to: req.body.email,
        subject: "Otp for registration is: ",
        html:
          "<h3>OTP for account verification is </h3>" +
          "<h1 style='font-weight:bold;'>" +
          otp +
          "</h1>", // html body
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log("success", { otp });
        }
      });

      req.session.password = password;
      req.session.email = email;
      req.session.name = name;
      req.session.phone = phone;

      res
        .status(200)
        .json({ status: true, message: "User signed up successfully" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

exports.verification = async (req, res) => {
  console.log("veriiii");
  try {
    console.log(req.body, "body is here");
    req.session.otp = req.body.numberOpt;
    console.log(req.body.result, "Entered otp");
    console.log(otp, "otp send");

    if (otp == req.body.result) {
      console.log("iff");
      req.session.password = req.body.password;
      let hashedPassword = await bcrypt.hash(req.body.password, 10);
      let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        mobileNumber: req.body.phone,
        password: hashedPassword,
      });

      console.log(newUser, "userDatas");
      newUser.save().then((data) => {
        console.log(data, "oooo");
        
        res.status(200).json({ message: "Authenticated" });
      });
    } else {
      console.log("invalid otp page");
    }
  } catch (error) {
    console.log(error, "ree");
  }
};
// ==================================== user login========================================
module.exports.userLogin = async (req, res, next) => {
  // console.log("Staffil ethiii");

  console.log("userlogin isss");

  try {
    const email = req.body.email;
    const password = req.body.password;
    console.log(email, password, "mmkki");
    const userData = await User.findOne({ email: email });
    console.log(userData._id);
    console.log("correct");
    console.log(userData, "oooo");
    if (userData) {
      console.log("is present");

      if (userData.isBlocked === true) {
        console.log("njn");
        res.status(401).json({
          message: "User Blocked",
        });
      }

      const passwordMatch = bcrypt.compareSync(password, userData.password);
      console.log(passwordMatch);

      if (passwordMatch) {
        console.log(JWT_SECRET_KEY, "kkkk");
        const token = jwt.sign(
          { userId: userData._id, role: "client" },
          process.env.JWT_SECRET_KEY,
          { expiresIn: 30000 }
        );
        console.log(token, "token");

        res
          .status(200)
          .json({ token: token, message: "success token", user: userData });
      } else {
        res.status(401).json({ message: "invalid password" });
      }
    } else {
      console.log("pottiii");
      res.status(404).json({ message: "user not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.authUser = async (req, res) => {
  try {
    res.json({ status: true, user: req.user });
  } catch (error) {
    console.log("no auth");
  }
};

// ================================================forget=====================================

module.exports.resetPasswordOtp = async (req, res) => {
  try {
    const { email } = req.body;
    console.log(req.body, "emmmiiiii");
    const userData = await User.findOne({ email: email });
    console.log(!!userData, "du");
    if (userData && userData.name) {
      var mailOptions = {
        from: USER_MAIL,
        to: req.body.email,
        subject: "Otp for registration is: ",
        html:
          "<h3>OTP for account verification is </h3>" +
          "<h1 style='font-weight:bold;'>" +
          otp +
          "</h1>", // html body
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error, "no user ");
        } else {
          console.log("success", { otp });
          res
            .status(200)
            .json({ status: true, message: "User Reset up successfully" });
        }
      });
    } else {
      console.log("not found");
      res.status(404).json({
        status: false,
        message: "No user",
      });
    }
  } catch (error) {
    res.json({
      status: false,
      message: error.message,
    });
    console.log(error.message);
  }
};
// ===================================================password Verification=====================

module.exports.verifyNewPassword = async (req, res) => {
  try {
    console.log(otp, "global otp");
    let result = JSON.parse(otp);
    console.log("resultzzzz");
    if (otp === result) {
      console.log("success");
      res.json({
        status: true,
        message: "successfully done it",
      });
    } else {
      res.json({
        status: false,
        message: "failed",
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};
// ===================================================newPassword================================

module.exports.newPassword = async (req, res) => {
  try {
    const { email, password } = req.body;

    
    const hashPassword = await bcrypt.hash(password, 10);
    const data = await User.updateOne(
      { email: email },
      {
        $set: {
          password: hashPassword,
        },
      }
    );
    res.json({
      status: true,
      message: "success completed",
    });
  } catch (error) {
    console.log(error.message);
  }
};

// ===================================================LandHome===================================

module.exports.landPage = async (req, res) => {
  try {
    const bannerData = await banner.find({ is_delete: false });
    const categoryData = await Category.find({ is_delete: false });
    const resortData = await resort.find({
      is_delete: false,
      verify: true,
      is_blocked: false,
    });

    res.json({
      banners: bannerData,
      status: true,
      category: categoryData,
      resort: resortData,
    });
  } catch (error) {
    console.log(error.message);
  }
};
module.exports.auth = async (req, res) => {
  try {
    console.log("Augustine");
  } catch (error) {
    console.log(error.message);
  }
};



module.exports.resortPage = async (req, res) => {
  try {
 
    const id = req.query.id;
    const userId = req.query.userId || "";
    console.log(
      userId,
      "--------------------------------------------------------------users"
    );
    
    const resortData = await resort
      .findOne({ $and: [{ _id: id }, { verify: true }] })
      .populate({ path: "location", populate: "district" })
      .populate({ path: "reviews", populate: "userId" })
      .populate("resortowner");

    const bookedData = await booked.find({ resortId: id });
   

    let bookedCount;
    if (userId) {
      bookedCount = await booked
        .find({ $and: [{ resortId: id }, { userId: userId }] })
        .count();
      console.log(bookedCount, "bookings");
      let userBook = await resort.findById(id);
      console.log(userBook);
    }

    
    res.json({
      status: true,
      message: "successfully done",
      resort: resortData,
      booked: bookedData,
      bookingCount: bookedCount || 0,
    });
    //
  } catch (error) {
    console.log(error.message);
  }
};

module.exports.categoryPage = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    console.log("params come");
    const categoreyData = await resort.find({
      $and: [
        { verify: true },
        { is_delete: false },
        { category: id },
        { verify: true },
      ],
    });
    const serviceData = await services.find({ is_delete: false });
    console.log(serviceData, "SDR");

    
    res.json({
      status: true,
      message: "successfully done it",
      category: categoreyData,
      services: serviceData,
    });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports.staylocation = async (req, res) => {
  try {
    const placeData = await Location.find({ is_delete: false });
    const recordData = await resort
      .find({ is_delete: false, verify: true })
      .populate("location.district");
    console.log(recordData, "RDD");

    res.json({
      status: true,
      message: "successfully  done it",
      place: placeData,
      record: recordData,
    });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports.destinationPage = async (req, res) => {
  try {
    const destinationData = await Location.find({ is_delete: false });
    console.log(destinationData, "DD");
    res.json({
      status: true,
      message: "successfully  done it",
      destination: destinationData,
    });
  } catch (error) {
    console.log(error.message);
  }
};
module.exports.destinationResort = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id, "params");

    const resortData = await resort
      .find({
        $and: [
          { "location.district": id },
          { verify: true },
          { is_delete: false },
          { is_blocked: false },
        ],
      })
      .populate("location.district");
    const locationData = await Location.findOne({ _id: id, is_delete: false });
    console.log(resortData, "RD");
    console.log(locationData, "ld");
    res.json({
      status: true,
      message: "successfully done",
      resort: resortData,
      location: locationData,
    });
  } catch (error) {
    console.log(error.message);
  }
};
module.exports.getUser = async (req, res) => {
  const id = req.params.id;
  console.log(id, "   kkkkkkkkkk");

  try {
    const user = await staff.findOne({ _id: id });
    console.log(user);
    if (user) {
      console.log(user);
      const { password, ...otherDetails } = user;
      console.log(otherDetails);
      res.status(200).json(otherDetails);
    } else {
      res.status(404).json("No such User");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
