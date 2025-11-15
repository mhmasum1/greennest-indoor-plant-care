// src/pages/MyProfile.jsx
import React, { useState, useEffect } from "react";
import { useAuth } from "../providers/AuthProvider";
import toast, { Toaster } from "react-hot-toast";

const MyProfile = () => {
    const { user, updateUser } = useAuth() || {};
    const [displayName, setDisplayName] = useState("");
    const [photoURL, setPhotoURL] = useState("");
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        setDisplayName(user?.displayName || "");
        setPhotoURL(user?.photoURL || "");
    }, [user]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!updateUser) {
            toast.error("Auth not ready");
            return;
        }

        setSaving(true);
        try {
            await updateUser({ displayName, photoURL }); // fbUpdateProfile ভিতরে কল হচ্ছে
            toast.success("Profile updated!");
        } catch (err) {
            console.error("Update profile error:", err);
            toast.error(err?.message || "Could not update profile");
        } finally {
            setSaving(false);
        }
    };

    if (!user) {
        return (
            <div className="max-w-md mx-auto mt-10 p-6 border rounded">
                <Toaster />
                <p className="text-center">You are not logged in.</p>
            </div>
        );
    }

    return (
        <div className="max-w-md mx-auto mt-10 p-6 border rounded">
            <Toaster />
            <h2 className="text-2xl font-bold mb-4 text-center">My Profile</h2>

            {/* User Info display */}
            <div className="flex flex-col items-center mb-4">
                <img
                    src={user.photoURL || "https://i.ibb.co/Yj8zLqP/user.png"}
                    alt="User avatar"
                    className="w-24 h-24 rounded-full mb-2 object-cover"
                />
                <h3 className="text-lg font-semibold">
                    {user.displayName || "No name set"}
                </h3>
                <p className="text-gray-600 text-sm">{user.email}</p>
            </div>

            {/* Update form */}
            <form onSubmit={handleUpdate} className="space-y-3">
                <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="Display name"
                    className="input input-bordered w-full"
                />
                <input
                    type="text"
                    value={photoURL}
                    onChange={(e) => setPhotoURL(e.target.value)}
                    placeholder="Photo URL"
                    className="input input-bordered w-full"
                />
                <button
                    type="submit"
                    className="btn btn-success w-full"
                    disabled={saving}
                >
                    {saving ? "Updating…" : "Update Profile"}
                </button>
            </form>
        </div>
    );
};

export default MyProfile;
