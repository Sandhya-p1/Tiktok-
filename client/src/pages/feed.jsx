import React, { useEffect, useState } from "react";

import {
  FaCircle,
  FaCommentDots,
  FaHeart,
  FaHome,
  FaInbox,
  FaPlus,
  FaSave,
  FaSearch,
  FaShare,
  FaUser,
  FaUserCircle,
  FaUsers,
} from "react-icons/fa";
import InfiniteScroll from "react-infinite-scroll-component";
import postsData from "../components/images";
import { Link, useNavigate } from "react-router-dom";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  // const limit = 3;
  const navigate = useNavigate();

  //fetching posts -images
  // const fetchPosts = async () => {
  //   // const res = await fetch("");
  //   // const data = await res.json();
  //   const data = postsData.slice(posts.length, posts.length + 40);

  //   if (data.length === 0) {
  //     setHasMore(false);
  //     return;
  //   }
  //   setPosts((prev) => [...prev, ...data]);
  //   setPage((prev) => prev + 1);
  // };

  // useEffect(() => {
  //   fetchPosts();
  // }, []);

  return (
    <div className="feed relative flex flex-col h-[100vh] p-0 m-0 ">
      <div className="scrollableImage absolute top-0 bottom-0 left-0 right-0 z-0 overflow-y-auto overflow-x-hidden  ">
        {/* <img src={img} className="image w-full h-[100%]" /> */}
        {/* <InfiniteScroll
          dataLength={posts.length}
          next={fetchPosts}
          hasMore={hasMore}
          loader={<h4>Loading.....</h4>}
          endMessage={<p>You've reached to the last</p>}
        >
          {posts &&
            posts.map((post) => (
              <div key={post.id} className="p-8 border-2 m-3">
                <img src={post.image} className="w-full h-[100%]" />
              </div>
            ))}
        </InfiniteScroll> */}
      </div>

      {/* Top  section */}
      <nav className="feedNav p-[1rem] shrink-0 flex items-center justify-between z-50">
        <h3>Following</h3>
        <div className="rightSideNav flex items-center">
          <h3>For You</h3>
          <h3 className="search ml-[2rem]">
            <FaSearch />{" "}
          </h3>
        </div>
      </nav>

      <div className="feedMiddleAndFooter flex flex-col justify-start flex-1 m-0 p-0">
        <div className="feedMiddleSection p-[1rem] flex justify-between items-baseline flex-1 overflow-hidden relative right-0 left-0 bottom-[5rem]">
          <div className="feedMiddleLeftPart  absolute bottom-0 flex flex-col justify-end ">
            <h3>Sandhya Pandey</h3>
            <p>here goes the caption that user typed</p>
          </div>

          {/* right side */}
          <div className="feedMiddleRightPart  absolute bottom-0 right-2 grid gap-y-[18px] place-items-center">
            <FaUserCircle size={45} />
            <FaHeart size={28} />
            <FaCommentDots size={28} />
            <FaSave size={28} />
            <div>
              <FaShare size={28} />
              <p>Share</p>
            </div>
            <FaCircle size={35} />
          </div>
        </div>

        {/* Footer Section */}
        <div className="feedFooter flex justify-around items-center shrink-0 bg-black p-[10px] absolute bottom-0 right-0 left-0 ">
          <div className="footerIcons">
            <FaHome />
            <p>Home</p>
          </div>
          <div className="footerIcons">
            <FaUsers />
            <p>Friends</p>
          </div>
          <div className="footerIcons">
            <Link to="/recordingvideo">
              <button className="cursor-pointer">
                {" "}
                <FaPlus />
              </button>
            </Link>
          </div>
          <div className="footerIcons">
            <FaInbox />
            <p> Inbox</p>
          </div>
          <div className="footerIcons">
            <FaUser
              onClick={() => navigate("/myProfile")}
              className="cursor-pointer"
            />
            <p>Profile</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feed;
