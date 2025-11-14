// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
    const [error, setError] = useState("");
    const { login, googleLogin } = useAuth() || {};
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const handleLogin = async (e) => {
        e.preventDefault();
        const email = e.target.email.value.trim().toLowerCase();
        const password = e.target.password.value;
        if (!login) { toast.error("Auth not ready"); return; }
        try {
            await login(email, password);
            toast.success("Login successful!");
            navigate(from, { replace: true });
        } catch (err) {
            console.error("Login error:", err);
            setError(err?.code || err?.message || "Login failed");
            toast.error(err?.code || "Login failed");
        }
    };

    const handleGoogle = async () => {
        if (!googleLogin) { toast.error("Google auth not ready"); return; }
        try {
            await googleLogin();
            toast.success("Logged in with Google!");
            navigate(from, { replace: true });
        } catch (err) {
            console.error("Google login error:", err);
            toast.error(err?.message || "Google login failed");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-5 border rounded shadow">
            <Toaster />
            <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
            <form onSubmit={handleLogin}>
                <input name="email" type="email" placeholder="Email" className="input input-bordered w-full mb-3" required />
                <input name="password" type="password" placeholder="Password" className="input input-bordered w-full mb-3" required />
                {error && <p className="text-red-500 mb-2">{error}</p>}
                <button className="btn btn-success w-full mb-3">Login</button>
            </form>
            <button onClick={handleGoogle} className="btn btn-outline w-full">
                Continue with Google
            </button>
            <p className="mt-3 text-center">
                Don't have an account? <Link to="/signup" className="text-green-600">Sign up</Link>
            </p>
        </div>
    );
};

export default Login;
