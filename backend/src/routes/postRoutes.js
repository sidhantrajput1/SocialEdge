import express from "express";
import {
  createPost,
  deletePost,
  getAllPosts,
  getPostsByUser,
  likePost
} from "../controllers/postController.js";

import { upload } from "../utils/multer.js";

const router = express.Router();

// Create post
router.post("/create", upload.array("images", 5), createPost);

// Get all posts
router.get("/all", getAllPosts);

// Get posts by specific user
router.get("/user/:userId", getPostsByUser);

// Delete post
router.delete("/:postId", deletePost);

// Like / Unlike post
router.post("/like/:postId", likePost);

export default router;
