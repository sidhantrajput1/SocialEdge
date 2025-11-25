import Post from "../models/postModels.js";
import cloudinary from "../utils/cloudinary.js";

// =============================================
// CREATE POST
// =============================================
export const createPost = async (req, res) => {
  try {
    const { caption, userId, visibility } = req.body;

    let imageUrls = [];

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const uploadPromise = new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "posts" },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          );
          stream.end(file.buffer);
        });

        const result = await uploadPromise;
        imageUrls.push(result.secure_url);
      }
    }

    const newPost = await Post.create({
      author: userId,
      caption,
      images: imageUrls,
      visibility: visibility || "public",
    });

    res.status(201).json({
      success: true,
      message: "Post created successfully",
      post: newPost,
    });
  } catch (error) {
    console.log("Post Error:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// =============================================
// GET ALL POSTS
// =============================================
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", "name avatar username")
      .populate("comments.user", "name avatar username")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server Error fetching posts",
    });
  }
};

// =============================================
// GET POST BY ID
// =============================================
export const getPostById = async (req, res) => {
  const { postId } = req.params;

  try {
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    return res.status(200).json({
      success: true,
      post,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server Error fetching post by ID",
    });
  }
};

// =============================================
// DELETE POST
// =============================================
export const deletePost = async (req, res) => {
  const { postId } = req.params;

  try {
    const post = await Post.findByIdAndDelete(postId);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server Error deleting post",
    });
  }
};

// =============================================
// LIKE / UNLIKE POST
// =============================================
export const likePost = async (req, res) => {
  const { postId } = req.params;
  const { userId } = req.body;

  //   console.log("USER ID =>", userId);

  if (!userId) {
    return res.status(400).json({
      success: false,
      message: "userId is required in request body",
    });
  }

  try {
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    // Remove null values from likes array (safety)
    post.likes = post.likes.filter((uid) => uid !== null);

    const isLiked = post.likes.includes(userId);

    if (isLiked) {
      post.likes = post.likes.filter(
        (uid) => uid.toString() !== userId.toString()
      );

      await post.save();

      return res.status(200).json({
        success: true,
        message: "Unliked the post",
        likesCount: post.likes.length,
      });
    }

    post.likes.push(userId);
    await post.save();

    res.status(200).json({
      success: true,
      message: "Liked the post",
      likesCount: post.likes.length,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server Error liking post",
    });
  }
};

// =============================================
// GET POSTS BY USER
// =============================================
export const getPostsByUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const posts = await Post.find({ author: userId })
      .populate("author", "name avatar")
      .populate("comments.user", "name avatar")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Posts fetched successfully",
      posts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server Error fetching posts by user",
    });
  }
};

// =============================================
// ADD COMMENT TO POST
// =============================================
export const addCommentToPost = async (req, res) => {
  const { postId } = req.params;
  const { userId, commentText } = req.body;

  if (!commentText || commentText.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Comment text cannot be empty",
    });
  }

  if (!userId) {
    return res.status(400).json({
      success: false,
      message: "userId is required in request body",
    });
  }

  try {
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    const newComment = {
      user: userId,
      text: commentText,
      createdAt: new Date(),
    };

    post.comments.push(newComment);

    await post.save();

    const populatedPost = await Post.findById(postId)
      .populate("author", "name avatar")
      .populate("comments.user", "name avatar");

    res.status(200).json({
      success: true,
      message: "Comment added successfully",
      post: populatedPost,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server Error adding comment to post",
    });
  }
};

// =============================================
// DELETE COMMENT FROM POST
// =============================================
export const deleteCommentFromPost = async (req, res) => {
  const { postId, commentId } = req.params;

  try {
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    const commentIndex = post.comments.findIndex(
      (c) => c._id.toString() === commentId
    );

    if (commentIndex === -1) {
      return res.status(400).json({
        success: false,
        message: "Comment not found in the post",
      });
    }

    post.comments.splice(commentIndex, 1);

    await post.save();

    const populatedPost = await Post.findById(postId)
      .populate("author", "name avatar")
      .populate("comments.user", "name avatar");

    res.status(200).json({
      success: true,
      message: "Comment deleted successfully",
      post: populatedPost,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server Error deleting comment from post",
    });
  }
};

// ============================================
// UPDATE COMMENT ON POST
// ============================================
export const updateCommentOnPost = async (req, res) => {
  const { postId, commentId } = req.params;
  const { commentText } = req.body;

  if (!commentText || commentText.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Comment text cannot be empty",
    });
  }

  try {
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    const comment = post.comments.id(commentId);
    if (!comment) {
      return res.status(400).json({
        success: false,
        message: "Comment not found in the post",
      });
    }

    comment.text = commentText;
    comment.updatedAt = new Date();
    await post.save();

    const populatedPost = await Post.findById(postId)
      .populate("author", "name avatar")
      .populate("comments.user", "name avatar");

    res.status(200).json({
      success: true,
      message: "Comment updated successfully",
      post: populatedPost,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server Error updating comment on post",
    });
  }
};

// =============================================
// GET ALL COMMENTS FOR A SPECIFIC USER
// =============================================
export const getAllComments = async (req, res) => {
    try {
      const { postId } = req.params;

      const post = await Post.findById(postId)
        .populate("comments.user", "name avatar")
        .populate("author", "name avatar")

      if (!post) {
        return res.status(404).json({
          success : false,
          message : "Post not found"
        })
      }

      return res.status(200).json({
        success : true,
        count : post.comments.length,
        comments : post.comments
      })

    } catch (error) {
      console.log(error)
      res.status(500).json({
        success : false,
        message : "Internal Server Error"
      })
    }
} 

// =============================================
// END OF FILE
// =============================================
