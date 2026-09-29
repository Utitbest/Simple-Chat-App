const Conversation = require("../model/conversation.model")
const Message = require("../model/message.model")
const {getReceiverSocketId, io} = require("../socket/socket")

const  sendMessage = async(req, res)=>{
    try {
        const { message } = req.body;
        const {id: receiverId } = req.params;
        const senderId = req.user

        let conversation = await Conversation.findOne({
            participants: {$all: [senderId, receiverId]},
        })

        if(!conversation){
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
            })
        }

        const newMessage = new Message({
            senderId: senderId,
            receiverId: receiverId,
            message: message 
        })

        if(newMessage){
            conversation.messages.push(newMessage._id)
        }
        await Promise.all([newMessage.save(), conversation.save()])

        // SOCKET IO FUNCTIONALITY WILL GO HERE
        // await conversation.save()
        // await newMessage.save()
        const receiverSocketId = getReceiverSocketId(receiverId);

        if(receiverSocketId){
            // io.to(socket._id).emit() used to send event to a specific client
            io.to(receiverSocketId).emit("newMessage", newMessage)
        }
        // this will run parallel
        res.status(201).json(newMessage)
    } catch (err) {
        res.status(500).json({error: "Failed to send message!"})
        console.log(err.message)
    }
}



const getMessages = async(req, res)=>{
    try {
        const {id: userToChatId} = req.params;
        const senderId = req.user;

        const conversation = await Conversation.findOne({
            participants: {$all: [senderId, userToChatId]}
        }).populate("messages") // NOT REFERENCE BUT ACTURAL MESSAGES

        if(!conversation) return res.status(200).json([])

        const messages = conversation.messages

        res.status(200).json(messages)
    } catch (error) {
        res.status(500).json({error: "Failed to get messages!"})
        console.log(error.message)
    }
}

module.exports = {sendMessage, getMessages};