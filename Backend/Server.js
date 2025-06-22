import express from "express";
import env from "dotenv"
import mongoose from "mongoose";
import UserRoute from "./routes/UserRoute.js";
import cors from "cors";
import router from "./routes/ItemRoute.js";
const app =express();
env.config()

app.use(express.json());
// Handling cross origin error 

const corsOptions = {
  origin: 'https://assesment-1-83o7.onrender.com',
  credentials: true, // optional, for cookies/auth
};

app.use(cors(corsOptions));

mongoose.connect(process.env.MongoURL )
    .then(() => {
        console.log(`Database connected`);
    })
    .catch((err) => {
        console.error('Database connection error:', err);
    });
const port = process.env.port||5000
app.get("/",(req, res) => {
    res.send("hello");
});
app.use("/api/user",UserRoute)
app.use("/api/data",router)
app.listen(port, () => {
    console.log(`App is running on ${port}`);
});

