import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";

import Home from "../pages/Home";
import Products from "../pages/Products";


const router = createBrowserRouter(createRoutesFromElements(
    <>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />

        {/* Protected Routes */}
    </>
));

export default router;