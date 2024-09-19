import express  from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import authRoutes from "./routes/auth.routes.js"
import connectToMongoose from "./db/connectToMongoDB.js"
import messageRoutes from "./routes/message.routes.js"
import userRoutes from "./routes/user.routes.js"


const app = express()
const PORT = process.env.PORT || 5000

dotenv.config();

app.use(cookieParser())
app.use(express.json())
app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)
app.use("/api/users", userRoutes)
app.get("/", (req, res)=>{
    res.send("hello")
})
app.listen(PORT, ()=>{
    connectToMongoose();
    console.log("Server is running on PORT",PORT)
})