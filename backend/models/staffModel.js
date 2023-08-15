const mongoose=require('mongoose')
const staffSchema= mongoose.Schema({
name:{
    type:String,
    required:true
},

email:{

    type:String,
    required:true
},
password:{

    type:String,
    required:true
},
mobileNumber:{
    type:Number,
    required:true
},

// is_admin:{   
//     type:Number,
//     default:0,
//     required:true
   
// },

is_varified:{
   type:Number,
   default:0
},
address:[
    {

        name:{type:String},
        address:{type:String},
        phoneNumber:{type:String},
        locality:{type:String},
        district:{type:String},
        state:{type:String},
        pinCode:{type:Number}
    }
],
isBlocked:{
    type:Boolean,
    default:false
},
status:{

    type:String,
    default:"unbanned"
},
notification:[{

    message:{
        type:String
    },
    resortId:{
        type:String,
        required:true

    }
    
}]
},{
    timestamps:true
},);
module.exports=mongoose.model('staffModel',staffSchema);