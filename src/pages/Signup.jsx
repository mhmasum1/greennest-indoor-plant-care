import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const Signup = () => {
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSignup = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const photo = e.target.photo.value;
        const password = e.target.password.value;

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
        if (!passwordRegex.test(password)) {
            setError("Password must contain at least 1 uppercase, 1 lowercase, and be 6+ chars long");
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then((result) => {
                updateProfile(result.user, { displayName: name, photoURL: photo });
                toast.success("Signup successful!");
                navigate("/");
            })
            .catch(() => toast.error("Signup failed"));
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-5 border rounded shadow">
            <Toaster />
            <h2 className="text-2xl font-bold mb-4 text-center">Signup</h2>
            <form onSubmit={handleSignup}>
                <input name="name" type="text" placeholder="Full Name" className="input input-bordered w-full mb-3" required />
                <input name="email" type="email" placeholder="Email" className="input input-bordered w-full mb-3" required />
                <input name="photo" type="text" placeholder="Photo URL" className="input input-bordered w-full mb-3" />
                <input name="password" type="password" placeholder="Password" className="input input-bordered w-full mb-3" required />
                {error && <p className="text-red-500 mb-2">{error}</p>}
                <button className="btn btn-success w-full">Register</button>
            </form>
            <p className="mt-3 text-center">
                Already have an account? <Link to="/login" className="text-green-600">Login</Link>
            </p>
        </div>
    );
};

export default Signup;
