import React, { useEffect, useState } from "react";

const GetComments = ({ postId, onClose }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/posts/getAllComents/${postId}`
        );
        const data = await res.json();
        // console.log(data.comments)
        setComments(data.comments || []);
      } catch (error) {
        console.error("Error fetching comments", error);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [postId]);

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose} 
    >
      <div
        className="bg-white w-[400px] p-4 rounded-lg shadow-lg relative"
        onClick={(e) => e.stopPropagation()} 
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-3 top-3 text-xl cursor-pointer"
        >
          ×
        </button>

        <h2 className="text-lg font-semibold mb-3">Comments</h2>

        {loading ? (
          <p>Loading...</p>
        ) : comments.length === 0 ? (
          <p>No comments available</p>
        ) : (
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {comments.map((c) => (
              <div key={c._id} className="border p-2 rounded">
                <strong>{c.user?.name || "User"}</strong>
                <p>{c.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GetComments;
