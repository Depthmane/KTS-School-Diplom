import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage';
import BandDetails from './pages/BandDetails';
import NotFoundPage from './pages/NotFoundPage';
import Navbar from "components/Navbar";
import 'styles/global.scss';
import 'styles/_theme.scss';

const getInitialTheme = () => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) return storedTheme;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

const App: React.FC = () => {
    const [theme, setTheme] = React.useState(getInitialTheme);

    React.useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    return (
        <Router>
            <Navbar theme={theme} setTheme={setTheme} />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/band/:id" element={<BandDetails />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </Router>
    );
};

export default App;