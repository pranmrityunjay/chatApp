import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import {getUser} from "../controller/user.controller.js"

const router = express.Router()

router.get("/", protectRoute, getUser)

export default router;