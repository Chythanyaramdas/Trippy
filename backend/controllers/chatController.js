

const Chat=require('../models/chatModel')

module.exports.createChat=async(req,res)=>{
    const newChat=new Chat({
        members:[req.body.senderId,req.body.receiverId]
    })
    try {

        const result=await newChat.save()
        res.json({
            status:true,
            message:"success",
            result:result
        })
        
    } catch (error) {

        console.log(error.message);
        
    }
}

module.exports.userChats=async(req,res)=>{
    try {

        const chat=await Chat.find({
            members:{$in:[req.params.id]}
        })
        console.log(req.params.id);
        console.log(chat);
        res.json({
            status:true,
            message:"successfully",
            chat:chat
        })
        
    } catch (error) {

        console.log(error.message);
        
    }
}


module.exports.findChat=async(req,res)=>{
    try {

        const chat=await Chat.findOne({
            members:{$all:[req.params.firstId,req.params.secondId]}
        })
        res.json({
            status:true,
            message:"successfully",
            chat:chat
        })
        
    } catch (error) {

        console.log(error.message);
        
    }
}
module.exports.StaffChats = async (req, res) => {
    try {
      const chat = await Chat.find({
        members: { $in: [req.params.staffId] },
      });
      console.log(chat,"iiii")
      res.status(200).json(chat);
    } catch (error) {
      res.status(500).json(error);
    }
  };
  module.exports.findstaffchat=async(req,res)=>{
    console.log("finding...")
    try {
        const staffChat=await Chat.findOne({
            members:{$all:[req.params.firstId,req.params.secondId]}
        })
        console.log(staffChat,"stagggg")
        res.status(200).json(staffChat)
    } catch (error) {
        res.status(500).json(error)
        
    }
  }