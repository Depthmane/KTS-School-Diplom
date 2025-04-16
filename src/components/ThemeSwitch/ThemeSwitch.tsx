import * as React from 'react';
import styles from "./ThemeSwitch.module.scss";
import { useTheme } from "contexts/ThemeContext";
import { observer } from "mobx-react-lite";

const ThemeSwitch: React.FC = observer(() => {
    const uiStore = useTheme();

    return (
        <button className={styles.themeButton} onClick={() => uiStore.toggleTheme()}>
            {uiStore.nextTheme === "dark" ? "Темная тема" : "Светлая тема"}
        </button>
    );
});

export default ThemeSwitch;
