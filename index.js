import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/user.js"
import authRoute from "./routes/auth.js"
import productRoute from "./routes/product.js"
import databaseLoader from "./middleware/databaseLoader.js";
const app = express();
dotenv.config();

async function boot() {
    await mongoose.connect(process.env.MONGO_URL)
        .then(() => console.log("CONNECTED TO MONGO"))
        .catch((err) => console.log(err));
    await databaseLoader();
    app.use(express.json());
    app.use("/api/product", productRoute);
    app.use("/api/", authRoute);
    app.use("/api/user", userRoute);
    app.listen(process.env.PORT || 5000, () => console.log("SERVER UP"));
}
boot()


