import { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";

const Comments = ({ isOpen, activeVideoId }) => {
  const [comment, setComment] = useState("");
  const [commentList, setCommentList] = useState([]);

  const videoId = activeVideoId;

  const fetchComments = async () => {
    if (!videoId) return;
    try {
      const res = await fetch(
        `http://localhost:4000/commentsData/comments/${videoId}`,
        {
          credentials: "include",
        }
      );
      const data = await res.json();
      if (Array.isArray(data)) {
        setCommentList(data);
      } else {
        setCommentList([]);
      }
      console.log("Comments data:", data);
    } catch (error) {
      res.status(500).json(error.message);
      console.log("error fetching the comments data ");
    }
  };
  useEffect(() => {
    fetchComments();
  }, [videoId]);

  const handlePostComment = async () => {
    if (!comment.trim()) return;
    try {
      const res = await fetch(
        `http://localhost:4000/commentsData/comments/${videoId}`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: comment }),
        }
      );
      const data = await res.json();
      const newComment = data.saveComment;
      setCommentList([newComment, ...commentList]);
      setComment("");

      console.log({ newComment });
    } catch (error) {
      console.log("Error adding new comment");
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const res = await fetch(
        `http://localhost:4000/commentsData/delete/${commentId}`,
        {
          credentials: "include",
          method: "DELETE",
        }
      );
      if (res.status === 403) {
        alert("You cannot delete this comment");
        return;
      }

      const deletedData = await res.json();
      setCommentList(
        commentList.filter((comment) => comment._id !== commentId)
      );
      console.log({ deletedData });
    } catch (error) {
      console.log("Error deleting data");
    }
  };

  return (
    <div
      className={`fixed p-4  text-black bottom-0 h-36 rounded-t-2xl left-0 right-0 z-50 bg-white  block space-y-2 
  transition-transform ease-in-out duration-300
  ${isOpen ? "translate-y-0" : "translate-y-full"}
  `}
    >
      <nav className="flex justify-between items-center">
        <p></p>
        <p className="font-semibold text-[16px]">Comments</p>
        <p className="text-2xl">×</p>
      </nav>
      {/* hero section */}
      {commentList.length === 0 ? (
        <div className="flex items-center justify-center h-[80%]">
          <p className="">Comments will appear here</p>
        </div>
      ) : (
        <div className="h-[80%] space-y-6 my-10 overflow-y-scroll no-scrollbar">
          {commentList.map((comment) => (
            <li
              key={comment._id}
              className="flex  items-center space-x-4 relative"
            >
              {/* <img className="h-8 w-8 bg-pink-800 rounded-full" /> */}

              <div className="inline items-center space-x-2">
                <h2 className="font-semibold text-[16px] text-neutral-400">
                  {comment?.userId.username || "Unknown"}
                </h2>
                <p className="text-[14px] ">{comment.text}</p>
              </div>
              <FaTrash
                onClick={() => handleDeleteComment(comment._id)}
                className="absolute right-2 flex items-center fill-red-700 hover:fill-red-600  cursor-pointer"
                size={12}
              />
            </li>
          ))}
        </div>
      )}

      {/* Footer section */}
      <div className="absolute bottom-0 flex  items-center w-full p-4 ">
        {/* <img className="rounded-full w-10 h-10  bg-gray-200" src="" /> */}
        <input
          className="bg-gray-200 p-2 mx-4 w-[60%] rounded-2xl border-none outline-none placeholder-gray-400"
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add Comment..."
        />

        <button
          className="bg-red-600 py-2 px-4 text-white font-semibold rounded-2xl hover:bg-red-700 cursor-pointer"
          onClick={() => handlePostComment()}
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default Comments;
