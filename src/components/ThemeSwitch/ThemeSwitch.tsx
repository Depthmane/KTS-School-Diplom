import * as React from 'react';
import styles from "./ThemeSwitch.module.scss";

type ThemeSwitchProps = {
    theme: string;
    setTheme: React.Dispatch<React.SetStateAction<string>>;
};

const ThemeSwitch: React.FC<ThemeSwitchProps> = ({theme, setTheme}) => {
    const switchTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
    };

    return (
        <button className={styles.themeButton} onClick={switchTheme}>
            {theme === "light" ? "Темная тема" : "Светлая тема"}
        </button>
    );
};

export default ThemeSwitch;
