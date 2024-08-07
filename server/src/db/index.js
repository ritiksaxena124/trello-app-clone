import mongoose from "mongoose";

const connectDB = async () => {
  const DB_URI = "mongodb://localhost:27017/trello-app"
  try {
    const connectionInstance = await mongoose.connect(process.env.MONGODB_URI || DB_URI);
    console.log(`MongoDB Connected: ${connectionInstance.connection.host}`);
  } catch (err) {
    console.error("Failed to connect with DB", err);
    process.exit(1);
  }
};

export default connectDB;
