import { User } from "../models/user.model.js";

export const getUser = async (req, res)=>{
    try {
        const senderId = req.user._id;
        const users = await User.find({id :{$ne: senderId}}).select("-password")
        return res.status(201).json(users)
    } catch (error) {
        console.log("Error in getMessage controller", error);
        res.status(500).json({ error: "Internal server error" });
    }
}