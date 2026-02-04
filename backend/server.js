import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productRoutes from './routes/productRoutes.js'
import cookieParser from 'cookie-parser'
import userRoutes from './routes/userRoutes.js'

dotenv.config();

connectDB();

const app = express();

app.get("/", (req, res) => {
  res.send("API is running...");
});
app.use(cookieParser())
const PORT = process.env.PORT || 5000;
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
