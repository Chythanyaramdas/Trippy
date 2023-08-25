const Message = require("../models/messageModel");

module.exports.addMessage = async (req, res) => {
  const { chatId, senderId, text } = req.body;
  const message = new Message({
    chatId,
    senderId,
    text,
  });
  try {
    const result = await message.save();
    res.status(200).json(result);
  } catch (error) {
    console.log(error.Message);
  }
};

module.exports.getMessage = async (req, res) => {
  try {
    const chatId = req.params.chatId;
    console.log(chatId, "ch");
    const result = await Message.find({ chatId });
    console.log(result, "result");

    res.status(200).json(result);
  } catch (error) {
    console.log(error.message);
  }
};
