// src/routes/PrivateRoute.jsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth() || {};
    const location = useLocation();

    console.log("PrivateRoute — user:", user, "loading:", loading);

    if (loading) {
        return (
            <div className="text-center py-10">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

export default PrivateRoute;
