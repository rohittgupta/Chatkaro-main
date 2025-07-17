import moongoose from "mongoose";

export const connectDB = async() => {
    try {
        const conn = await moongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.log("MongoDB connection failed:",error);
    }
};




