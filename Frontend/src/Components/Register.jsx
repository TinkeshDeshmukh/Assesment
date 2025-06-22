import { LogIn, UserPlus } from "lucide-react";
import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [focus, setFocus] = useState("");
  const [btnHover, setBtnHover] = useState(false);
  const [Register, setRegister] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.post("https://assesment-ldj4.onrender.com/api/user/register", form);
      if (data?.data?.message === "User Exist") {
        alert("User already exists. Please log in.");
      } else {
        setRegister(true);
        navigate("/login");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <section
      id="Register"
      className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-indigo-500 to-cyan-400 animate-slide-down"
      style={{ minHeight: "100vh" }}
    >
      <form
        className="w-full max-w-sm rounded-3xl shadow-2xl p-6 border  animate-fade-in"
        style={{
          background: "rgba(255,255,255,0.18)",
          boxShadow: "0 8px 32px 0 rgba(31,38,135,0.18), 0 1.5px 4px rgba(0,0,0,0.04)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          border: "1px solid rgba(255,255,255,0.25)",
        }}
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col items-center mb-6">
          <div className="bg-indigo-100 rounded-full p-3 mb-2 shadow">
            <UserPlus className="text-indigo-500 w-7 h-7" />
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-1">Create Account</h2>
          <p className="text-gray-500 text-xs">Please fill in the details to register</p>
        </div>
        <div className="mb-3">
          <label className="block font-medium text-gray-700 mb-1 text-sm">Username</label>
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            required
            className={`w-full px-3 py-2 rounded-lg border text-sm bg-white/70 transition-all outline-none ${
              focus === "username" ? "border-indigo-500 shadow-indigo-100" : "border-gray-300"
            }`}
            onFocus={() => setFocus("username")}
            onBlur={() => setFocus("")}
            autoComplete="off"
            placeholder="Enter your username"
          />
        </div>
        <div className="mb-3">
          <label className="block font-medium text-gray-700 mb-1 text-sm">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className={`w-full px-3 py-2 rounded-lg border text-sm bg-white/70 transition-all outline-none ${
              focus === "email" ? "border-indigo-500 shadow-indigo-100" : "border-gray-300"
            }`}
            onFocus={() => setFocus("email")}
            onBlur={() => setFocus("")}
            autoComplete="off"
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium text-gray-700 mb-1 text-sm">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            className={`w-full px-3 py-2 rounded-lg border text-sm bg-white/70 transition-all outline-none ${
              focus === "password" ? "border-indigo-500 shadow-indigo-100" : "border-gray-300"
            }`}
            onFocus={() => setFocus("password")}
            onBlur={() => setFocus("")}
            autoComplete="off"
            placeholder="Enter your password"
          />
        </div>
        <button
          type="submit"
          className={`w-full flex items-center justify-center gap-2 py-2 font-semibold rounded-lg transition-all text-sm ${
            btnHover ? "bg-indigo-600 text-white shadow-lg scale-105" : "bg-indigo-500 text-white shadow"
          }`}
          onMouseEnter={() => setBtnHover(true)}
          onMouseLeave={() => setBtnHover(false)}
        >
          <UserPlus className="w-4 h-4" />
          Register
        </button>
        <div className="mt-4 text-center">
          <span className="text-gray-800 text-s">Already have an account?</span>
          <Link to="/login" className="inline-flex items-center ml-2 text-indigo-600 font-medium hover:underline text-s">
            Log in <LogIn className="ml-1 w-3 h-3" />
          </Link>
        </div>
      </form>
    </section>
  );
};

export default Register;
