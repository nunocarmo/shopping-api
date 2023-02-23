import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/user.js";
import authRoute from "./routes/auth.js";
import productRoute from "./routes/product.js";
import cartRoute from "./routes/cart.js";
import orderRoute from "./routes/order.js";
import databaseLoader from "./middleware/databaseLoader.js";
const app = express();
dotenv.config();
boot();

async function boot() {
    await mongoose.connect(process.env.MONGO_URL)
        .then(() => console.log("CONNECTED TO MONGO"))
        .catch((err) => console.log(err));
    await databaseLoader();
    app.use(express.json());
    configRoutes();
    app.listen(process.env.PORT || 5000, () => console.log("SERVER UP"));
}

function configRoutes() {
    app.use("/api/", authRoute);
    app.use("/api/user", userRoute);
    app.use("/api/cart", cartRoute);
    app.use("/api/order", orderRoute);
    app.use("/api/product", productRoute);
}

