import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/user.js"
import authRoute from "./routes/auth.js"
const app = express();
dotenv.config();

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("CONNECTED TO MONGO"))
    .catch((err) => console.log(err));

app.use(express.json());
app.use("/api/", authRoute);
app.use("/api/user", userRoute);
app.listen(process.env.PORT || 5000, () => console.log("SERVER UP"));