import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import titokbg from "../assets/tiktokbg.png";

const Register = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:4000/routeAuth/register", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        alert(data.message);
        navigate("/login");
      } else {
        alert("Couldn't register");
      }
    } catch (error) {
      console.log("network error", error);
      alert(errData.message || "Couldn't register");
    }
  };
  useEffect(() => {
    setForm({ username: "", password: "" });
  }, []);

  return (
    <div className="h-full relative">
      <img src={titokbg} className="h-full w-full" />
      <h2 className="absolute inset-x-0 top-[120px] text-center text-2xl font-bold text-white">
        Welcome to <span className="text-pink-500">TikTok</span>
      </h2>
      <div className="grid place-items-center my-auto mx-16 absolute inset-0 h-1/2 border-2 border-gray-400 z-10">
        <h1 className="uppercase text-2xl  text-shadow-red-800">Register</h1>

        {/* input form */}
        <form
          onSubmit={handleSubmit}
          autoComplete="off"
          className="grid space-y-6 w-[80%]"
        >
          <input
            required
            autoFocus
            type="text"
            autoComplete="off"
            value={form.username}
            placeholder="Enter your name here"
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            className=" border-b-[1px] border-gray-400 focus:outline-none focus:ring-0 w-full  bg-transparent appearance-none forced-colors:hidden"
          />

          <input
            required
            type="password"
            autoComplete="new-password"
            value={form.password}
            placeholder="Enter your password here"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className=" border-b-[1px] border-gray-400 focus:outline-none focus:ring-0 w-full  bg-transparent appearance-none forced-colors:hidden"
          />
          <button className="font-semibold uppercase px-4 py-2 bg-blue-950 hover:bg-blue-900 cursor-pointer">
            Register
          </button>
        </form>
        <a href="/login">
          <button className="text-[12px]">
            Have an account?{" "}
            <span className="hover:underline cursor-pointer hover:text-purple-400">
              Login
            </span>
          </button>
        </a>
      </div>
    </div>
  );
};

export default Register;
