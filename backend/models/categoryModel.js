
const mongoose = require("mongoose");
const categorySchema = mongoose.Schema({
  name: {
    type: String,
    lowercase: true,
    unique: true,
  },

  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },

  resortID: {
    type: [String],
    default: [],
  },

  is_delete: { 
    type: Boolean,
    default: false
}


},{
    timeStamps:true
},);

module.exports = mongoose.model("categoryModel", categorySchema);

