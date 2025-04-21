import * as React from "react";
import {useEffect, useRef, useState} from "react";
import ThemeSwitch from "components/ThemeSwitch/ThemeSwitch";
import Text from 'components/Text/Text';
import styles from "./Navbar.module.scss";
import {NavLink, useLocation} from "react-router-dom";
import RandomBandLink from "../RandomBandLink/RandomBandLink";
import {authStore} from "stores";
import AuthModal from "components/AuthModal/AuthModal";
import userStore from "stores/UserStore";
import {observer} from "mobx-react-lite";


const Navbar: React.FC = observer(() => {
    const location = useLocation();

    const [isOpen, setIsOpen] = useState(false);
    const [showAuthModal, setShowAuthModal] = useState(false)

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
        <>
            <nav className={styles.navbar}>
                <div className={styles.container}>
                    <ul className={styles.navItems}>
                        <li>
                            <NavLink to="/" onClick={(e) => {
                                if (location.pathname === "/") e.preventDefault();
                            }}>BandPedia</NavLink>
                        </li>

                    </ul>

                    <div className={styles.rightSection}>
                            <ThemeSwitch />
                        {!authStore.user ? (
                            <button onClick={() => setShowAuthModal(true)} className={styles.authButton}>
                                Войти или зарегистрироваться
                            </button>
                        ) : (
                            <span className={styles.username}>Салют, {userStore.ownProfile?.login}!</span>
                        )}

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
                                    {authStore.user ? (
                                        <>
                                            <li>
                                                <NavLink to={userStore.ownProfile ? `/profile/${userStore.ownProfile.login}` : "/"} onClick={() => setIsOpen(false)}>
                                                    Мой профиль
                                                </NavLink>
                                            </li>
                                            <li>
                                                <button onClick={() => {
                                                    authStore.logout();
                                                    setIsOpen(false);
                                                }} className={styles.exitButton}>
                                                    Выйти из аккаунта
                                                </button>
                                            </li>
                                        </>
                                    ) : (
                                        <>
                                        </>
                                    )}
                                    <li><RandomBandLink /></li>
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
        </>
    );
});

export default Navbar;
