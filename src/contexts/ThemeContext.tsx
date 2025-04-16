import { createContext, useContext} from "react";
import {uiStore} from "stores/UIStore";

const ThemeContext = createContext(uiStore);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    return <ThemeContext.Provider value={uiStore}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};