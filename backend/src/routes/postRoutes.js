import express from "express";
import {
  createPost,
  deletePost,
  getAllPosts,
  getPostsByUser,
  likePost,
  getPostById,
  addCommentToPost,
  deleteCommentFromPost,
  updateCommentOnPost,
  getAllComments,
} from "../controllers/postController.js";

import { upload } from "../utils/multer.js";

const router = express.Router();

// Create post
router.post("/create", upload.array("images", 5), createPost);

// Add comment to post
router.post("/comment/:postId", addCommentToPost);

// update comment to post
router.put("/comment/:postId/:commentId", updateCommentOnPost);

// Get posts by user
router.get("/user/:userId", getPostsByUser);

// Get all posts
router.get("/all", getAllPosts);

// GET COMMENT FOR SPECIFIC POST
router.get("/getAllComents/:postId", getAllComments);

// Get single post
router.get("/:postId", getPostById);

// Delete post
router.delete("/:postId", deletePost);

// delete post
router.delete("/comment/:postId/:commentId", deleteCommentFromPost);

// Like/Unlike
router.patch("/like/:postId", likePost);

export default router;
