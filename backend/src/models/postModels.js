import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  caption: { type: String, maxLen: 500 },
  images: [
    {
      type: String, // img url
    },
  ],
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

  comments: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      text: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
    },
  ],

  visibility: {
    type: String,
    enum: ["public", "private", "followers"],
    default: "public",
  },
});

const Post = mongoose.model("Post", postSchema);

export default Post;
