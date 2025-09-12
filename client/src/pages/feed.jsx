import { useEffect, useState } from "react";

import { FaSearch } from "react-icons/fa";
import Footer from "../components/footer";
import HeroSection from "../components/heroSection";

const Feed = () => {
  const [videos, setVideos] = useState([]);

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

  const handleDoubleClick = async (videoId) => {
    console.log("Double clicked videoId:", videoId); // make sure it’s not undefined

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

  return (
    <div className=" relative h-screen w-full ">
      {/* navbar section */}
      <nav className="flex justify-evenly bg-transparent items-center fixed top-0  w-full z-50   p-6">
        <h3>Following</h3>
        <h3>For You</h3>
        <FaSearch />
      </nav>

      <HeroSection
        videos={videos}
        handleDoubleClick={handleDoubleClick}
        handleVideoDelete={handleVideoDelete}
      />
      {/* footer */}
      <Footer />
    </div>
  );
};

export default Feed;
