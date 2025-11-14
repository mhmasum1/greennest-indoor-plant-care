import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";
import toast, { Toaster } from "react-hot-toast";

export default function ForgotPassword() {
    const { resetPassword } = useAuth() || {};
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const em = email.trim().toLowerCase();
        const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRe.test(em)) {
            toast.error("Please enter a valid email address.");
            return;
        }

        setLoading(true);
        try {

            const actionCodeSettings = {
                url: window.location.origin + "/reset-password",
                handleCodeInApp: true
            };

            await resetPassword(em, actionCodeSettings);


            toast.success("If an account exists for that email, a password reset link has been sent. Please check your inbox.");
            setTimeout(() => navigate("/login"), 2000);
        } catch (err) {
            console.error("ForgotPassword error:", err);

            toast.error(err?.code || "Failed to send reset email. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-12 p-6 border rounded">
            <Toaster />
            <h2 className="text-2xl font-bold mb-4 text-center">Reset your password</h2>
            <form onSubmit={handleSubmit} className="space-y-3">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email"
                    className="input input-bordered w-full"
                    required
                    disabled={loading}
                />
                <button type="submit" className="btn btn-primary w-full" disabled={loading}>
                    {loading ? "Sending..." : "Send reset link"}
                </button>
            </form>
        </div>
    );
}
