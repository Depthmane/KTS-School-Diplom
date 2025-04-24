import * as React from "react";
import {useEffect, useRef, useState} from "react";
import ThemeSwitch from "components/ThemeSwitch/ThemeSwitch";
import styles from "./Navbar.module.scss";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import RandomBandLink from "../RandomBandLink/RandomBandLink";
import {authStore, uiStore, userStore} from "stores/index";
import AuthModal from "components/AuthModal/AuthModal";
import {observer} from "mobx-react-lite";
import { motion, AnimatePresence } from 'framer-motion';


const Navbar: React.FC = observer(() => {
    const location = useLocation();
    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);
    const [showAuthModal, setShowAuthModal] = useState(false)

    const menuRef = useRef<HTMLUListElement | null>(null);
    const buttonRef = useRef<HTMLButtonElement | null>(null);

    const currentTheme = uiStore.theme;

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; }
    }, [isOpen]);

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
        <>
            <nav className={styles.navbar}>
                <div className={styles.container}>
                    <ul className={styles.navItems}>
                        <li>
                            <NavLink to="/" onClick={(e) => {
                                if (location.pathname === "/") e.preventDefault();
                            }}>
                                <div className={styles.logoWrapper}>
                                    <img
                                        src="logo-light.svg"
                                        alt="BandPedia Logo"
                                        className={`${styles.logo} ${currentTheme === "dark" ? styles.visible : styles.hidden}`}
                                    />
                                    <img
                                        src="logo-dark.svg"
                                        alt="BandPedia Logo"
                                        className={`${styles.logo} ${currentTheme === "light" ? styles.visible : styles.hidden}`}
                                    />
                                </div>
                            </NavLink>
                        </li>

                    </ul>

                    <div className={styles.rightSection}>
                        <ThemeSwitch />
                        {!authStore.user ? (
                            <button onClick={() => setShowAuthModal(true)} className={styles.authButton}>
                                Войти или зарегистрироваться
                            </button>
                        ) : (
                            <span className={styles.username}>Салют, <strong>{userStore.ownProfile?.login}!</strong></span>
                        )}

                        <div className={styles.dropdown}>
                            <button
                                className={styles.menuButton}
                                onClick={() => setIsOpen(!isOpen)}
                                ref={buttonRef}
                            >
                                Меню
                            </button>
                            <AnimatePresence>
                            {isOpen && (
                                <motion.div className={styles.dropdownMenu}
                                            ref={menuRef}
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            style={{ overflow: 'hidden' }}
                                            transition={{ duration: 0.4 }}
                                >
                                    {authStore.user ? (
                                        <>
                                            <li>
                                                <NavLink to={userStore.ownProfile ? `/profile/${userStore.ownProfile.login}` : "/"} onClick={() => setIsOpen(false)}>
                                                    Мой профиль
                                                </NavLink>
                                            </li>
                                            <li>
                                                <button onClick={async() => {
                                                    await authStore.logout();
                                                    setIsOpen(false);
                                                    navigate('/')
                                                }} className={styles.exitButton}>
                                                    Выйти из аккаунта
                                                </button>
                                            </li>
                                        </>
                                    ) : (
                                        <>
                                        </>
                                    )}
                                    <li onClick={() => setIsOpen(false)}><RandomBandLink /></li>
                                </motion.div>
                            )}
                                </AnimatePresence>
                        </div>
                    </div>
                </div>
            </nav>

            <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
        </>
    );
});

export default Navbar;
