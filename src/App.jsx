import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import { useState } from "react";
import lightmode from "./assets/images/lightmode.png";
import darkmode from "./assets/images/darkmode.png";

function App() {
    const [isLightMode, setIsLightMode] = useState(true);

    const handleToggle = () => {
        setIsLightMode(!isLightMode);
    };

    return (
        <div id="app" className={isLightMode ? "" : "darkTheme"}>
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={<Home isLightMode={isLightMode} />}
                    />
                </Routes>
            </BrowserRouter>
            <img
                id="lightmodeToggle"
                src={isLightMode ? lightmode : darkmode}
                alt="light/darkmode toggle"
                onClick={handleToggle}
            />
        </div>
    );
}

export default App;
