import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const databaseUri = process.env.MONGODB_URI;
mongoose.connect(databaseUri);

const db = mongoose.connection;

db.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

db.once("open", () => {
  console.log("Connected to MongoDB");
});
