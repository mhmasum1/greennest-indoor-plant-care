import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";
import toast, { Toaster } from "react-hot-toast";

export default function Signup() {
    const { signup, googleLogin } = useAuth() || {};
    const navigate = useNavigate();

    const [form, setForm] = useState({ name: "", email: "", photoURL: "", password: "" });
    const [showPass, setShowPass] = useState(false);
    const [errors, setErrors] = useState({});

    const validate = (password) => {
        const err = {};
        if (password.length < 6) err.length = "Password must be at least 6 characters";
        if (!/[A-Z]/.test(password)) err.upper = "Must include an uppercase letter";
        if (!/[a-z]/.test(password)) err.lower = "Must include a lowercase letter";
        return err;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const name = form.name.trim();
        const photoURL = form.photoURL.trim();
        const email = form.email.trim().toLowerCase();
        const password = form.password;

        const v = validate(password);
        setErrors(v);
        if (Object.keys(v).length) return;

        const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRe.test(email)) {
            toast.error("Please enter a valid email address.");
            return;
        }

        if (!signup) {
            toast.error("Auth not ready");
            return;
        }

        try {
            await signup(email, password, name, photoURL);
            toast.success("Signup successful");
            navigate("/", { replace: true });
        } catch (err) {
            console.error("Signup error:", err);
            toast.error(err?.code || err?.message || "Signup failed");
        }
    };

    const handleGoogleLogin = async () => {
        if (!googleLogin) {
            toast.error("Google login not available");
            return;
        }
        try {
            await googleLogin();
            toast.success("Logged in with Google");
            navigate("/", { replace: true }); // Don't miss this: go to Home
        } catch (err) {
            console.error("Google login error:", err);
            toast.error(err?.code || err?.message || "Google login failed");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 border rounded">
            <Toaster />
            <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>

            <form onSubmit={handleSubmit} className="space-y-3">
                <input
                    name="name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Full name"
                    className="input input-bordered w-full"
                    required
                />
                <input
                    name="photoURL"
                    value={form.photoURL}
                    onChange={(e) => setForm({ ...form, photoURL: e.target.value })}
                    placeholder="Photo URL (optional)"
                    className="input input-bordered w-full"
                />
                <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="Email"
                    className="input input-bordered w-full"
                    required
                />
                <div className="relative">
                    <input
                        name="password"
                        type={showPass ? "text" : "password"}
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                        placeholder="Password"
                        className="input input-bordered w-full"
                        required
                    />
                    <button
                        type="button"
                        onClick={() => setShowPass(!showPass)}
                        className="absolute right-2 top-2 text-sm"
                    >
                        {showPass ? "Hide" : "Show"}
                    </button>
                </div>

                <div className="text-sm text-red-600 ">
                    {errors.length && <div>{errors.length}</div>}
                    {errors.upper && <div>{errors.upper}</div>}
                    {errors.lower && <div>{errors.lower}</div>}
                </div>

                <button className="btn btn-success w-full" type="submit">
                    Register
                </button>
            </form>

            {/* Google Social Login */}
            <div className="mt-4">
                <button
                    type="button"
                    onClick={handleGoogleLogin}
                    className="btn btn-outline w-full"
                >
                    Continue with Google
                </button>
            </div>

            {/* Login Link */}
            <p className="mt-4 text-center text-sm">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-600 hover:underline">
                    Login
                </Link>
            </p>
        </div>
    );
}
