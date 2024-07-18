import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";

import Home from "../pages/Home";
import DonwloadPDF from "../pages/Products";


const router = createBrowserRouter(createRoutesFromElements(
    <>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/pdf" element={<DonwloadPDF />} />

        {/* Protected Routes */}
    </>
));

export default router;