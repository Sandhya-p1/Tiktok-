import { useEffect, useRef } from "react";
import { useState } from "react";
import {
  FaBars,
  FaHome,
  FaList,
  FaLock,
  FaRegBookmark,
  FaRegHeart,
  FaUserCircle,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/sidebar";
import Footer from "../components/footer";

const MyProfile = () => {
  const [videos, setVideos] = useState([]);
  const [showLoginOptions, setShowLoginOptions] = useState(false);
  const [activeVideo, setActiveVideo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch("http://localhost:4000/files", {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        setVideos(data);
        console.log("Fetched Videos:", data);
      } catch (error) {
        console.log("error fetching videos:", error);
      }
    };
    fetchVideos();
  }, []);

  return (
    <div>
      <nav className="flex justify-between items-center p-8">
        <FaHome
          size={26}
          onClick={() => navigate("/myfeed")}
          className="cursor-pointer hover:outline-red-700"
        />
        <div>
          <FaBars
            size={20}
            className="cursor-pointer"
            onClick={() => setShowLoginOptions(!showLoginOptions)}
          />
        </div>
      </nav>

      {/* user details */}
      <div className="UserProfile flex flex-col justify-center items-center p-4 gap-2 mt-1 mb-12">
        <FaUserCircle size={80} />
        <h3 className="text-white">
          {videos.length > 0 ? videos[0]?.uploadedBy.username : "Unknown"}
        </h3>
      </div>

      <div className="icons flex justify-around p-4">
        <FaList size={18} />
        <FaLock size={18} />
        <FaRegBookmark size={18} />
        <FaRegHeart size={18} />
      </div>
      <hr className="border-spacing-0.5 border-gray-400" />

      <div className="videosList grid grid-cols-3 justify-center">
        {!Array.isArray(videos) ? (
          <p>Create Videos</p>
        ) : videos.length === 0 ? (
          <p>Create Videos</p>
        ) : (
          videos.map((video) => (
            <div key={video._id}>
              <video
                key={video._id}
                onClick={() => setActiveVideo(video)}
                className=" border-[0.5px] border-gray-300 h-46 w-full cursor-pointer"
              >
                <source
                  src={`http://localhost:4000${video.filePath}`}
                  type="video/mp4"
                />
              </video>
            </div>
          ))
        )}
      </div>

      {activeVideo && (
        <div
          // key={activeVideo._id}
          className="fixed inset-0 bg-black flex items-center justify-center z-50"
        >
          <video
            src={`http://localhost:4000${activeVideo.filePath}`}
            autoPlay
            loop
            playsInline
            onClick={(e) => {
              const videoStatus = e.currentTarget;
              if (!videoStatus.paused) {
                videoStatus.pause();
              } else {
                videoStatus
                  .play()
                  .catch((error) => console.log("Failed to play", error));
              }
            }}
            className="h-full w-auto"
          />
          <button
            className="absolute top-0 left-0 p-4 text-white text-xl"
            onClick={() => setActiveVideo(null)}
          >
            ✕
          </button>
        </div>
      )}
      {/* footer */}
      {activeVideo ? "" : <Footer />}
      {showLoginOptions && (
        <div
          className="inset-0 z-40 bg-black opacity-40 fixed"
          onClick={() => setShowLoginOptions(false)}
        />
      )}

      <Sidebar isOpen={showLoginOptions} />
    </div>
  );
};

export default MyProfile;
