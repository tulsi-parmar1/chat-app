import express from "express";
import { sendMessage, getMessage } from "../controller/message.controller.js";
import isLoggedIn from "../Middleware/isLoggedin.js";
const router = express.Router();
router.post("/send/:id", isLoggedIn, sendMessage);
router.get("/get/:id", isLoggedIn, getMessage);
export default router;
