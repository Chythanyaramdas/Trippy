const book=require("../models/bookingModel")
const resort=require("../models/resortModel")
const { checkout } = require("../routers/Route")

module.exports.searchDate=async(req,res)=>{
    const{selectedPlace,checkIndate,checkOutDate}=req.body
//    const data= await book.find({
//         $and: [
//           { selectedPlace: selectedPlace},
//           {
//             $and: [
//               {  fromDate: { $gte: checkIndate } },
//               {   toDate: { $lt:checkIndate } } 
//             ]
//           }
//         ]
//       });
//       const resortData=await resort.find({'location.district': selectedPlace})

//       console.log( resortData,"RD");
//       console.log(data,"date picker");


      const bookedData=await book.find({status:"booked"})
      
      console.log(bookedData,"bd");

      const resorts=bookedData.filter((booking)=>{

        if(fromDate<=checkIndate<=checkOutDate || fromDate <=checkOutDate && checkOutDate<=checkIndate){

            return booking.resortId
        }
      })

      const dateData=await resort.find({$and:[{_id:{$nin:resorts}},{'location.district':selectedPlace}]}).populate('location.district')

        
     
      console.log(dateData,"dateeeeeeeee");
      res.json({
        status:true,
      message:"successfully  done it",
      date: dateData
      })
}

module.exports.resortRecord=async(req,res)=>{
  try {
    const recordData=await resort.find({is_delete:false,verify:true})
    console.log(recordData,"RDD");
    res.json({
      status:true,
      message:"successfully  done it",
      record:recordData
    })
  } catch (error) {
    console.log(error.message);
    
  }
}