const bcrypt = require("bcryptjs");
const Staff = require("../models/staffModel");
const resort = require("../models/resortModel");
const User = require("../models/userModel");
const book = require("../models/bookingModel");
const nodemailer = require("nodemailer");
const config = require("../config/config");
const randormstring = require("randomstring");
const Message = require("../models/messageModel");
const express = require("express");
const session = require("express-session");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

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

exports.signup = async (req, res) => {
  console.log("gghghghg");
  try {
    console.log("jhjhkjhjkhjkh");
    const { name, email, password, phone } = req.body;
    console.log(req.body);
    console.log("email", email);

    // Check if the email is already taken
    const existingUser = await Staff.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
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
    res.status(500).json({ message: "Internal server error" });
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
      let newUser = new Staff({
        name: req.body.name,
        email: req.body.email,
        mobileNumber: req.body.phone,
        password: hashedPassword,
      });

      console.log(newUser, "userDatas");
      newUser.save().then((data) => {
        console.log(data, "ooooyyyy");
        
        res.status(200).json({ message: "Authenticated" });
      });
    } else {
      console.log("invalid otp page");
    }
  } catch (error) {
    console.log(error, "ree");
  }
};
// ==================================== staff login========================================

module.exports.staff_Login = async (req, res, next) => {
  console.log("Staffil ethiii");

  console.log("stafflogin isss");

  try {
    const email = req.body.email;
    const password = req.body.password;
    console.log(email, password);
    const userData = await Staff.findOne({ email: email });

    console.log(userData, "ooooky");
    console.log("correct");
    if (userData) {
      console.log("is present staff");
      const passwordMatch = bcrypt.compareSync(password, userData.password);
      console.log(passwordMatch);

      if (passwordMatch) {
        const token = jwt.sign(
          { userId: userData._id, role: "staff" },
          process.env.JWT_SECRET_KEY,
          { expiresIn: 30000 }
        );
        console.log(token);

        res
          .status(200)
          .json({ token: token, staff: userData, message: "success token" });
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

module.exports.authStaff = async (req, res) => {
  try {
    console.log("req.staff", req.staff);
    res.json({ status: true, staff: req.staff });
  } catch (error) {
    console.log("no auth");
  }
};

module.exports.adventureManagement = async (req, res) => {
  try {
    
    await resort
      .find({ resortowner: "64ad9f37972741f1f7b2f4e0" })
      .then((response) => {
        // console.log(response,"rps");
        res.json({
          status: true,
          message: "successfully done it",
          resort: response,
        });
      });
  } catch (error) {
    console.log(error.message);
  }
};



module.exports.addAdventure = async (req, res) => {
  try {
    const { names, description, time } = req.body;
    const image = req.file.filename;
    console.log("req.body", req.body);
    console.log("req.bodys", image);
    const id = req.params.id;

    const obj = {
      name: names,
      description: description,
      time: time,
      image: image,
    };

    const adventureData = await resort.findByIdAndUpdate(
      { _id: id },
      { $push: { adventure: obj } } // Add the obj directly to the 'adventure' array
    );

    console.log(adventureData, "adventure came");
    if (adventureData)
      res
        .status(201)
        .json({
          status: true,
          message: "successfully created it",
          adventure: adventureData,
        });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports.deleteAdventure = async (req, res) => {
  try {
    console.log(req.body.id);
    const resortData = await resort.find({ _id: id });
    if (deleteData) {
      res.json({
        status: true,
        message: "successfully deleted",
      });
    }
  } catch (error) {
    console.log(error.message);
    res.json({
      status: false,
      message: "Can't find the data",
    });
  }
};
module.exports.dashBoardChart = async (req, res) => {
  try {
    const staff = req.params.id;
    console.log(staff, "...............///");
    const users = req.params.user_id;
    console.log(users, "------------------------------------userssss");

    const resortCount = await resort.find({
      $and: [{ resortowner: staff }, { is_delete: false }, { verify: true }],
    });
    console.log(resortCount, "-------------------resortData");
    

    const data = resortCount.map((obj) => obj._id);
    console.log(data, "-------------------------------------datacount");

   
    const bookings = await book
      .find({
        $and: [
          { resortId: { $in: data } }, // Check if resortId is in data array
          { status: "booked" }, // Check if status is "booked"
        ],
      })
      .countDocuments();

    

    const resortCounts = await resort
      .find({
        $and: [{ resortowner: staff }, { is_delete: false }, { verify: true }],
      })
      .countDocuments();
    console.log(resortCounts,"ooooooooooooooooooooooooohhhhhhhhhhhhhhhhhhhhhhhhhh");

    // pie charts
    // console.log(data,"kkkkkkkk");

    const income = await book.aggregate([
      {
        $match: {
          resortId: { $in: data },
        },
      },

      {
        $lookup: {
          from: "resorts",
          localField: "resortId",
          foreignField: "_id",
          as: "resort",
        },
      },

      {
        $unwind: "$resort",
      },

      {
        $group: {
          _id: "$resort.resortname",
          payment: { $sum: "$payment.payment_amount" },
        },
      },
    ]);

    console.log(income, "incomeeee");

    // const weeklySalesReport = await book.aggregate([
    //   {
    //     $match: {
    //       resortId: { $in: data },
    //       status: "booked",
    //     },
    //   },
    //   {
    //     $addFields: {
    //       fromDate: {
    //         $dateFromString: {
    //           dateString: "$fromDate",
    //         },
    //       },
    //     },
    //   },
    //   {
    //     $group: {
    //       _id: {
    //         year: { $isoWeekYear: "$fromDate" },
    //         week: { $isoWeek: "$fromDate" },
    //       },
    //       totalSales: { $sum: "$payment.payment_amount" },
    //     },
    //   },
    //   {
    //     $sort: {
    //       "_id.year": 1,
    //       "_id.week": 1,
    //     },
    //   },
    // ]);

    // console.log(weeklySalesReport);

    const weeklySalesReport = await book.aggregate([
      {
        $match: {
          resortId: { $in: data },
          status: "booked",
        },
      },
      {
        $addFields: {
          fromDate: {
            $dateFromString: {
              dateString: {
                $substr: ["$fromDate", 0, 24], // Extract the first 24 characters (without timezone info)
              },
            },
          },
        },
      },
      {
        $group: {
          _id: {
            year: { $isoWeekYear: "$fromDate" },
            week: { $isoWeek: "$fromDate" },
          },
          totalSales: { $sum: "$payment.payment_amount" },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.week": 1,
        },
      },
    ]);
    
    console.log(weeklySalesReport);
    

    res.json({
      status: true,
      message: "submitted",
      resortCount: resortCounts,
      bookingCount: bookings,
      income: income,
      weeklySalesReport: weeklySalesReport,
    });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports.getStaff = async (req, res) => {
  const id = req.params.id;
  // console.log(id,'   kkkkkkkkkk');

  try {
    const user = await Staff.findOne({ _id: id });
    // console.log(user);
    if (user) {
      console.log(user);
      const { password, ...otherDetails } = user;
      // console.log(otherDetails);
      res.status(200).json(otherDetails);
    } else {
      res.status(404).json("No such User");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports.addMessage = async (req, res) => {
  const { chatId, senderId, text } = req.body;
  const message = new Message({
    chatId,
    senderId,
    text,
  });
  try {
    const result = await message.save();
    res.status(200).json(result);
  } catch (error) {
    console.log(error.Message);
  }
};

module.exports.getMessage = async (req, res) => {
  try {
    const chatId = req.params.chatId;
    console.log(chatId, "ch");
    const result = await Message.find({ chatId });
    console.log(result, "result");

    res.status(200).json(result);
  } catch (error) {
    console.log(error.message);
  }
};
