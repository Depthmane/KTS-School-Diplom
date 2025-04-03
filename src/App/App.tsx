import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage';
import BandDetails from './pages/BandDetails';
import NotFoundPage from './pages/NotFoundPage';
import Navbar from "components/Navbar";
import { ThemeProvider} from "contexts/ThemeContext";
import 'styles/global.scss';
import 'styles/_theme.scss';
import {useEffect} from "react";
import {uiStore} from "stores/UIStore";

const App: React.FC = () => {
    useEffect(() => {

        const currentTheme = uiStore.theme;
        document.documentElement.setAttribute("data-theme", currentTheme);
    }, []);


    return (
        <ThemeProvider>
        <Router>
            <Navbar/>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/band/:id" element={<BandDetails />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </Router>
        </ThemeProvider>
    );
};

export default App;