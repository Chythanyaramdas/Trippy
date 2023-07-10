const mongoose = require('mongoose')

const bannerSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required :true
    },
    description:{
        type:String
    },
    is_delete:{
        type:Boolean,
        default:false
    },
    is_delete: { 
        type: Boolean,
        default: false
    }
},{timeStamps:true})

module.exports = mongoose.model('Banner',bannerSchema)