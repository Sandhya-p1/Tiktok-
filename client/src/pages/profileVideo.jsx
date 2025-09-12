import { FaAngleLeft, FaBackspace } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import HeroSection from "../components/heroSection";

const ProfileVideo = () => {
  const navigate = useNavigate();
  return (
    <div className="relative">
      <nav className="p-4 fixed inset-0">
        <FaAngleLeft size={20} onClick={() => navigate("/myprofile")} />
      </nav>
      <div>
        <HeroSection />
      </div>
    </div>
  );
};

export default ProfileVideo;
