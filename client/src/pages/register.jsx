import { useState } from "react";
import { useNavigate } from "react-router-dom";

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

  return (
    <div className="mx">
      Register Here
      <form onSubmit={handleSubmit}>
        <input
          required
          type="text"
          value={form.username}
          placeholder="Enter your name here"
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
        <input
          required
          value={form.password}
          type="password"
          placeholder="Enter your password here"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button>Register</button>
      </form>
      <a href="/login">
        <button>Login Here !</button>
      </a>
    </div>
  );
};

export default Register;
