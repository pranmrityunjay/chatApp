import mongoose from "mongoose";

const connectToMongoose = async ()=>{
    try{
        console.log("helo", process.env.MONGO_DB_URI)
        const responce = await mongoose.connect(process.env.MONGO_DB_URI);
    } catch(error){
        console.log("Error connecting to MongoDB", error.message)
    }
}

export default connectToMongoose;