import React, { useContext, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import { AuthContext } from "../providers/AuthContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
    const [error, setError] = useState("");
    const { googleLogin } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const handleLogin = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                toast.success("Login successful!");
                navigate(from, { replace: true });
            })
            .catch(() => toast.error("Invalid email or password"));
    };

    const handleGoogle = () => {
        googleLogin()
            .then(() => {
                toast.success("Logged in with Google!");
                navigate(from, { replace: true });
            })
            .catch(() => toast.error("Google login failed"));
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
