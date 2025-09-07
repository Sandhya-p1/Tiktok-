import { useState } from "react";

const CommentPage = () => {
  const [comment, setComment] = useState();

  const handlePostComment = () => {};

  return (
    <div className="bg-white h-full text-black p-4 relative">
      <nav className="flex justify-between items-center">
        <p></p>
        <p className="font-semibold text-[16px]">Comments</p>
        <p className="text-2xl">×</p>
      </nav>
      {/* hero section */}
      {/* <div className="flex items-center justify-center h-[80%]">
        {/* <p className="">Comments will appear here</p> */}
      {/* </div> */}
      <div className="h-[80%] space-y-6 my-10 overflow-y-scroll no-scrollbar">
        <li className="flex  items-center space-x-4">
          <img src="" className="h-8 w-8 bg-pink-800 rounded-full" />

          <div className="inline items-center space-x-2">
            <h2 className="font-semibold text-[16px] text-neutral-400">Name</h2>
            <p className="text-[14px] ">Hi, This is my first comment</p>
          </div>
        </li>
      </div>
      {/* Footer section */}
      <div className="absolute bottom-0 flex  items-center w-full p-4 ">
        <img className="rounded-full w-10 h-10  bg-gray-200" src="" />
        <input
          className="bg-gray-200 p-2 mx-4 w-[60%] rounded-2xl border-none outline-none placeholder-gray-400"
          type="text"
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

export default CommentPage;
