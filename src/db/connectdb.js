import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({
    path : "./.env"
});

const conectDb = async () => {
  try {
    mongoose.connect(process.env.MONGO_DB_URI);
    const db = mongoose.connection;
    db.on("connected", () => {
      console.log(`Database connection established on host ${db.host}`);
    });
    db.on("error", () => {
      console.log("Database connection failed");
    });
    db.on("disconnected", () => {
      console.log("Database connection disconnected");
    });
    db.on("reconnected", () => {
      console.log("Database connection reconnected");
    });
  } catch (error) {
    console.log("database connection failed: ", error.message);
  }
};
export default conectDb;