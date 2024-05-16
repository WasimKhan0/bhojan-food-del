import mongoose from "mongoose";

export const connectDB = async()=>{
 await mongoose.connect('mongodb+srv://wk09908:321329@cluster0.qmpehap.mongodb.net/food-del')
 .then(()=>console.log('DB connected'))
}