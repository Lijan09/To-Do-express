import mongoose from "mongoose";
import config from "./config";

export const dbConnect = async () => {
    await mongoose.connect(config.dbURL)
}
