import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage';
import BandDetails from './pages/BandDetails';
import NotFoundPage from './pages/NotFoundPage';
import Navbar from "components/Navbar";
import { ThemeProvider } from "contexts/ThemeContext";
import 'styles/global.scss';
import 'styles/_theme.scss';

const App: React.FC = () => {
    return (
        <ThemeProvider>
            <Router>
                <Navbar />
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
