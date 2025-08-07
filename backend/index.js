import express from "express";
import dotenev from "dotenv";
import useRouter from "./routes/user.route.js";
import messageRouter from "./routes/message.route.js";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app } from "./SocketIO/server.js";
import { server } from "./SocketIO/server.js";

dotenev.config();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     credentials: true,
//     allowedHeaders: ["Content-Type"],
//     methods: ["GET", "POST", "PUT", "DELETE"],
//   })
// );
app.use(
  cors({
    origin: ["https://chat-app-411a.vercel.app"], // update this
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
const PORTNUMBER = process.env.PORT || 4001;

try {
  mongoose.connect(process.env.MONGO_URL, {
    dbname: process.env.db_name,
  });
  console.log("mongodb connected");
} catch (error) {
  console.log(error);
}

app.use("/user", useRouter);
app.use("/message", messageRouter);

app.get("/", (req, res) => {
  res.send("home page");
});

server.listen(PORTNUMBER, () => {
  console.log(`listening to port ${PORTNUMBER} `);
});
