// const mongoose = require( 'mongoose');
// const messageSchema = mongoose. Schema ({
// conversationId: {
// type: String,
// },
// senderId: {
// type: String
// },
// message:
// {
//     type: String
// },
// timestamp: 
// { type: Date, 
//     default: Date.now 
// }


// });
// module.exports = mongoose.model( 'Message', messageSchema);
// models/Message.js

const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'userModel', // Reference to the User model
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'adminModel', // Reference to the User model (admin)
  },
  content: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Message', messageSchema);
