import mongoose from "mongoose"
const conversationSchema = new mongoose.Schema({
    participant:[
        {
            type: mongoose.Types.ObjectId,
            ref:'User',
        }
    ],
    messages:[
        {
            type:mongoose.Types.ObjectId,
            ref:"Message",
            default:[],
        }
    ]
},{timestamps: true}
)

export const Conversation = mongoose.model("Conversation", conversationSchema)