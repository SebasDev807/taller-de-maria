import mongoose from "mongoose";
import { env } from "@/config/env";

export default dbConnect;

async function dbConnect() {
  await mongoose.connect(env.MONGODB_URI);
  return mongoose;
}