const Chat = require("../models/chatModel");
const Staff = require("../models/staffModel");

module.exports.createChat = async (req, res) => {
  const newChat = new Chat({
    members: [req.body.senderId, req.body.receiverId],
  });
  try {
    const result = await newChat.save();
    res.json({
      status: true,
      message: "success",
      result: result,
    });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports.userChats = async (req, res) => {
  try {
    const chats = await Chat.find({
      members: { $in: [req.params.id] },
    });

    
    console.log(req.params.id);
    const chatCompanyData = await Promise.all(
      chats.map(async (chat) => {
        // console.log(chat);
        const receiverId = await chat.members.filter(
          (member) => member !== req.params.id
        );

        console.log(receiverId[0]);
        const staff = await Staff.findById(receiverId[0]);
        console.log(staff, "staffDataon is ");

        return {
          staffId: staff._id,
          staff: { email: staff.email, staffName: staff.name },
          chatId: chat._id,
        };
      })
    );
    console.log(chatCompanyData, "00000000000000000");
    console.log(chatCompanyData);
    res.json({
      status: true,
      message: "successfully",
      chat: chats,
      chatCompanyData,
    });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports.findChat = async (req, res) => {
  try {
    const chat = await Chat.findOne({
      members: { $all: [req.params.firstId, req.params.secondId] },
    });
    res.json({
      status: true,
      message: "successfully",
      chat: chat,
    });
  } catch (error) {
    console.log(error.message);
  }
};
module.exports.StaffChats = async (req, res) => {
  try {
    const chat = await Chat.find({
      members: { $in: [req.params.staffId] },
    });
    console.log(chat, "iiii");
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json(error);
  }
};
module.exports.findstaffchat = async (req, res) => {
  console.log("finding...");
  try {
    const staffChat = await Chat.findOne({
      members: { $all: [req.params.firstId, req.params.secondId] },
    });
    console.log(staffChat, "stagggg");
    res.status(200).json(staffChat);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports.staffChats = async (req, res) => {
  try {
    
    console.log(req.params.id);
    const chat = await Chat.find({
      members: {
        $elemMatch: {
          $in: [req.params.id],
        },
      },
    });

    console.log(chat + "jjjkjkjkjkl");
    res.json({
      status: true,
      message: "successfully",
      chat: chat,
    });
  } catch (error) {
    console.log(error.message);
  }
};
