const Location = require("../models/locationModel");
const resort = require("../models/resortModel");
const category = require("../models/categoryModel");
const services=require("../models/ServicesModel")
const { response } = require("express");

const Chat=require('../models/chatModel')
const { Long } = require("mongodb");
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId
// const sharp=require('sharp')

// const fs = require('fs')
// const path = require('path')

module.exports.resortLocation = async (req, res) => {
  try {
    console.log("niiiiiyoooo");
    const locationData = await Location.find({ is_delete: false });
    const resortData = await resort.find({});
    const categoreyData = await category.find({ is_delete: false });
    const serviceData=await services.find({is_delete:false})
    res.json({
      status: true,
      place: locationData,
      resort: resortData,
      category: categoreyData,
      services:serviceData
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
  
 
  try {
    

    const { formValues, adventure, location,services } = req.body;
console.log(req.body);
    // let newAdventure=JSON.parse(adventure)
    let newLocation = JSON.parse(location);
    let newFormValues = JSON.parse(formValues);
    console.log("formValues:", newFormValues.resortowner);
    // console.log("image" + req.file.filename);
    console.log(req.files);
    let image = req.files.map((file) => file.filename);
    console.log("imagesss", image);
    console.log("update value");
    console.log(JSON.parse( services)); 
console.log(newFormValues.id,"oppppppppooo");
    let newUser = new resort({
      resortowner: newFormValues.id,
      resortname: newFormValues.resortname,
      description: newFormValues.description,
      category:newFormValues.category, 
      services:newFormValues.services,
      capacity: parseInt(newFormValues.capacity),
      price: parseInt(newFormValues.price),
      services:JSON.parse( services),

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
            services:req.body.services
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
            // image:image,
            services:req.body.services
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
// module.exports.reviews=async(req,res)=>{
//   try {

//    const{resort_id,rating,comment,users_id}=req.params; 
//    console.log(resort_id,"rid------------------------------------");
//    console.log(rating);
//    console.log(comment);
//    console.log(users_id);
  
  //  const review=await resort.findByIdAndUpdate({_id:resort_id},{
  //   $set:{

  //     userId:users_id,
  //     userReview:comment,
  //     rating:rating,
  //   }
  //  })

  // const resorts = await resort.findOne({
  //   _id: resort_id,
  //   reviews: { $elemMatch: { userId: users_id } }
  // });
  // console.log(resorts,"uuuuuuuuuuuuuuuuuuuuuuuuuuu");
  // // if(resorts){
  // //  res.json({
  //   status:true,
  //   message:"already added"
  //  })
  // }else{
    // try {
    //   const review = await resort.updateOne(
    //     {
    //       _id: resort_id,
    //       'reviews.userId': users_id,
    //     },
    //     {
    //       $set: {
    //         'reviews.$.userId': users_id, // Update the specific review's userId
    //         'reviews.$.userReview': comment, // Update the review text
    //         'reviews.$.rating': rating, // Update the review rating
    //         // Add more fields as needed
    //       },
    //       $setOnInsert: {
    //         'reviews.$.userId': users_id, // Update the specific review's userId
    //         'reviews.$.userReview': comment, // Update the review text
    //         'reviews.$.rating': rating,
    //       },
    //     },
    //     {
    //       upsert: true,
    //     }
    //   );
      
    //   if (review.nModified === 1) {
    //     console.log('success');
    //     // The review was added/modified successfully
    //     res.json({
    //       status: true,
    //       message: "Successfully added/modified review",
    //     });
    //   } else {
    //     console.log('error');
    //     // No modification was made, possibly due to a condition not being met
    //     res.json({
    //       status: false,
    //       message: "Review not added/modified",
    //     });
    //   }
    // } catch (error) {
    //   console.error(error);
    //   res.json({
    //     status: false,
    //     message: "An error occurred while adding/modifying review",
    //   });
    // }
    
  
//   } catch (error) {
//     console.log(error.message);
//   }
// }


module.exports.reviews=async(req,res)=>{
  try {

   const{resort_id,rating,comment,users_id}=req.params; 
   console.log(resort_id,"rid------------------------------------");
   console.log(rating);
   console.log(comment);
   console.log(users_id);
  
  //  const review=await resort.findByIdAndUpdate({_id:resort_id},{
  //   $set:{

  //     userId:users_id,
  //     userReview:comment,
  //     rating:rating,
  //   }
  //  })

  const resorts = await resort.findOne({
    _id: resort_id,
    reviews: { $elemMatch: { userId: users_id } }
  });
  console.log(resorts,"uuuuuuuuuuuuuuuuuuuuuuuuuuu");
  if(resorts){
   res.json({
    status:true,
    message:"already added"
   })
  }else{
    const review=await resort.findByIdAndUpdate({_id:resort_id},{
          $push:{
            reviews:{
              userId:users_id,
              userReview:comment,
              rating:rating,
            }
          }
        }).then(()=>{
          res.json({
            status:true,
            message:"successfully review added"
          })
        return
        })
  }
  } catch (error) {
    console.log(error.message);
  }
}


// module.exports.reviewUpdate=async(req,res)=>{
//   try {

//     const {userId,resortId}=req.body
//     console.log("pppppppppppp",req.body);
//     const resortData=await resort.find({_id:resortId})
//     console.log(resortData,"rddddddddddddddddddddddddddddddddddddd");
//     resortData.reviews.filter((obj)=>{
//       if(obj.userId===userId){
//         obj.comment=comment,
//         obj.rating=rating

//       }
//     }).resortData.save()
    
//   } catch (error) {
//     console.log(error.message);
//   }
// }
// module.exports.reviewUpdate = async (req, res) => {
//   try {
//     const { userId, resortId, comment, rating } = req.body;
//     console.log("pppppppppppp", req.body);
//     const resortData = await resort.findOne({ _id: resortId }); 
//     console.log(resortData, "rddddddddddddddddddddddddddddddddddddd");
    
   
//     if (resortData) {
   
//       const user_id = new ObjectId(userId)
//       console.log(user_id);
//       resortData.reviews.forEach((obj) => {
//         console.log('Comparing:', obj.userId, user_id); // Add this line for debugging
//         if (obj.userId === user_id) {
//           console.log('Entered if');
//           obj.comment = comment;
//           obj.rating = rating;
//           console.log(obj, "Updated Review");
//         }
//       });
      
//         await resortData.save();

//         res.json({
//           status: true,
//           message: "Review updated successfully",
//         });
//       } else {
//         res.json({
//           status: false,
//           message: "Review not found for the given userId",
//         });
//       }
//     } 
//    catch (error) {
//     console.log(error.message);
//     res.json({
//       status: false,
//       message: "An error occurred while updating the review",
//     });
//   }
// };
// ----------------------------------------------------------------------------------------------------------------------

// module.exports.reviewUpdate=async(req,res)=>{
//   try {
    
//     const{userId, resortId, comment, rating }=req.body; 
//        console.log( resortId,"rid------------------------------------");
//        console.log(rating);
//        console.log(comment);
//        console.log(userId);
      
//        const review=await resort.findByIdAndUpdate({_id:resortId},{
//         $set:{
    
          
//           userReview:comment,
//           rating:rating,
//         }
//        }).review.save()

//        res.json({
//         status:true,
//         message:"successfully done it "
//        })
    
//   } catch (error) {
//     console.log(error.message);
    
//   }
// }


module.exports.reviewUpdate = async (req, res) => {
  try {
    const { userId, resortId, comment, rating } = req.body;
    console.log("pppppppppppp", req.body);
    const resortData = await resort.findOne({ _id: resortId }); 
    console.log(resortData, "rddddddddddddddddddddddddddddddddddddd");
    let index1;
    if (resortData) {
      resortData.reviews.forEach((obj,index) => {
        const objUserIdString = obj.userId.toString(); // Convert ObjectId to string
        if (objUserIdString === userId) {
          index1 = index
          console.log('Entered if');
          obj.userReview = comment;
          obj.rating = rating;
          console.log(obj, "Updated Review");
        }
      });
      console.log('updated review');
      console.log(resortData.reviews[index1]);
      await resortData.save();

      res.json({
        status: true,
        message: "Review updated successfully",
      });
    } else {
      res.json({
        status: false,
        message: "Review not found for the given userId",
      });
    }
  } catch (error) {
    console.log(error.message);
    res.json({
      status: false,
      message: "An error occurred while updating the review",
    });
  }
};
// module.exports.createChat=async(req,res)=>{
//   ;
//   const newChat=new Chat({
//       members:[req.params.resort_id,req.params.users_id]
//   })
//   try {

//       const result=await newChat.save()
//       res.json({
//           status:true,
//           message:"success",
//           result:result
//       })
      
//   } catch (error) {

//       console.log(error.message);
      
//   }
// }

module.exports.createChat = async (req, res) => {
  try {
      console.log(req.params.resort_id,req.params.users_id,'kklklk');
    console.log('create chat');
      const chatData = await Chat.find({
         members: {
              $all: [req.params.resort_id,req.params.users_id]
          }
      })
      console.log(chatData+'this is chatddata');

      if (chatData.length > 0) {
          console.log(chatData[0]._id);

          return res.status(200).json({
              status: true,
              messege: 'success',
              chatId: chatData[0]._id
          })
      } else {
        console.log('chy');
          const chat = new Chat({
              members: [req.params.resort_id,req.params.users_id],
          })
          const chatData = await chat.save()

          return res.status(200).json({
              success: true,
              messege: 'success',
              chatId: chatData._id
          })
      }

  } catch (error) {
    console.log('error');
      return res.status(400).json({
          success: false,
          messege: 'Something Wrong',
          error
      })
  }
}