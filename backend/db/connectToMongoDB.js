import mongoose from "mongoose";

const connectToMongoose = async ()=>{
    try{
        const responce = await mongoose.connect(process.env.MONGO_DB_URI);
    } catch(error){
        console.log("Error connecting to MongoDB", error.message)
    }
}

export default connectToMongoose;