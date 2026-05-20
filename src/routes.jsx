import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landingPage";

export default function Navigation() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/weatherApp" element={<LandingPage/>} />
            </Routes>
        </BrowserRouter>
    )
}