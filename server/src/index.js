import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config();
const port = process.env.PORT || 9081;

const serverStart = async () => {
    try {
        await connectDB();
        app.on("error", (err) => {
            console.error("Server failed to connect with DB: ", err);
            throw err;
        });
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    } catch (err) {
        console.log("Failed to start the server", err);
        throw err;
    }
};

serverStart();
