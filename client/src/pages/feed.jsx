import { useEffect, useState } from "react";

import {
  FaBookmark,
  FaCommentDots,
  FaHeart,
  FaHome,
  FaInbox,
  FaPlus,
  FaSearch,
  FaShare,
  FaTrash,
  FaTrashAlt,
  FaUser,
  FaUsers,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
// import CommentPage from "./commentPage";

const Feed = () => {
  const navigate = useNavigate();
  const [videos, setVideos] = useState([]);
  // const [likedVideos, setLikedVideos] = useState([]);

  const fetchedVideos = async () => {
    try {
      const res = await fetch("http://localhost:4000/files/feed", {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      setVideos(data);
      console.log("Fetched data in feed:", data);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchedVideos();
  }, []);

  const handleDoubleClick = async (videoId) => {
    try {
      const res = await fetch(
        `http://localhost:4000/likeUnlikeVideos/likeUnlike/${videoId}`,
        {
          method: "PUT",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await res.json();
      setVideos((prev) =>
        prev.map((video) =>
          video._id === videoId ? { ...video, likedBy: data.likedBy } : video
        )
      );

      console.log({ data });
    } catch (error) {
      console.log("Error fetching liked data");
    }
  };

  const handleVideoDelete = async (videoId) => {
    try {
      const res = await fetch(`http://localhost:4000/deleteVideo/${videoId}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (res.status === 403) {
        alert("You are not authorized to delete this video!!");
        return;
      }
      const deletingData = await res.json();
      setVideos(videos.filter((video) => video._id !== videoId));
      console.log({ deletingData });
    } catch (error) {
      console.log("error deleting video data", error);
      // res.json({ error: error.message });
    }
  };

  return (
    <div className=" relative h-screen w-full ">
      {/* navbar section */}
      <nav className="flex justify-evenly bg-transparent items-center sticky top-0  w-full z-50   p-6">
        <h3>Following</h3>
        <h3>For You</h3>
        <FaSearch />
      </nav>

      <div className="h-screen  w-full scroll-smooth no-scrollbar  overflow-y-scroll snap-y snap-mandatory">
        {!Array.isArray(videos) || videos.length === 0 ? (
          <p>No any videos yet</p>
        ) : (
          videos.map((video) => (
            <div key={video._id} className="h-full w-full snap-start relative">
              <video
                autoPlay
                className="h-full w-full "
                onDoubleClick={() => handleDoubleClick(video._id)}
              >
                <source
                  src={`http://localhost:4000${video.filePath}`}
                  type="video/webm"
                />
              </video>
              <div className="absolute bottom-2 w-full z-50 p-4 flex justify-between items-end">
                {/* middle part  */}
                {/* left part */}
                <div>
                  <h3>{video?.uploadedBy.username}</h3>
                  <p>I'm making the tiktok app.</p>
                </div>
                {/* right part */}
                <div className="flex flex-col items-center">
                  <div className="mb-4 inline place-items-center">
                    <FaHeart
                      size={20}
                      className={`${
                        video.likedBy.length > 0 ? "fill-red-600" : "fill-white"
                      }`}
                    />
                    <p>{video.likedBy.length}</p>
                  </div>

                  <FaCommentDots
                    size={20}
                    className="mb-4 cursor-pointer"
                    onClick={() => navigate(`/comment/${video._id}`)}
                  />
                  <FaBookmark size={20} className="mb-4 cursor-pointer" />
                  <FaShare size={20} className="mb-4 cursor-pointer" />
                  <FaTrashAlt
                    onClick={() => handleVideoDelete(video._id)}
                    size={18}
                    className="cursor-pointer hover:fill-red-800"
                  />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      {/* footer */}
      <div className="sticky bottom-0 w-full bg-black z-50">
        <hr />
        <div className="flex justify-around items-center mt-3">
          <div className="grid place-items-center gap-y-1">
            <FaHome size={20} />
            <p className="text-[14px]">Home</p>
          </div>
          <div className="grid place-items-center gap-y-1">
            <FaUsers size={20} />
            <p className="text-[14px]">Friends</p>
          </div>

          <div
            className="grid place-items-center gap-y-1"
            onClick={() => navigate("/recordingvideo")}
          >
            <FaPlus size={20} />
          </div>
          <div className="grid place-items-center gap-y-1">
            <FaInbox size={20} />
            <p className="text-[14px]">Inbox</p>
          </div>
          <div
            className="grid place-items-center gap-y-1 cursor-pointer"
            onClick={() => navigate("/myProfile")}
          >
            <FaUser size={20} />

            <p className="text-[14px] ">Profile</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feed;
