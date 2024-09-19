import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
    participants: [  // Make sure to use plural for an array
        {
            type: mongoose.Types.ObjectId,
            ref: 'User',
        }
    ],
    messages: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Message",
            default: [],
        }
    ]
}, { timestamps: true });

export const Conversation = mongoose.model("Conversation", conversationSchema);