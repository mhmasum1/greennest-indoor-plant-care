import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const HomeLayouts = () => {
    const [navLoading, setNavLoading] = useState(false);
    const location = useLocation();

    useEffect(() => {
        setNavLoading(false);
    }, [location.pathname]);

    return (
        <>
            <Header setNavLoading={setNavLoading} />

            {/* Global top spinner */}
            {navLoading && (
                <div className="fixed top-16 inset-x-0 flex justify-center z-50">
                    <span className="loading loading-spinner loading-md bg-white rounded-full p-2 shadow" />
                </div>
            )}

            <Outlet />
            <Footer />
        </>
    );
};

export default HomeLayouts;
