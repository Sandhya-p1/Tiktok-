import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:4000/routeAuth/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        console.log("json error message");
        throw new Error("server error:" + res.status);
      }
      const data = await res.json();
      console.log("Login successful", data);
      navigate("/myfeed");
    } catch (error) {
      console.log("network error", error);
      alert("Couldnt login, navigating to register");
      navigate("/register");
    }
  };

  return (
    <div className="mx">
      Login Here
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your name here"
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
        <input
          type="password"
          placeholder="Enter your password here"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button>Login</button>
      </form>
      <a href="/register">
        <button>Register Here !</button>
      </a>
    </div>
  );
};

export default Login;
