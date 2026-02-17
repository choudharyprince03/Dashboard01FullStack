import mongoose from "mongoose";
import "dotenv/config"

export const connectDB = async()=>{
    try {
        if(!process.env.DB_URL){
            console.log("❌ DB_URL is not defined in environment variables")
            process.exit(1);
        }
        await mongoose.connect(process.env.DB_URL);
        console.log("Database connection successful",mongoose.connection.name)
    } catch (error) {
        console.log("DB connection failed", error.message);
        process.exit(1); 
    }
}
