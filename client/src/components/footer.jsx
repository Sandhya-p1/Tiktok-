import { FaHome, FaInbox, FaPlus, FaUser, FaUsers } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <div className="fixed bottom-0  w-full bg-black z-50">
      <hr />
      <div className="flex justify-around items-center pb-2 mt-3">
        <div
          className="grid place-items-center gap-y-1 cursor-pointer"
          onClick={() => navigate("/myfeed")}
        >
          <FaHome size={20} />
          <p className="text-[10px]">Home</p>
        </div>
        <div className="grid place-items-center gap-y-1">
          <FaUsers size={20} />
          <p className="text-[10px]">Friends</p>
        </div>

        <div
          className="px-3 py-1 border-[1px]  rounded-sm bg-gradient-to-r from-red-300 via-white to-violet-300 text-black cursor-pointer"
          onClick={() => navigate("/recordingvideo")}
        >
          <FaPlus size={16} />
        </div>
        <div className="grid place-items-center gap-y-1">
          <FaInbox size={20} />
          <p className="text-[10px]">Inbox</p>
        </div>
        <div
          className="grid place-items-center gap-y-1 cursor-pointer"
          onClick={() => navigate("/myProfile")}
        >
          <FaUser size={20} />

          <p className="text-[10px] ">Profile</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
