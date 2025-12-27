import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import {connectDB} from "./lib/db.js";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import {app, server} from "./lib/socket.js";
import { Server } from "socket.io";


dotenv.config();


const PORT = process.env.PORT;

// app.use(express.json());// this will basically extract data from the express json body outside ..
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.get('/', (req, res) => {
  res.json({ 
    message: 'ChatKaro API is running!',
    status: 'active',
    timestamp: new Date().toISOString()
  });
});

// server.listen(PORT, () => {
//     console.log("server is running on port:" + PORT);
//     connectDB();
// });

if (process.env.NODE_ENV !== 'production') {
  server.listen(PORT, () => {
    console.log("server is running on port:" + PORT);
    connectDB();
  });
} else {
  connectDB();
}

export default app;