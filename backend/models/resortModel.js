const mongoose=require('mongoose')
const resortSchema= mongoose.Schema({
    
    resortowner:{
        type: mongoose.Schema.Types.ObjectId,
        require:true,
        ref: "Staff"
      },
    resortname:{
        type:String,
        required:[true,'resort name is required']
    },
    place:{
        type:String,
        required:[true,"location is specified"]
    },
    room_capacity:{
        type:Number,
    //     required:[true,"required"]
     },
    address:{
        type:String,
        required:[true]
    },
  
    description:{
        type:String,
        required:[true,'description is required']
    },
   
    image:{
        type:[String],
        required:[true,'image is required']

    },
    // document:{
    //     type:String,
    //     required:[true,'certificate is needed']
    // },
     price:{
        type:Number,
        required:[true,'price is required']
    },
    verify:{
        type:Boolean,
        default:false
    },
    phone:{
        type:Number
    },
    status:{
        type:String,
        default:'Enable',   
    },
    // service:{
    //     type:[String],
    //     required: [true, 'services are required'],

    // },
    // reject_reason:{
    //     type:String,
        
    // }

    category:{
        type:String,
        ref:"categoryModel"
    },

    location:{
        district:
        {
            type:String

        },

        place:{

            type:mongoose.Schema.Types.ObjectId,
        }

    },

    adventure:[{

        name:{
            type:String,
            required:[true,'adventure name is required']

        },

        description:{
            type:String,
            required:[true,'description is required']
        },

        time:{
            type:Number,
            required:[true]

        },

        verify:{
            type:Boolean,
            default:false
        },

        image:{
            type:[String],
            required:[true]
        }
       

    }]


   

}) 

module.exports=mongoose.model('Resort',resortSchema)
