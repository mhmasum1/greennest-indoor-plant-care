import { createBrowserRouter } from "react-router-dom";
import HomeLayouts from "../layouts/HomeLayouts";
import Home from "../pages/Home";
import PlantDetails from "../components/PlantDetails";
import PrivateRoute from "../routes/PrivateRoute";

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomeLayouts />,
        children: [
            { index: true, element: <Home /> },
            {
                path: "/plants/:id",
                element: (
                    <PrivateRoute>
                        <PlantDetails />
                    </PrivateRoute>
                ),
                loader: () => fetch("/plants.json").then(res => res.json()),
            },
        ],
    },
]);

export default router;
