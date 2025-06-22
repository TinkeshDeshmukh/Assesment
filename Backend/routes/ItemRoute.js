import express from 'express';
import multer from 'multer';
import cloudinary from '../config/cloudinary.js';
import { v4 as uuidv4 } from 'uuid';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import Item from '../models/ItemModel.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import User from '../models/UserModel.js';

const router = express.Router();

// Cloudinary storage config for multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads',
    public_id: () => uuidv4(),
  },
});

const upload = multer({ storage: storage });

router.post('/upload',authMiddleware, upload.single('image'), async (req, res) => {
  try {
    const { name, type, description } = req.body;
    
    const imageUrl = req.file?.path || ''; // Cloudinary image URL

 const newItem = await Item.create({
  name,
  type,
  description,
  image: imageUrl,
  user:req.user._id

 });
    res.status(201).json({ message: 'Item created', item: newItem });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.get("/fetch", authMiddleware, async (req, res) => {
  try {
    const userID = req.user._id;
    const items = await Item.find({ user: userID });
    console.log(items);
    
    res.status(200).json({ items });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
