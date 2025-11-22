import express from "express";
import {
  createPost,
  deletePost,
  getAllPosts,
  getPostsByUser,
  likePost,
  getPostById,
} from "../controllers/postController.js";

import { upload } from "../utils/multer.js";

const router = express.Router();

// Create post
router.post("/create", upload.array("images", 5), createPost);

// Get posts by user
router.get("/user/:userId", getPostsByUser);

// Get all posts
router.get("/all", getAllPosts);

// Get single post
router.get("/:postId", getPostById);

// Delete post
router.delete("/:postId", deletePost);

// Like/Unlike
router.patch("/like/:postId", likePost);

export default router;
