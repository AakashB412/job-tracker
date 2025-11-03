import mongoose from "mongoose";
import { config } from "./config";


export async function connectDB() {
if (!config.mongoUri) throw new Error("MONGODB_URI missing");
await mongoose.connect(config.mongoUri);
}
