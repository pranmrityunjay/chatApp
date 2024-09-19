import { Conversation } from "../models/conversation.model.js";
import { Message } from "../models/message.model.js";

export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params; // Receiver ID from URL params
        const senderId = req.user._id; // Sender ID from authenticated user

        // Find conversation between sender and receiver
        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }, // Make sure to use "participants"
        });

        // If no conversation, create one
        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
            });
        }

        // Create a new message
        const newMessage = await Message.create({
            senderId,
            receiverId,
            message,
        });

        // Push the message ID to the conversation's message array
        if (newMessage) {
            conversation.messages.push(newMessage._id);
            await conversation.save();  // Save the updated conversation
        }

        console.log(newMessage);
        res.status(201).json(newMessage);

    } catch (error) {
        console.log("Error in sendMessage controller", error);
        res.status(500).json({ error: "Internal server error" }); // Fix the typo here
    }
};

export const getMessage = async (req, res)=>{
    try {
        const {id : chatUserId} = req.params
        const senderId = req.user._id;
        console.log(senderId, chatUserId)
        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, chatUserId] }, // Make sure to use "participants"
        }).populate("messages")
        return res.status(500).json(conversation.messages)
    } catch (error) {
        console.log("Error in getMessage controller", error);
        res.status(500).json({ error: "Internal server error" });
    }
}