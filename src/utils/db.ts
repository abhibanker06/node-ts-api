import mongoose from "mongoose"
import { connect } from "node:http2";

export const connectDb: ()=> Promise<void> = async()=>{

    try {
        await mongoose.connect(process.env.MONGO_URI as string);
        console.log("Connected to DataBase Successfully");
    } catch (error: any) {
        console.log("Error connecting to DataBase",error.message);
        process.exit(1);
    }
}



