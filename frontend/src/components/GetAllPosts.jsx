import React, { useEffect, useState } from "react";
import { Heart, MessageCircle, Share } from "lucide-react";
import axios from "axios";
import PostImage from "./Shared/PostImage";
import GetComments from "./GetComments";

const GetAllPosts = () => {
  const [posts, setPosts] = useState([]);

  const [showComments, setShowComments] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);

  const fetchPostData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/posts/all");
      setPosts(response.data.posts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPostData();
  }, []);

  const openComments = (postId) => {
    setSelectedPostId(postId);
    setShowComments(true);
  };

  return (
    <>
      <div className="flex flex-col gap-5">
        {posts.map((post) => (
          <div
            className="border p-4 w-[600px] mt-4 rounded-lg shadow-sm"
            key={post._id}
          >
            <div className="flex items-center gap-3">
              <img
                src="https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=3000"
                alt="profile"
                className="rounded-full w-8 h-8"
              />
              <div>
                <p className="font-semibold">{post.author?.name}</p>
                <p className="text-sm text-gray-500">@{post.author?.username}</p>
              </div>
            </div>

            <div className="mt-2 flex flex-col gap-2">
              <PostImage images={post.images} />
            </div>

            <div className="mt-2 flex items-center gap-3 text-gray-600">
              <Heart />

              {/* OPEN MODAL ON CLICK */}
              <button onClick={() => openComments(post._id)}>
                <MessageCircle className="cursor-pointer" />
              </button>

              <Share />
            </div>

            <p className="mt-2">{post.content}</p>

            <p className="text-sm text-gray-500 mt-1">
              {post.comments?.length} comments
            </p>
          </div>
        ))}
      </div>

      {/* RENDER POPUP MODAL */}
      {showComments && (
        <GetComments
          postId={selectedPostId}
          onClose={() => setShowComments(false)}
        />
      )}
    </>
  );
};

export default GetAllPosts;
