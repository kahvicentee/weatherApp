import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landingPage";

export default function Navigation() {
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<LandingPage/>} />
        </Routes>
    </BrowserRouter>
}