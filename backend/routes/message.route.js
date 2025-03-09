import express from "express";
import { getMessage, recentChats } from "../controller/message.controller.js";
import isLoggedIn from "../Middleware/isLoggedin.js";
const router = express.Router();

router.get("/get/:id", isLoggedIn, getMessage);
router.get("/recent-chats", isLoggedIn, recentChats);
export default router;
