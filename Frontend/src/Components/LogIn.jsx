import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [form, setForm] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess(false);
        try {
            const res=await axios.post("https://assesment-ldj4.onrender.com/api/user/login", {
                email: form.email,
                password: form.password
            });
            const token=res.data.user.token
            localStorage.setItem("token",token)
            
            // localStorage.setItem("token", res?.data?.token);
            
            setSuccess(true);

            navigate("/dashboard");
        } catch (err) {
            setError(
                err.response?.data?.message || "Login failed. Please try again."
            );
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-400 to-purple-500 relative overflow-hidden">
            
            <div className="absolute w-[400px] h-[400px] bg-purple-400/20 rounded-full top-[-100px] left-[-100px] animate-pulse z-0"></div>
            <div className="absolute w-[300px] h-[300px] bg-indigo-400/15 rounded-full bottom-[-80px] right-[-80px] animate-pulse z-0"></div>

            <form
                onSubmit={handleSubmit}
                className="relative z-10 bg-white/95 px-8 py-10 rounded-3xl shadow-2xl flex flex-col min-w-[320px] animate-fade-in"
            >
                <h2 className="mb-2 text-3xl font-bold text-center text-purple-800 animate-slide-down">
                    Welcome Back!
                </h2>
                <p className="mb-6 text-center text-purple-400 animate-fade-in delay-100">
                    Login to your account
                </p>
                <input
                    className="mb-4 px-4 py-3 rounded-xl border border-gray-200 text-base outline-none focus:border-indigo-400 transition-all duration-200 animate-fade-in delay-200"
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                />
                <input
                    className="mb-4 px-4 py-3 rounded-xl border border-gray-200 text-base outline-none focus:border-indigo-400 transition-all duration-200 animate-fade-in delay-300"
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    required
                />
                <button
                    className={`mb-2 px-4 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-400 to-purple-500 transition-all duration-200 hover:from-indigo-500 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-indigo-300 disabled:opacity-60 animate-fade-in delay-400 ${
                        loading ? "cursor-not-allowed" : "cursor-pointer"
                    }`}
                    type="submit"
                    disabled={loading}
                >
                    {loading ? (
                        <span className="flex items-center justify-center gap-2">
                            <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                            </svg>
                            Logging in...
                        </span>
                    ) : (
                        "Login"
                    )}
                </button>
                {error && (
                    <div className="bg-red-50 text-red-600 rounded-lg px-3 py-2 mt-2 text-center text-sm animate-shake">
                        {error}
                    </div>
                )}
                {success && (
                    <div className="bg-green-50 text-green-600 rounded-lg px-3 py-2 mt-2 text-center text-sm animate-bounce-in">
                        Login successful!
                    </div>
                )}
            </form>

        </div>
    );
};

export default Login;
