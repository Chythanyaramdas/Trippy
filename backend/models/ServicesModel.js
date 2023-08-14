const mongoose = require('mongoose')
const servicesSchema = mongoose.Schema({

    title:{
        type:String,
        required:true

    },

    is_delete:{
        type:Boolean,
        default:false
    },
        
    }



)




module.exports = mongoose.model('Services',servicesSchema)