import React, { useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Heart, MessageCircle, Share } from "lucide-react";
import axios from "axios";
import PostImage from "./Shared/PostImage";

const GetAllPosts = () => {
  const [posts, setPosts] = useState([]);
  // Component logic will go here

  const fetchPostData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/posts/all");
      console.log(response.data.posts);

      setPosts(response.data.posts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPostData();
  }, []);

  // http://localhost:3000/api/posts/all
  return (
    <div className="flex flex-col gap-5">
      {posts.map((post) => (
        <div
          className="border p-4 w-[600px] mt-4 rounded-lg shadow-sm"
          key={post._id}
        >
          <div className="flex items-center gap-3">
            <img
              //   src={post.author?.avatar} // orginal
              src="https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D" // temporary
              alt="profile"
              className="rounded-full w-8 h-8"
            />
            <div>
              <p className="font-semibold">{post.author?.name}</p>
              <p className="text-sm text-gray-500">@{post.author?.username}</p>
            </div>
          </div>

          {/* post image */}
          <div className="mt-2 flex flex-col gap-2">
            <PostImage images={post.images} />
          </div>

          <div className="mt-2 flex items-center gap-3 text-gray-600">
            <Heart />
            <MessageCircle />
            <Share />
          </div>

          {/* Content */}
          <p className="mt-2">{post.content}</p>

          <p className="text-sm text-gray-500 mt-1">
            {post.comments?.length} comments
          </p>
        </div>
      ))}
    </div>
  );
};

export default GetAllPosts;
