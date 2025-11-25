import { MessageCircle } from "lucide-react";
import { useState } from "react";
import GetComments from "./GetComments";

const PostCard = ({ post }) => {
  const [showComments, setShowComments] = useState(false);

  return (
    <>
      <div className="post-card">
        <h3>{post.title}</h3>

        <button
          onClick={() => setShowComments(true)}
          className="flex items-center gap-2 border p-2 rounded"
        >
          <MessageCircle  size={20} /> Comments
        </button>
      </div>

      {/* POPUP MODAL */}
      {showComments && (
        <GetComments
          postId={post._id}
          onClose={() => setShowComments(false)}
        />
      )}
    </>
  );
};

export default PostCard;
