import jwt, { decode } from "jsonwebtoken";
import User from "../models/UserModel.js";

export const authMiddleware = async (req, res, next) => {
    
  const token = req.headers.authorization?.split(" ")[0];
  if (!token) return res.status(401).json({ message: "No token provided" });
  

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
   const user = await User.findOne({ email: decoded.email });

    if (!user || user.token !== token) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }

    req.user = user; 
    next();
  } catch (error) {
    res.status(401).json({ message: "Token verification failed" });
  }
};
export default authMiddleware
