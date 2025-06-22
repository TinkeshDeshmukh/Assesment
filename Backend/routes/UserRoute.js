import express from "express"
import User from "../models/UserModel.js";
import bcrypt  from "bcryptjs"
import jwt from "jsonwebtoken";
const UserRoute=express.Router();
// For registering User
UserRoute.post("/register", async (req, res) => {
    const { username, email, password } = req.body;
    // Check if User Present or not in DataBase
    const user = await User.findOne({ email });
    if (user) {
        return res.status(200).json({ message: "User Exist" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
        username,
        email,
        password: hashedPassword
    });
    res.status(201).json(newUser);
});
// For Log in User
UserRoute.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Incorrect Password" });
        }
            const token = jwt.sign(
                { email },
                process.env.JWT_SECRET || "default_secret",
                { expiresIn: "1h" }
            );
            user.token=token;
            await user.save()
        res.status(200).json({ message: "Login successful", user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
export default UserRoute    