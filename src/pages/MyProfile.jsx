// src/pages/MyProfile.jsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../providers/AuthProvider";
import toast, { Toaster } from "react-hot-toast";

export default function MyProfile() {
    const { user, updateProfile } = useAuth();
    const [form, setForm] = useState({ displayName: "", photoURL: "" });
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (user) setForm({ displayName: user.displayName || "", photoURL: user.photoURL || "" });
    }, [user]);

    const handle = async (e) => {
        e.preventDefault();
        try {
            setSaving(true);
            await updateProfile({ displayName: form.displayName, photoURL: form.photoURL });
            toast.success("Profile updated");
        } catch (err) {
            toast.error(err.message || "Update failed");
        } finally {
            setSaving(false);
        }
    };

    if (!user) return <p className="p-6 text-center">Please login to view your profile.</p>;

    return (
        <div className="max-w-md mx-auto p-6 border rounded mt-8">
            <Toaster />
            <h2 className="text-2xl font-semibold mb-4">My Profile</h2>
            <div className="flex items-center gap-4 mb-4">
                <img src={user.photoURL || "https://via.placeholder.com/80"} alt={user.displayName || "User"} className="w-20 h-20 rounded-full object-cover" />
                <div>
                    <p className="font-medium">{user.displayName || "No display name"}</p>
                    <p className="text-sm text-gray-600">{user.email}</p>
                </div>
            </div>

            <form onSubmit={handle} className="space-y-3">
                <input value={form.displayName} onChange={(e) => setForm({ ...form, displayName: e.target.value })} className="input input-bordered w-full" placeholder="Display name" />
                <input value={form.photoURL} onChange={(e) => setForm({ ...form, photoURL: e.target.value })} className="input input-bordered w-full" placeholder="Photo URL" />
                <button disabled={saving} className="btn btn-primary w-full">{saving ? "Saving..." : "Update Profile"}</button>
            </form>
        </div>
    );
}
