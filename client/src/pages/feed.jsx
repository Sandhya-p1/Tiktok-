import React from "react";

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
const Feed = () => {
  return (
    <div className="feed">
      {/* Top  section */}
      <nav className="feedNav">
        <h3>Following</h3>
        <div className="rightSideNav">
          <h3>For You</h3>
          <h3 className="search">
            <FaSearch />{" "}
          </h3>
        </div>
      </nav>
      <div className="feedMiddleAndFooter">
        {/* Middle Section */}
        <div className="feedMiddleSection">
          {/* left side */}
          <div className="feedMiddleLeftPart">
            <h3>Sandhya Pandey</h3>
            <p>here goes the caption that user typed</p>
          </div>

          {/* right side */}
          <div className="feedMiddleRightPart">
            <FaUserCircle />
            <FaHeart />
            <FaCommentDots />
            <FaSave />
            <div>
              <FaShare />
              <p>Share</p>
            </div>
            <FaCircle />
          </div>
        </div>
        <hr />
        {/* Footer Section */}
        <div className="feedFooter">
          <div className="footerIcons">
            <FaHome />
            <p>Home</p>
          </div>
          <div className="footerIcons">
            <FaUsers />
            <p>Friends</p>
          </div>
          <div className="footerIcons">
            <button>
              {" "}
              <FaPlus />
            </button>
          </div>
          <div className="footerIcons">
            <FaInbox />
            <p> Inbox</p>
          </div>
          <div className="footerIcons">
            <FaUser />
            <p>Profile</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feed;
