import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

try {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("MongoDB connection successful!");
  await mongoose.disconnect();
} catch (error) {
  console.error("MongoDB connection failed:");
  console.error(error.message);
}
