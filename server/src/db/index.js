import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${connectionInstance.connection.host}`);
  } catch (err) {
    console.error("Failed to connect with DB", err);
    process.exit(1);
  }
};

export default connectDB;
