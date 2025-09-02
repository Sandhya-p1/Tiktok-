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

const MyProfile = () => {
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch("http://localhost:4000/files", {
          method: "GET",
          credentials: "include",
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
        <FaBars size={26} />
      </nav>
      <div className="UserProfile flex flex-col justify-center items-center p-4 gap-2 mt-6 mb-20">
        <FaUserCircle size={80} />
        <h3>Sandhya</h3>
      </div>
      <div className="icons flex justify-around p-4">
        <FaList size={18} />
        <FaLock size={18} />
        <FaRegBookmark size={18} />
        <FaRegHeart size={18} />
      </div>
      <hr className="border-spacing-0.5 border-white" />
      <div className="videosList grid grid-cols-4 justify-center">
        {videos &&
          videos.map((video) => (
            <div key={video._id}>
              <video controls className="border h-44 w-full">
                <source
                  src={`http://localhost:4000${video.filePath}`}
                  type="video/webm"
                />
              </video>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MyProfile;
