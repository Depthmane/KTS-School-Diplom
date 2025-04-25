import * as React from "react";
import { HashRouter as Router, Routes as ReactRoutes, Route } from "react-router-dom";
import HomePage from './pages/HomePage';
import BandDetails from './pages/BandDetails';
import UserProfilePage from "./pages/UserProfilePage";
import NotFoundPage from './pages/NotFoundPage';
import Navbar from "components/Navbar";
import { ThemeProvider } from "contexts/ThemeContext";
import AppRoutes from "../routes";
import 'styles/global.scss';
import 'styles/_theme.scss';
import {useEffect} from "react";
import {authStore} from "stores/index";
import {observer} from "mobx-react-lite";

const App: React.FC = observer(() => {
    useEffect(() => {
        authStore.checkAuth();
    }, []);

    return (
        <ThemeProvider>
            <Router>
                <Navbar />
                <ReactRoutes>
                    <Route path={AppRoutes.home} element={<HomePage />} />
                    <Route path={AppRoutes.bands.mask} element={<BandDetails />} />
                    <Route path={AppRoutes.profile.mask} element={<UserProfilePage />} />
                    <Route path={AppRoutes.notFound} element={<NotFoundPage />} />
                </ReactRoutes>
            </Router>
        </ThemeProvider>
    );
});

export default App;
