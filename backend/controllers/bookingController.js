const book = require("../models/bookingModel");
const resort = require("../models/resortModel");
const { checkout } = require("../routers/Route");
const User = require("../models/userModel");
const dotenv = require("dotenv");
dotenv.config();
const { STRIPE_KEY } = process.env;
const server_url=process.env.CLIENT_URL

const stripe = require("stripe")(STRIPE_KEY);

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
  const resortIds = resorts.map((resort) => {
    return resort.resortId;
  });
  console.log("--------------resortIDs------", resortIds);
  const dateData = await resort
    .find({
      $and: [
        { _id: { $nin: resortIds } },
        { "location.district": selectedPlace },
        { is_delete: false },
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
      status: true,
      message: "successfull",
    });
    console.log(Booking, "BOX");
  } catch (error) {
    console.log(error.message);
  }
};

module.exports.checkSingleResort = async (req, res) => {
  try {
    const { checkInDate, checkOutDate, resort_id } = req.params;
    console.log(checkInDate);
    console.log(checkOutDate);
    const bookedData = await book.find({
      $and: [{ status: "booked" }, { resortId: resort_id }],
    });

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

    if (!resorts.length) {
      res.json({
        status: true,
        message: "available",
      });
    } else {
      res.json({
        status: false,
        message: "unavailable",
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};
module.exports.bookingManagement = async (req, res) => {
  try {
    // const users=req.params.id
    // const bookedData=await book.find({$and:[{status:"booked"},{status:"cancelled"}]}).populate('resortId')
    const bookedData = await book
      .find({
        $or: [{}, { status: "booked" }, { status: "cancelled" }],
      })
      .populate("resortId");

    console.log(bookedData);
    res.json({
      status: true,
      message: "sucessfully done it ",
      book: bookedData,
    });
  } catch (error) {
    console.log(error.message);
  }
};
module.exports.paymentStripe = async (req, res) => {
  try {
    const { resortId, paymentt, userId, checkInDate, checkOutDate } = req.body;
    console.log(resortId, "RID");
    console.log(paymentt, "RIP");
    console.log(userId, "USD");
    console.log(checkInDate, "CK");
    console.log(checkOutDate, "Cd");
    const resortData = await resort.findById({ _id: resortId });

    console.log(resortData, "RD");
    let resortPrice = resortData.price;
    console.log(resortPrice);
    if (paymentt === "online") {
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price_data: {
              currency: "INR",
              product_data: {
                name: `${resortData.resortname}`,
              },
              unit_amount: resortPrice * 100,
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        // success_url: `http://localhost:3000/successPage?session_id={CHECKOUT_SESSION_ID}&resortId=${resortData._id}`,
        // cancel_url: "http://localhost:3000/cancel",
        success_url: `${server_url}/successPage?session_id={CHECKOUT_SESSION_ID}&resortId=${resortData._id}`,
         cancel_url: `${server_url}/cancel`,

      });

      res.json({
        status: true,
        url: session.url,
      });
    } else if (paymentt === "wallet") {
      const userData = await User.findById(userId);
      console.log(userData, "usr");
      if (userData.wallet >= resortData.price) {
        let Booking = new book({
          resortId: resortId,
          userId: userId,
          fromDate: checkInDate,
          toDate: checkOutDate,
          payment: {
            payment_amount: resortData.price,
            payment_method: paymentt,
          },
        });
        await Booking.save();

        res.json({
          status: true,
          message: "success",
          payMethod: paymentt,
        });
      } else {
        const error = new Error("Not enough balance in wallet");
        error.status = 400;
        throw error;
      }
    }
  } catch (error) {
    console.log(error.message);
    res.status(error.status).json({ message: error.message });
  }
};
module.exports.paymentSuccess = async (req, res) => {
  try {
    const { paymentId, resortId, users, checkInDate, checkOutDate } = req.body;
   
    console.log("-------start------------");
    const paymentChecking = await stripe.checkout.sessions.retrieve(paymentId);
    
    const data = await resort.findById({ _id: resortId });
  

    if (paymentChecking.payment_status === "paid") {
      let Booking = new book({
        resortId: resortId,
        userId: users,
        fromDate: checkInDate,
        toDate: checkOutDate,
        payment: {
          payment_amount: data.price,
          payment_method: "Online",
        },
      });
      await Booking.save();
      res.json({
        status: true,
        message: "successfull",
      });
      

      
    }
  } catch (error) {
    console.log(error.message);
  }
};
module.exports.paymentHistory = async (req, res) => {
  try {
    const users = req.params.id;
    console.log(req.params, "urd");
    console.log(users, "urs");

    const bookedHistory = await book
      .find({ userId: users })
      .populate({ path: "resortId", populate: "location.district" });
    console.log(bookedHistory[0].resortId.location.district, "bH");
    res.json({
      status: true,
      message: "successfully done it",
      booked: bookedHistory,
    });
  } catch (error) {
    console.log(error.message);
  }
};
module.exports.cancelBooking = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id, "idzzz");
    const { userId } = req.query;
    console.log(userId, "usID");

    const cancelData = await book.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          status: "cancelled",
        },
      }
    );

    const cancelledAmount = cancelData.payment.payment_amount;
    console.log(cancelledAmount, "CA---");
    const userData = await User.findByIdAndUpdate(userId, {
      $inc: { wallet: cancelledAmount },
    });
    console.log(userData, "----------------data");
    res.json({
      status: true,
      message: "Successfully Cancelled",
      cancel: cancelData,
    });
  } catch (error) {
    console.log(error.message);
  }
};
module.exports.bookingResorts = async (req, res) => {
  try {
    const staff = req.params.id;
    console.log(req.params.id, "staffffs");
    await resort
      .find({
        $and: [{ resortowner: staff }, { is_delete: false }, { verify: true }],
      })
      .then((response) => {
        res.json({
          status: true,
          message: "successs",
          resort: response,
        });
      });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports.bookingSingleResorts = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id, "idz");
    const bookedData = await book.find({ resortId: id });
    console.log(bookedData, "bD");
    res.json({
      status: true,
      message: "successfully done it",
      book: bookedData,
    });
  } catch (error) {
    console.log(error.message);
  }
};
