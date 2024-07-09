import mongoose  from "mongoose";
import {MONGO_URI} from "../config";
export const dbConnection =  async() => {
    try {
        await  mongoose.connect(MONGO_URI as string );
        console.log('Database connected successfully');
    }catch(err) {
        console.log(err);
    }
}