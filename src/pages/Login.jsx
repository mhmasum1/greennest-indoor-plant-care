import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";
import toast, { Toaster } from "react-hot-toast";

const friendlyError = (err) => {
    if (!err) return "Login failed";
    const code = err.code || "";
    // common firebase auth error codes
    if (code.includes("invalid-email")) return "Invalid email address.";
    if (code.includes("user-not-found")) return "No account found with this email.";
    if (code.includes("wrong-password")) return "Incorrect password.";
    if (code.includes("too-many-requests")) return "Too many attempts. Try again later.";
    return err.message || "Login failed";
};

const Login = () => {
    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const { login, googleLogin, loading: authLoading } = useAuth() || {};
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!login) {
            toast.error("Authentication not ready — please try again shortly.");
            return;
        }

        const email = e.target.email.value.trim().toLowerCase();
        const password = e.target.password.value;
        setError("");
        setSubmitting(true);

        try {
            await login(email, password);
            toast.success("Login successful!");
            navigate(from, { replace: true });
        } catch (err) {
            console.error("Login error:", err);
            const message = friendlyError(err);
            setError(message);
            toast.error(message);
        } finally {
            setSubmitting(false);
        }
    };

    const handleGoogle = async () => {
        if (!googleLogin) {
            toast.error("Google auth not ready");
            return;
        }
        setSubmitting(true);
        try {
            await googleLogin();
            toast.success("Logged in with Google!");
            navigate(from, { replace: true });
        } catch (err) {
            console.error("Google login error:", err);
            const message = friendlyError(err);
            toast.error(message);
        } finally {
            setSubmitting(false);
        }
    };

    const isBusy = authLoading || submitting;

    return (
        <div className="max-w-md mx-auto mt-10 p-5 border rounded shadow">
            <Toaster />
            <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

            <form onSubmit={handleLogin} aria-busy={isBusy}>
                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    className="input input-bordered w-full mb-3"
                    required
                    aria-label="Email"
                    disabled={isBusy}
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    className="input input-bordered w-full mb-3"
                    required
                    aria-label="Password"
                    disabled={isBusy}
                />

                {error && <p className="text-red-500 mb-2" role="alert">{error}</p>}

                <button
                    type="submit"
                    className="btn btn-success w-full mb-3"
                    disabled={isBusy}
                    aria-disabled={isBusy}
                >
                    {isBusy ? "Signing in…" : "Login"}
                </button>
            </form>

            <button
                onClick={handleGoogle}
                className="btn btn-outline w-full"
                disabled={isBusy}
                aria-disabled={isBusy}
            >
                {isBusy ? "Please wait…" : "Continue with Google"}
            </button>

            <div className="flex justify-between items-center mt-3 text-sm">
                <Link to="/forgot-password" className="text-blue-600 hover:underline">
                    Forgot password?
                </Link>
                <p>
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-green-600 hover:underline">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
