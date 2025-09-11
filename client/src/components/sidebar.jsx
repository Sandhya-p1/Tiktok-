import { useNavigate } from "react-router-dom";

function Sidebar({ isOpen }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await fetch("http://localhost:4000/routeAuth/logout", {
        credentials: "include",
        method: "POST",
      });
      if (res.ok) {
        const data = await res.json();
        console.log("Login Successfull", data);
        navigate("/login");
      } else {
        alert("Login failed");
        console.log(res.status);
      }
    } catch (error) {
      console.log("Unable to logout", error);
      alert("Problem is logout");
    }
  };

  return (
    <div
      className={`fixed p-4  text-black bottom-0 h-36 rounded-t-2xl left-0 right-0 z-50 bg-white  block space-y-2 
    transition-transform ease-in-out duration-300
    ${isOpen ? "translate-y-0" : "translate-y-full"}
    `}
    >
      <h2
        className="font-semibold text-black hover:text-green-800 cursor-pointer"
        onClick={() => navigate("/login")}
      >
        LOGIN
      </h2>
      <hr className="text-gray-300" />
      <h2
        className="font-semibold text-black hover:text-red-700 cursor-pointer"
        onClick={() => navigate("/")}
      >
        REGISTER
      </h2>
      <hr className="text-gray-300" />
      <h2
        className="font-semibold text-black hover:text-red-700 cursor-pointer"
        onClick={handleLogout}
      >
        LOGOUT
      </h2>
    </div>
  );
}

export default Sidebar;
