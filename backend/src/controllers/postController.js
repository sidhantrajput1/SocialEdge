import Post from "../models/postModels.js";
import cloudinary from "../utils/cloudinary.js";

export const createPost = async (req, res) => {
  try {
    const { caption, userId, visibility } = req.body;

    let imageUrls = [];

    // Upload multiple images
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

    console.log("Cloudinary loaded:", cloudinary.uploader ? "YES" : "NO");

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
