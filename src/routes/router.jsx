import { createBrowserRouter } from "react-router-dom";
import HomeLayouts from "../layouts/HomeLayouts";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import PlantDetails from "../components/PlantDetails";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomeLayouts />,
        children: [
            { index: true, element: <Home /> },

            {
                path: "plants/:id",
                element: (
                    <PrivateRoute>
                        <PlantDetails />
                    </PrivateRoute>
                ),
            },
            { path: "login", element: <Login /> },
            { path: "signup", element: <Signup /> },
        ],
    },
]);

export default router;
