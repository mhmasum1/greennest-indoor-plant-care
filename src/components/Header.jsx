import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider'; // <- single source

const Header = () => {
    const { user, logout } = useAuth() || {};
    const [plants, setPlants] = useState([]);
    const navigate = useNavigate();

    // Fetch plants data
    useEffect(() => {
        fetch('/plants.json')
            .then((res) => res.json())
            .then((data) => setPlants(data));
    }, []);

    const handleLogout = async () => {
        if (!logout) return;
        try { await logout(); } catch (e) { console.error(e); }
    };

    const displayName = user?.displayName || user?.email?.split('@')[0] || "Guest";
    const avatar = user?.photoURL || "https://via.placeholder.com/40";

    // Navigate to Cart page
    const handleGoToCart = () => {
        navigate('/cart');
    };

    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <a className="btn btn-ghost text-xl">GreenNest</a>
            </div>

            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li><NavLink to='/'>Home</NavLink></li>
                    <li>
                        <button onClick={handleGoToCart}>
                            Plants
                        </button>
                    </li>
                    <li><NavLink to='/myprofile'>My Profile</NavLink></li>
                </ul>
            </div>

            <div className="navbar-end">
                {user ? (
                    <div className="flex items-center gap-3">
                        <img src={avatar} alt={displayName} className="w-10 h-10 rounded-full object-cover" />
                        <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="btn btn-ghost">{displayName}</label>
                            <ul tabIndex={0} className="menu dropdown-content p-2 shadow bg-base-100 rounded-box w-52">
                                <li><button onClick={handleLogout} className="text-red-600">Logout</button></li>
                            </ul>
                        </div>
                    </div>
                ) : (
                    <div className="flex gap-2">
                        <NavLink to="/login" className="btn btn-ghost">Login</NavLink>
                        <NavLink to="/signup" className="btn btn-primary">Register</NavLink>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Header;
