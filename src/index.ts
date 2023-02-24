import mongoose from "mongoose"
import dotenv from "dotenv";

import databaseLoader from "./middleware/databaseLoader";
import createServer from "./utils/server";
dotenv.config();
boot();
async function boot() {
    await mongoose.connect(process.env.MONGO_URL as string)
        .then(() => console.log("CONNECTED TO MONGO"))
        .catch((err) => console.log(err));
    await databaseLoader();
    const app = createServer();
    app.listen(process.env.PORT || 5000, () => console.log("SERVER UP"));
}



