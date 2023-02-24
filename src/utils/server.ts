import express, { Express } from "express";
import userRoute from "../routes/user";
import authRoute from "../routes/auth";
import productRoute from "../routes/product";
import cartRoute from "../routes/cart";
import orderRoute from "../routes/order";

export default function createServer() {
    const app = express();
    app.use(express.json());
    configRoutes(app);
    return app;
}
function configRoutes(app: Express) {
    app.use("/api/", authRoute);
    app.use("/api/user", userRoute);
    app.use("/api/cart", cartRoute);
    app.use("/api/order", orderRoute);
    app.use("/api/product", productRoute);
}