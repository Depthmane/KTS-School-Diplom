import * as React from "react";
import {useEffect, useRef, useState} from "react";
import ThemeSwitch from "components/ThemeSwitch/ThemeSwitch";
import Text from 'components/Text/Text';
import styles from "./Navbar.module.scss";
import {NavLink, useLocation} from "react-router-dom";


const Navbar: React.FC = () => {
    const location = useLocation();

    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLUListElement | null>(null);
    const buttonRef = useRef<HTMLButtonElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node) &&
                buttonRef.current &&
                !buttonRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    return (
        <nav className={styles.navbar}>
            <div className={styles.container}>
                <ul className={styles.navItems}>
                    <li>
                        <NavLink
                            to="/"
                            onClick={(e) => {
                                if (location.pathname === "/") e.preventDefault();
                            }}
                        >
                            BandPedia
                        </NavLink>
                    </li>
                </ul>

                <div className={styles.rightSection}>
                    <div className={styles.dropdown}>
                        <button
                            className={styles.menuButton}
                            onClick={() => setIsOpen(!isOpen)}
                            ref={buttonRef}
                        >
                            Меню
                        </button>
                        {isOpen && (
                            <ul className={styles.dropdownMenu} ref={menuRef}>
                                <li><Text>заглушка</Text></li>
                                <li><Text>заглушка</Text></li>
                                <li><ThemeSwitch /></li>
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
