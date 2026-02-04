import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productRoutes from './routes/productRoutes.js'
import cookieParser from 'cookie-parser'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'

dotenv.config();

connectDB();

const app = express();

app.use(express.json()) // Allows JSON data
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
  res.send("API is running...");
});
app.use(cookieParser())
const PORT = process.env.PORT || 5000;
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
