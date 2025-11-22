import express from "express";
import { createPost } from "../controllers/postController.js";
import { upload } from "../utils/multer.js";

const router = express.Router();

router.post("/create", upload.array("images", 5) , createPost);

export default router;