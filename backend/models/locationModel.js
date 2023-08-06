const mongoose = require("mongoose");
const locationSchema = mongoose.Schema({

    district:{

        type:String,
        required:true
    },

    is_delete: { 
        type: Boolean,
        default: false
    },

    image:{
        type:String,
        required :true
    },

    places:[{

        place:{

            type:String,
            
          
        },

        pinCode:{
            type:Number,
            
        }
    }]



})

module.exports=mongoose.model("locationModel",locationSchema)