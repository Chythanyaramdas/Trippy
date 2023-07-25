const mongoose=require('mongoose')
// const { ObjectId } = require('mongodb');
const resortSchema= mongoose.Schema({
    
    resortowner:{
        type: mongoose.Schema.Types.ObjectId,
        // type : ObjectId,
        require:true,
        ref: "staffModel"
      },
    resortname:{
        type:String,
        // required:[true,'resort name is required']
    },
    
    room_capacity:{
        type:Number,
    //     required:[true,"required"]
     },
    
  
    description:{
        type:String,
        required:[true,'description is required']
    },
   
    image:{
        type:[String],
        required:[true,'image is required']

    },
    
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
    

    category:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
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
