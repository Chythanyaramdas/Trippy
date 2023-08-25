const bcrypt = require("bcryptjs");
const Admin = require("../models/adminModel");
const Resort = require("../models/resortModel");
const Staff = require("../models/staffModel");
const User = require("../models/userModel");
const book = require("../models/bookingModel");
const services = require("../models/ServicesModel");
const nodemailer = require("nodemailer");
const config = require("../config/config");
const randormstring = require("randomstring");
const express = require("express");
const session = require("express-session");
const jwt = require("jsonwebtoken");
const { admin } = require("../../main-project/src/services/adminApi");
const banner = require("../models/bannerModel");
const dotenv = require("dotenv");
const { ObjectId } = require("mongodb");
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

module.exports.Admin_Login = async (req, res, next) => {
  console.log("Staffil ethiii");

  console.log("stafflogin isss");
  try {
    const email = req.body.email;
    const aa = req.body.password;
    const adminData = await Admin.findOne({ email });
    console.log(adminData);
    if (adminData) {
      const password = await bcrypt.compare(aa, adminData.password);
      const token = jwt.sign(
        { userId: adminData._id, role: "admin" },
        process.env.JWT_SECRET_KEY,
        { expiresIn: 30000 }
      );
      console.log(token);
      if (password) {
        res
          .status(200)
          .json({ status: true, token: token, message: "success token" });
      } else {
        res.status(401).json({ message: "invalid password" });
      }
    } else {
      console.log("pottiii");
      res.status(404).json({ message: "admin not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.bannerUpload = async (req, res) => {
  try {
    const { title, description } = req.body;
    console.log(title, description);
    const newBanner = new banner({
      title,
      description,
      image: req.file.filename,
    });
    const bannerData = await newBanner.save();
    if (bannerData)
      res.status(201).json({ status: true, message: "successfully created" });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports.banners = async (req, res) => {
  try {
    const bannerCollection = await banner.find({ is_delete: false });

    res.json({ status: true, banners: bannerCollection });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports.deleteBanner = async (req, res) => {
  try {
    console.log(req.body.id);
    const bannerData = await banner.findByIdAndUpdate(req.body.id, {
      is_delete: true,
    });
    if (bannerData) {
      res.json({
        status: true,
        message: "Successfully deleted",
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

module.exports.getBanner = async (req, res) => {
  try {
    console.log("banner geting");
    const bannerData = await banner.findOne({ _id: req.params.id });
    console.log(bannerData);
    if (bannerData) {
      res.json({
        status: true,
        banner: bannerData,
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

module.exports.updateBanner = async (req, res) => {
  try {
    console.log(req.body, "kkkk");
    console.log("bannerUpdateszz");
    console.log(req.params);
    const id = req.params.id;
    console.log(req.file, "filesss");
    if (req.file) {
      const categoryData = await banner.updateOne(
        { _id: id },
        {
          $set: {
            title: req.body.name,
            description: req.body.description,
            // image: req.file.filename,
          },
        }
      );
      if (categoryData) {
        console.log("done");
        res.json({
          status: true,
          banner: categoryData,
        });
      }
    } else {
      console.log("ividde");
      const categoryData = await banner.updateOne(
        { _id: id },
        {
          $set: {
            title: req.body.name,
            description: req.body.description,
          },
        }
      );
      if (categoryData) {
        console.log("done");
        res.json({
          status: true,
          banner: categoryData,
        });
      }
    }
  } catch (error) {
    console.log(error.message);
  }
};

module.exports.resortList = async (req, res) => {
  try {
    const resortList = await Resort.find({ verify: false }).populate(
      "resortowner"
    );

    

    if (resortList) {
      res.json({
        status: true,
        resort: resortList,
      });
    } else {
      res.json({
        status: false,
        message: "no application ",
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

module.exports.resortApproval = async (req, res) => {
  try {
    const { id } = req.params;

    const approvedData = await Resort.findByIdAndUpdate(
      { _id: id },
      { verify: true }
    ).populate("resortowner");
    
    var mailOptions = {
      from: USER_MAIL,
      to: approvedData.resortowner.email,
      subject: "Otp for registration is: ",
      html: "<h1>Your resort is Approved</h1>",

     
    };
    const userData = await Staff.updateOne(
      { _id: approvedData?.resortowner?._id },
      { $pull: { notification: { resortId: id } } }
    );
    console.log(userData, "popo");
    transporter
      .sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log("success");
        }

        res.json({
          status: true,
          message: "Successfully Done",
          approvedData: approvedData,
        });
      })

      .catch((err) => {
        console.log(err.message);
      });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports.resortReject = async (req, res) => {
  try {
    const { reject } = req.params;
    const ownerId = req.body.resortOwner;
    console.log(ownerId, "rd");
    const reason = req.body.reason;
    console.log(reason, "reee");
    console.log(req.params, "reject");
    const staffEmail = await Resort.findById({ _id: reject }).populate(
      "resortowner"
    );
    let reasons = `your resort is rejected due to ${reason}`;
    const staffData = await Staff.findByIdAndUpdate(
      { _id: ownerId },
      {
        $push: {
          notification: {
            message: reasons,
            resortId: reject,
          },
        },
      }
    );

    var mailOptions = {
      from: USER_MAIL,
      to: staffEmail.resortowner.email,
      subject: "Otp for registration is: ",
      html: `<h1>${reason}</h1>`,

      // html body
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("success");
        res.json({
          status: true,
          message: "success",
          staff: staffData,
        });
      }
    });
  } catch (error) {
    console.log(error.message);
  }
};


module.exports.resortDetails = async (req, res) => {
  try {
    const id = req.query.id;
    const resortData = await Resort.findOne({ _id: id }).populate(
      "resortowner"
    );
    console.log(resortData, "vanilaaa");
    if (resortData) {
      res.json({
        status: true,
        resort: resortData,
      });
    } else {
      res.json({
        status: false,
        message: "cant find id",
      });
    }
  } catch (error) {
    console.log(error.message);
    res.json({
      status: false,
      message: error.message,
    });
  }
};
module.exports.userInfo = async (req, res) => {
  try {
    console.log("dfdfdfdfd");
    const response = await User.find({});
    console.log(response, "USER");
    res.json({
      status: true,
      message: "successfully done",
      user: response,
    });
  } catch (error) {
    console.log(error.message);
  }
};
module.exports.userAction = async (req, res) => {
  try {
    const { id, action } = req.params;
    console.log(id, action);
    let data;
    if (action == "block") {
      data = true;
    } else {
      data = false;
    }

    

    await User.findByIdAndUpdate({ _id: id }, { isBlocked: data }).then(
      (response) => {
        res
          .json({
            status: true,
            message: "successfully done it",

            //
          })
          .catch((error) => {
            console.log(error.message);
          });
      }
    );
  } catch (error) {
    console.log(error.message);
  }
};

module.exports.services = async (req, res) => {
  try {
    const servicesCollection = await services.find({ is_delete: false });
    console.log(servicesCollection, "SV");
    res.json({
      status: true,
      banners: servicesCollection,
    });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports.deleteServices = async (req, res) => {
  try {
    console.log(req.body.id);
    const serviceData = await services.findByIdAndUpdate(req.body.id, {
      is_delete: true,
    });
    if (serviceData)
      res.json({
        status: true,
        message: "Successfully done it",
      });
  } catch (error) {
    console.log(error.message);
    res.json({
      status: false,
      message: "Can't find the data",
    });
  }
};
module.exports.servicesCreation = async (req, res) => {
  try {
    const { title } = req.body;
    console.log(req.body, "reqss");
    const serv = await services.findOne({ title: title, is_delete: false });
    console.log(serv, "sddsds");
    if (!serv) {
      const newTitle = new services({
        title,
      });

      const serviceData = await newTitle.save();
      if (serviceData) {
        res.status(201).json({ status: true, message: "successfully created" });
      }
    } else {
      res.status(404).json({ status: true, message: "Already exist" });
    }
  } catch (error) {
    console.log(error.message);
  }
};
