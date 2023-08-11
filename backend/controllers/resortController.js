const Location = require("../models/locationModel");
const resort = require("../models/resortModel");
const category = require("../models/categoryModel");
const { response } = require("express");
// const sharp=require('sharp')

// const fs = require('fs')
// const path = require('path')

module.exports.resortLocation = async (req, res) => {
  try {
    console.log("niiiiiyoooo");
    const locationData = await Location.find({ is_delete: false });
    const resortData = await resort.find({});
    const categoreyData = await category.find({ is_delete: false });
    res.json({
      status: true,
      place: locationData,
      resort: resortData,
      category: categoreyData,
    });
  } catch (error) {
    console.log(error.message);
  }
};

// module.exports.resort = async (req, res) => {
//   console.log("jeee");

//   let imageId = [];
//   console.log("llllls");

//         const cropWidth = 550;
//         const cropHeight = 370;
//         console.log(req.files);

//         if (req.files.length > 0) {

//         for (let i = 0; i < req.files.length; i++) {
//           console.log("lllll");
//             const imagePath = path.join(__dirname, '../public/images', req.files[i].filename);
//             const croppedImagePath = path.join(__dirname, '../public/images','cropped-'+   req.files[i].filename);
//             console.log("lllll");

//             try{

//             // Load the image using sharp
//             const image = sharp(imagePath);

//             // Convert the image to JPEG format with higher quality
//             await image
//                 .jpeg({ quality: 90 })
//                 .resize(cropWidth, cropHeight, { fit: 'cover' })
//                 .toFile(croppedImagePath);

//                 imageId.push(i); // You might want to use something more meaningful as the image ID
//               } catch (error) {
//                 console.log('Error processing image:', error.message);
//               }

//     try {
//       // const formValues = req.body.form;
//       // console.log('formValues:', formValues);

//       fs.chmodSync(imagePath, 0o777);

//       fs.unlinkSync(imagePath);

//       const{formValues,adventure}=req.body;

//       let newAdventure=JSON.parse(adventure)
//       let newFormValues=JSON.parse(formValues)
//       console.log('formValues:',newFormValues.ownerName);
//       console.log("image"+req.file.filename);
//       console.log("update value");

//       let newUser=new  resort({
//         ownerName:newFormValues.ownerName,
//           resortName:newFormValues.resortName,
//           description:newFormValues.description,
//           capacity:parseInt(newFormValues.capacity),
//           price:parseInt(newFormValues.price),
//           adventure:newAdventure,
//           // image:req.file.filename,
//           image: imageId,
//           phone:newFormValues.phone
//       })

//       console.log(newUser,"staff come");
//       newUser.save().then((data)=>{
//         console.log(data,"miiiioo");
//         res.status(200).json({message:"Authenticated"})
//       });

//     } catch (error) {
//       console.log(error.message);
//     }
//   };

// }
// }
// module.exports.resort = async (req, res) => {
//   console.log("jeee");
//   let imagePath;
//  console.log("miiiijjj");

//   let imageId = [];

//   const cropWidth = 550;
//   const cropHeight = 370;

//   console.log(req.files,"looook");

//   for (let i = 0; i < req.files.length; i++) {
//     console.log("lllll");
//     let imagePath = path.join(__dirname, '../public/images', req.files[i].filename);

//     try {
//       // Load the image using sharp
//       const image = sharp(imagePath);

//       // Convert the image to JPEG format with higher quality
//       await image
//         .jpeg({ quality: 90 })
//         .resize(cropWidth, cropHeight, { fit: 'cover' })
//         .toFile(croppedImagePath);

//         imageId.push(i); // You might want to use something more meaningful as the image ID
//       }

//       catch (error) {
//         console.log('Error processing image:', error.message);
//       }
//     }

//     try {
//       // const formValues = req.body.form;
//       // console.log('formValues:', formValues);

//       fs.chmodSync(imagePath, 0o777);

//       fs.unlinkSync(imagePath);

//       const{formValues,adventure}=req.body;

//       let newAdventure=JSON.parse(adventure)
//       let newFormValues=JSON.parse(formValues)
//       console.log('formValues:',newFormValues.ownerName);
//       console.log("image"+req.file.filename);
//       console.log("update value");

//       let newUser=new  resort({
//         ownerName:newFormValues.ownerName,
//           resortName:newFormValues.resortName,
//           description:newFormValues.description,
//           capacity:parseInt(newFormValues.capacity),
//           price:parseInt(newFormValues.price),
//           adventure:newAdventure,
//           // image:req.file.filename,
//           image: imageId,
//           phone:newFormValues.phone
//       })

//       console.log(newUser,"staff come");
//       newUser.save().then((data)=>{
//         console.log(data,"miiiioo");
//         res.status(200).json({message:"Authenticated"})
//       });

//     } catch (error) {
//       console.log(error.message);
//     }
//   };

// let imageId = [];
// let imagePath
module.exports.resort = async (req, res) => {
  // console.log("jeee");

  // if (req.files && req.files.length > 0) {

  // for (let i = 0; i <= req.files.length; i++) {
  //   console.log("lllll",req.files.filename);
  //    imagePath = path.join(__dirname, '../public/images', req.files[i].filename);

  //   try {
  //     // Load the image using sharp
  //     const image = sharp(imagePath);

  //     // Convert the image to JPEG format with higher quality
  //     await image
  //       .jpeg({ quality: 90 })
  //       .resize(cropWidth, cropHeight, { fit: 'cover' })
  //       .toFile(croppedImagePath);

  //       imageId.push(i); // You might want to use something more meaningful as the image ID
  //     }

  //     catch (error) {
  //       console.log('Error processing image:', error.message);
  //     }
  //   }
  // }

  // else{
  //   console.log("no uploads");
  // }

  try {
    // const formValues = req.body.form;
    // console.log('formValues:', formValues);

    // fs.chmodSync(imagePath, 0o777);

    // fs.unlinkSync(imagePath);

    const { formValues, adventure, location } = req.body;

    // let newAdventure=JSON.parse(adventure)
    let newLocation = JSON.parse(location);
    let newFormValues = JSON.parse(formValues);
    console.log("formValues:", newFormValues.resortowner);
    // console.log("image" + req.file.filename);
    console.log(req.files);
    let image = req.files.map((file) => file.filename);
    console.log("imagesss", image);
    console.log("update value");
    console.log(req.body);
console.log(id);
    let newUser = new resort({
      resortowner: newFormValues.id,
      resortname: newFormValues.resortname,
      description: newFormValues.description,
      category:newFormValues.category,
      services:newFormValues.services,
      capacity: parseInt(newFormValues.capacity),
      price: parseInt(newFormValues.price),
      // adventure:newAdventure,
      // image: req.file.filename,
      location:newLocation,

      image: image,
      phone: newFormValues.phone,
    });
    console.log(location, "locationss");

    console.log(newUser, "staff come");
    newUser.save().then((data) => {
      console.log(data, "miiiioo");
      // req.adventureId = data._id;

      res.status(200).json({ message: "Authenticated" });
    });
  } catch (error) {
    console.log(error.message);
  }
};
module.exports.resortManagement = async (req, res) => {
  try {
    await resort
      .find({ $and: [{ is_delete: false }, { verify: true }] })
      .populate("resortowner")
      .then((response) => {
        console.log(response, "espp");
        res.json({
          status: true,
          message: "successfully done",
          resort: response,
        });
      });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports.singleResort = async (req, res) => {
  try {
    const id = req.query.id;
    const resortData = await resort.findById({ _id: id });
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

module.exports.singleResortInfo = async (req, res) => {
  try {
    const { id, action } = req.params;
    let data;
    if (action === "block") {
      data = true;
    } else {
      data = false;
    }

    await resort
      .findByIdAndUpdate({ _id: id }, { is_blocked: data })
      .then((response) => {
        res
          .json({
            status: true,
            message: "successfully Done",
          })
          .catch((error) => {
            console.log(error.message);
          });
      });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports.getResort = async (req, res) => {
  try {
    const resortData = await resort.findOne({ _id: req.params.id });
    console.log(resortData, "rdd");
    if (resortData) {
      res.json({
        status: true,
        banner: resortData,
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};
module.exports.resortManagementView = async (req, res) => {
  try {
    const { staff } = req.params;

    const resortCollection = await resort.find({
      $and: [{ is_delete: false }, { verify: true }, { resortowner: staff }],
    });
    res.json({
      status: true,
      resort: resortCollection,
    });
  } catch (error) {
    console.log(error.message);
  }
};
module.exports.updateResort = async (req, res) => {
  try {
    // console.log(req.body, "kkkk");
    // console.log("resortUpdateszz");
    // console.log(req.params);
    const id = req.params.id;
    // console.log(req.file, "filesss");
    let image=req.files.map((file)=>file.filename)
    console.log(image);
    if (image.length) {
      const categoryData = await resort.updateOne(
        { _id: id },
        {
          $set: {
            resortname: req.body.resortname,
            description: req.body.description,
            // image: req.file.filename,
            image:image,
            price: req.body.price,
            capacity: req.body.capacity,
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
      const categoryData = await resort.updateOne(
        { _id: id },
        {
          $set: {
            resortname: req.body.resortname,
            description: req.body.description,
            price: req.body.price,
            capacity: req.body.capacity,
            image:image
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
