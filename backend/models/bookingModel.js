const mongoose = require('mongoose')
const bookingSchema=mongoose.Schema({

    resortId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Resort"
    },

    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"userModel"
    },

    fromDate:{
        type:String,
        required:true,
    },
    toDate:{
        type:String,
        required:true
    },
    payment:{
        payment_amount:{
            type:Number
        },

        payment_method:{
            type:String
        },
        payment_status:{
            type:String,
            default:"pending"
        },
        
    },

    status:{
        type:String,
        required:true,
        default:"booked"
    },
    booked_at:{
        type:Date
    }


})

module.exports=mongoose.model("Booking",bookingSchema)