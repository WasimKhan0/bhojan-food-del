import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/FoodRoute.js"; 
import userRouter from "./routes/userRoute.js";
import 'dotenv/config'
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
// Config
const app = express();
const PORT = 4000;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON request bodies

// Allow CORS for specific routes
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173'); // Replace with your frontend origin
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// API endpoints
app.use('/api/food', foodRouter); // Food API routes
app.use('/images', express.static('uploads')); // Serve static images
app.use('/api/user', userRouter); 
app.use('/api/cart', cartRouter); 
app.use('/api/order', orderRouter); 


// Database connection
connectDB();

// Test route
app.get("/", (req, res) => {
    res.send("API working");
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
