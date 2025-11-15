import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';

const Header = ({ setNavLoading }) => {
    const { user, logout } = useAuth() || {};
    const location = useLocation();

    const handleLogout = async () => {
        if (!logout)
            return;
        try {
            await logout();

        }
        catch (error) {
            console.error("Logout error:", error);
        }
    };

    const displayName =
        user?.displayName ||
        user?.email?.split("@")[0] ||
        "Guest";

    const avatar = user?.photoURL || "https://via.placeholder.com/40";
    const startNavLoading = (targetPath) => {
        if (!setNavLoading) return;
        if (targetPath !== location.pathname) {
            setNavLoading(true);
        }
    };

    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <NavLink
                    to="/"
                    className="btn btn-ghost text-xl"
                    onClick={() => startNavLoading("/")}
                >
                    GreenNest
                </NavLink>
            </div>

            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">

                    <li>
                        <NavLink
                            to="/"
                            onClick={() => startNavLoading("/")}
                            className={({ isActive }) =>
                                isActive
                                    ? "bg-green-600 text-white px-4 py-2 rounded-md"
                                    : "px-4 py-2 hover:bg-green-100 rounded-md"
                            }
                        >
                            Home
                        </NavLink>
                    </li>


                    <li>
                        <NavLink
                            to="/plants"
                            onClick={() => startNavLoading("/plants")}
                            className={({ isActive }) =>
                                isActive
                                    ? "bg-green-600 text-white px-4 py-2 rounded-md"
                                    : "px-4 py-2 hover:bg-green-100 rounded-md"
                            }
                        >
                            Plants
                        </NavLink>
                    </li>


                    <li>
                        <NavLink
                            to="/myprofile"
                            onClick={() => startNavLoading("/myprofile")}
                            className={({ isActive }) =>
                                isActive
                                    ? "bg-green-600 text-white px-4 py-2 rounded-md"
                                    : "px-4 py-2 hover:bg-green-100 rounded-md"
                            }
                        >
                            My Profile
                        </NavLink>
                    </li>
                </ul>
            </div>

            <div className="navbar-end">
                {user ? (
                    <div className="flex items-center gap-3">
                        <img
                            src={avatar}
                            alt={displayName}
                            className="w-10 h-10 rounded-full object-cover"
                        />
                        <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="btn btn-ghost">
                                {displayName}
                            </label>
                            <ul
                                tabIndex={0}
                                className="menu dropdown-content p-2 shadow bg-base-100 rounded-box w-52"
                            >
                                <li>
                                    <button
                                        onClick={handleLogout}
                                        className="text-red-600"
                                    >
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                ) : (
                    <div className="flex gap-2">
                        <NavLink
                            to="/login"
                            onClick={() => startNavLoading("/login")}
                            className={({ isActive }) =>
                                isActive
                                    ? "bg-green-600 text-white px-4 py-2 rounded-md"
                                    : "btn btn-ghost"
                            }
                        >
                            Login
                        </NavLink>

                        <NavLink
                            to="/signup"
                            onClick={() => startNavLoading("/signup")}
                            className={({ isActive }) =>
                                isActive
                                    ? "bg-green-600 text-white px-4 py-2 rounded-md"
                                    : "btn btn-primary"
                            }
                        >
                            Register
                        </NavLink>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Header;
