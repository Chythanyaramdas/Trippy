const Location=require('../models/locationModel')
const resort=require('../models/resortModel')
// const sharp=require('sharp')

// const fs = require('fs')
// const path = require('path')

module.exports.resortLocation=async(req,res)=>{
   
    try {
        console.log("niiiii");
        const locationData=await Location.find({is_delete:false}) 
        const resortData=await resort.find({})
        res.json({status:true,place:locationData,resort:resortData})
        
    } catch (error) {

        console.log(error.message);
        
    }
}



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

      const{formValues,adventure}=req.body;


      let newAdventure=JSON.parse(adventure)
      let newFormValues=JSON.parse(formValues)
      console.log('formValues:',newFormValues.ownerName);
      console.log("image"+req.file.filename);
      console.log("update value");

      let newUser=new  resort({
        ownerName:newFormValues.ownerName,
          resortName:newFormValues.resortName,
          description:newFormValues.description,
          capacity:parseInt(newFormValues.capacity),
          price:parseInt(newFormValues.price),
          adventure:newAdventure,
           image:req.file.filename,
          // image: imageId,
          phone:newFormValues.phone
      })

      console.log(newUser,"staff come");
      newUser.save().then((data)=>{
        console.log(data,"miiiioo");
        res.status(200).json({message:"Authenticated"})
      });
      
    } catch (error) {
      console.log(error.message);
    }
  };
  
