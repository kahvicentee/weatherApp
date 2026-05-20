import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landingPage";

export default function Navigation() {
    return (
        <BrowserRouter basename="/weatherApp">
            <Routes>
                <Route path="/" element={<LandingPage/>} />
            </Routes>
        </BrowserRouter>
    )
}