const mongoose = require("mongoose");
const ChatSchema = mongoose.Schema(
  {
    members: {
      type: Array,
    },
  },
  {
    timestamps: {
      type: Boolean,
      default: true,
    },
  }
);

module.exports = mongoose.model("Chat", ChatSchema);
