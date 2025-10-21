import { createBrowserRouter } from "react-router";
import HomeLayouts from "../layouts/HomeLayouts";
import Home from "../pages/Home";

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomeLayouts></HomeLayouts>,
        children: [
            {
                index: '/',
                element: <Home></Home>
            }
        ]
    }
])
export default router