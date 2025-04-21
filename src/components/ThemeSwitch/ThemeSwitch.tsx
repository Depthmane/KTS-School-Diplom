import * as React from 'react';
import { useTheme } from "contexts/ThemeContext";
import { observer } from "mobx-react-lite";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import styles from "./ThemeSwitch.module.scss";

const ThemeSwitch: React.FC = observer(() => {
    const uiStore = useTheme();

    return (
        <button className={styles.themeButton} onClick={() => uiStore.toggleTheme()} aria-label="Переключить тему">
            <AnimatePresence mode="wait" initial={false}>
                <motion.span
                    key={uiStore.theme}
                    initial={{ opacity: 0, scale: 0.7, rotate: -90 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0.7, rotate: 90 }}
                    transition={{ ease: "easeInOut", duration: 0.4 }}
                    className={styles.iconWrapper}
                >
                    {uiStore.theme === "light" ? (
                        <FontAwesomeIcon icon={faSun} className={styles.icon} />
                    ) : (
                        <FontAwesomeIcon icon={faMoon} className={styles.icon} />
                    )}
                </motion.span>
            </AnimatePresence>
        </button>
    );
});

export default ThemeSwitch;
