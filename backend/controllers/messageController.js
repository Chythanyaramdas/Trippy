const Message=require('../models/messageModel');

module.exports.addMessage=async(req,res)=>{

    const{chatId,senderId,text}=req.body
    const message=new Message({
        chatId,
        senderId,
        text
    })
    try {
        const result=await message.save();
        res.json({
            status:true,
            message:"successfully",
            result:result
        })
        
    } catch (error) {
        console.log(error.Message);
        
    }
}

module.exports.getMessage=async(req,res)=>{
    const{chatId}=req.params;

    try {

        const result=await Message.find({chatId})
        res.json({
            status:true,
            message:"successfully",
            result:result
        })
        
    } catch (error) {

        console.log(error.message);
        
    }
}