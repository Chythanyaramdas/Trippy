const book = require("../models/bookingModel");
const resort = require("../models/resortModel");
const { checkout } = require("../routers/Route");

module.exports.searchDate = async (req, res) => {
  const { selectedPlace, checkInDate, checkOutDate } = req.body;
  console.log(checkInDate);
  console.log(checkOutDate);
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

  const bookedData = await book.find({ status: "booked" });

  console.log(bookedData, "bd");

  const resorts = bookedData.filter((booking) => {
   
    if (
      (new Date(checkInDate) >= new Date(booking.fromDate) &&
        new Date(checkInDate) <= new Date(booking.toDate)) ||
      (new Date(checkOutDate) >= new Date(booking.fromDate) &&
        new Date(checkOutDate) <= new Date(booking.toDate))
    ) {
      return booking.resortId;
    }
  });

  console.log("------------------resorts-----------", resorts);
  const resortIds = resorts.map((resort)=>{
    return resort.resortId
  })
  console.log('--------------resortIDs------',resortIds);
  const dateData = await resort
    .find({
      $and: [
        { _id: { $nin: resortIds } },
        { "location.district": selectedPlace },
        {is_delete:false}
      ],
    })
    .populate("location.district");

  console.log(dateData, "dateeeeeeeee");
  res.json({
    status: true,
    message: "successfully  done it",
    date: dateData,
  });
};

module.exports.getBookedResort = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const bookedData = await resort
      .findById({ _id: id })
      .populate("location.district");
    console.log(bookedData, "BDZ");
    res.json({
      status: true,
      message: "successfully  done it",
      resort: bookedData,
    });
  } catch (error) {}
};

module.exports.payment = async (req, res) => {
  try {
    const { resortId, paymentt, users, checkInDate, checkOutDate } = req.body;
    console.log(req.body, "payment on reach");
    const data = await resort.findById({ _id: resortId });

    let Booking = new book({
      resortId: resortId,
      userId: users,
      fromDate: checkInDate,
      toDate: checkOutDate,
      payment: {
        payment_amount: data.price,
        payment_method: paymentt,
      },
    });
    await Booking.save();
    res.json({
      status:true,
      message:"successfull"
    })
    console.log(Booking, "BOX");
  } catch (error) {
    console.log(error.message);
  }
};

module.exports.checkSingleResort=async(req,res)=>{
  try {

    const {  checkInDate, checkOutDate,resort_id } = req.params;
    console.log(checkInDate);
    console.log(checkOutDate);
    const bookedData = await book.find({$and:[{ status: "booked" },{resortId:resort_id}]}); 

  console.log(bookedData, "bd");

  const resorts = bookedData.filter((booking) => {
   
    if (
      (new Date(checkInDate) >= new Date(booking.fromDate) &&
        new Date(checkInDate) <= new Date(booking.toDate)) ||
      (new Date(checkOutDate) >= new Date(booking.fromDate) &&
        new Date(checkOutDate) <= new Date(booking.toDate))
    ) {
      return booking.resortId;
    }
  });

  console.log("------------------resorts-----------", resorts);

  if(!resorts.length){
    res.json({
      status:true,
      message:"available"
    })
  }
  else{
    res.json({
      status:false,
      message:"unavailable"
    })
  }
    
  } catch (error) {
    console.log(error.message);
  }
}
module.exports.bookingManagement=async(req,res)=>{
  try {

    
    
  } catch (error) {
    console.log(error.message);
  }
}
