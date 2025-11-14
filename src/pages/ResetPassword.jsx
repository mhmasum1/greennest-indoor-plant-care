import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";
import toast, { Toaster } from "react-hot-toast";

export default function ResetPassword() {
    const [searchParams] = useSearchParams();
    const oobCode = searchParams.get("oobCode");
    const navigate = useNavigate();

    const { verifyResetCode, confirmReset } = useAuth() || {};

    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [loading, setLoading] = useState(true);
    const [validCode, setValidCode] = useState(false);

    useEffect(() => {
        const verify = async () => {
            if (!oobCode) {
                toast.error("Invalid reset link.");
                setLoading(false);
                return;
            }
            try {
                const e = await verifyResetCode(oobCode);
                setEmail(e);
                setValidCode(true);
            } catch (err) {
                console.error("verifyResetCode error:", err);
                toast.error("The reset link is invalid or has expired.");
            } finally {
                setLoading(false);
            }
        };
        verify();
    }, [oobCode, verifyResetCode]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newPassword.length < 6) {
            toast.error("Password must be at least 6 characters.");
            return;
        }
        setLoading(true);
        try {
            await confirmReset(oobCode, newPassword);
            toast.success("Password updated. Please log in with your new password.");
            setTimeout(() => navigate("/login"), 1400);
        } catch (err) {
            console.error("confirmReset error:", err);
            toast.error(err?.code || "Could not reset password. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="text-center py-10">Loading…</div>;
    if (!validCode) return <div className="max-w-md mx-auto mt-12 p-6 border rounded">Invalid or expired link.</div>;

    return (
        <div className="max-w-md mx-auto mt-12 p-6 border rounded">
            <Toaster />
            <h2 className="text-2xl font-bold mb-4 text-center">Set a new password</h2>
            <p className="mb-4 text-sm text-gray-600">Resetting for: <strong>{email}</strong></p>
            <form onSubmit={handleSubmit} className="space-y-3">
                <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="New password"
                    className="input input-bordered w-full"
                    required
                    disabled={loading}
                />
                <button type="submit" className="btn btn-success w-full" disabled={loading}>
                    {loading ? "Updating…" : "Update password"}
                </button>
            </form>
        </div>
    );
}
