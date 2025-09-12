import { useState } from "react";
import {
  FaBookmark,
  FaCommentDots,
  FaHeart,
  FaShare,
  FaTrashAlt,
} from "react-icons/fa";
import Comments from "./comments";

const HeroSection = ({ videos, handleDoubleClick, handleVideoDelete }) => {
  const [showComments, setShowComments] = useState(false);
  const [activeVideoId, setActiveVideoId] = useState(null);

  return (
    <div className="h-full pb-14  w-full scroll-smooth no-scrollbar  overflow-y-scroll snap-y snap-mandatory">
      {!Array.isArray(videos) || videos.length === 0 ? (
        <p>No any videos yet</p>
      ) : (
        videos.map((video) => (
          <div key={video._id} className="h-full w-full snap-start relative">
            <video
              onClick={(e) => {
                const videoStatus = e.currentTarget;
                if (!videoStatus.paused) {
                  videoStatus.pause();
                } else {
                  videoStatus
                    .play()
                    .catch((err) => console.log("Play failed", err));
                }
              }}
              autoPlay
              loop
              className="h-full w-full "
              onDoubleClick={() => handleDoubleClick(video._id)}
            >
              <source
                src={`http://localhost:4000${video.filePath}`}
                type="video/mp4"
              />
            </video>
            <div className="absolute bottom-2 w-full z-50 p-4 flex justify-between items-end pointer-events-none">
              {/* left part */}
              <div className="pointer-events-auto">
                <h3>{video?.uploadedBy.username}</h3>
                <p>I'm making the tiktok app.</p>
              </div>
              {/* right part */}
              <div className="flex flex-col items-center pointer-events-auto">
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
                  // onClick={() => navigate(`/comment/${video._id}`)}
                  onClick={() => {
                    setShowComments(!showComments);
                    setActiveVideoId(video._id);
                  }}
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
      {showComments && (
        <div
          className="inset-0 z-40 bg-black opacity-40 fixed"
          onClick={() => setShowComments(false)}
        ></div>
      )}
      <Comments isOpen={showComments} activeVideoId={activeVideoId} />
    </div>
  );
};

export default HeroSection;
