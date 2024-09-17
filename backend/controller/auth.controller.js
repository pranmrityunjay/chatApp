import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs"
import generateTokenAndSetCookie from "../utils/generateToken.js";
export const signup = async (req, res) => {

    try {
        const { fullName, username, password, confirmPassword, gender } = req.body;
        // Check if passwords match
        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords don't match" });
        }
        console.log("hello23432")
        // Check if the username already exists
        const userExists = await User.findOne({ username });
        if (userExists) {
            return res.status(400).json({ error: "Username already exists" });
        }
        // Set profile picture based on gender
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;
        const profilePic = gender === "male" ? boyProfilePic : girlProfilePic;

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt)
        console.log("hello how are you", hashPassword)
        const newUser = await User.create({
            fullName,
            username,
            password: hashPassword,
            gender,
            profilePic,
        });
        if(newUser)
                generateTokenAndSetCookie(newUser.id, res);
        // Respond with the created user details
        res.status(200).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            username: newUser.username,
            profilePic: newUser.profilePic,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const login = async (req, res)=>{
    console.log("login is called")
    try {
        const {username, password} = req.body;
        const findUser = await User.findOne({username})
        if(!findUser)
            return res.status(400).json({error : "invalid username"})
        const isPasswordCorrect = await bcrypt.compare(password, findUser.password || "");
        if(!isPasswordCorrect)
            return res.status(4000).json({error : "password is not correct"})
        generateTokenAndSetCookie(findUser._id, res)
        res.status(200).json({
            _id: findUser._id,
            fullName:findUser.fullName,
            username:findUser.username,
            profilePic:findUser.profilePic,
        })
        
    } catch (error) {
        console.log("Error in login", error.message)
        res.status(500).json({error: "Internal Server Error"})
    }
}

export const logout = async (req, res)=>{
    try {
        res.cookie("jwt", "", {maxAge: 0});
        res.status(200).json({message: "Logged out successfully"});
        
    } catch (error) {
        console.log("Error in logout controller", error.message)
        res.status(500).json({error: "internal Server Error"});
    }
    
}