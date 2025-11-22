import express from "express";
import { createPost, getAllPosts } from "../controllers/postController.js";
import { upload } from "../utils/multer.js";

const router = express.Router();

router.post("/create", upload.array("images", 5) , createPost);
router.get("/allposts", getAllPosts);


export default router;