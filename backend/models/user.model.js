import mongoose,{Schema} from "mongoose";
const userSchema = new mongoose.Schema({
    fullName:{
        type:String,
        req:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        requird:true,
        minlength:6
    },
    gender:{
        type:String,
        required:true,
        enum:["male", "female"]
    },
    profilePic:{
        type:String,
        default:"",
    },
},
{timestamps:true}
)

export const User = mongoose.model("User", userSchema);