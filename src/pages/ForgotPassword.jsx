import React, { useState } from "react";
import { useAuth } from "../providers/AuthProvider";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
    const { resetPassword } = useAuth();
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const handle = async (e) => {
        e.preventDefault();
        try {
            await resetPassword(email);
            toast.success("Password reset email sent. Check your inbox.");
            navigate("/login");
        } catch (err) {
            toast.error(err.message || "Failed to send reset email");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 border rounded">
            <Toaster />
            <h2 className="text-xl font-bold mb-4 text-center">Forgot Password</h2>
            <form onSubmit={handle}>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email" className="input input-bordered w-full mb-3" required />
                <button className="btn w-full">Send Reset Email</button>
            </form>
        </div>
    );
}
