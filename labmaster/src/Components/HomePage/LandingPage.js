import { Route, Routes } from "react-router-dom";
import AboutUs from "./AboutUs";
import HomeNavBar from "./HomeNavBar";
import HomePage from "./HomePage";
import LoginComponent from "./LoginComponent";
function LandingPage() {
    return (
        <div className="bg-slate-200 h-screen">
            <HomeNavBar></HomeNavBar>
            <Routes>
                <Route path="/" element={<HomePage></HomePage>}></Route>
                <Route path="/login" element={<LoginComponent></LoginComponent>}></Route>
                <Route path="/about-us" element={<AboutUs></AboutUs>}></Route>
            </Routes>
        </div>
    );
}
export default LandingPage;