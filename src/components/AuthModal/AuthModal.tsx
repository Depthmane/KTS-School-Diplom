import { useState, useEffect } from "react";
import { authStore } from "stores/index";
import styles from './AuthModal.module.scss';
import { observer } from "mobx-react-lite";
import AuthButton from "./AuthButton/AuthButton";
import { motion, AnimatePresence } from 'framer-motion';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AuthModal: React.FC<ModalProps> = observer(({ isOpen, onClose }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [login, setLogin] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isVisible, setIsVisible] = useState(isOpen);

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
        }
    }, [isOpen]);

    useEffect(() => {
        if (isOpen && isVisible) {
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
            document.body.style.paddingRight = `${scrollbarWidth}px`;
        } else {
            document.documentElement.style.overflow = 'auto';
            document.body.style.overflow = '';
            document.body.style.paddingRight = '0';
        }

        return () => {
            document.documentElement.style.overflow = 'auto';
            document.body.style.overflow = '';
            document.body.style.paddingRight = '0';
        };
    }, [isOpen, isVisible]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (isLogin) {
            await authStore.login(email, password);
        } else {
            await authStore.register(email, password, login);
        }

        if (!authStore.error) onClose();
    };

    return isVisible ? (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className={styles.overlay}
                    onClick={onClose}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    onAnimationComplete={() => {
                        if (!isOpen) {
                            setIsVisible(false);
                        }
                    }}
                >
                    <motion.div
                        className={styles.modalWindow}
                        onClick={e => e.stopPropagation()}
                        initial={{ opacity: 0, scale: 0.7 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.7, }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                        <h2 className={styles.modalTitle}>{isLogin ? 'Вход' : 'Регистрация'}</h2>
                        <form onSubmit={handleSubmit}>
                            {!isLogin && (
                                <input className={styles.modalInput}
                                       type="text"
                                       placeholder="Придумайте логин"
                                       value={login}
                                       onChange={e => setLogin(e.target.value)}
                                       required
                                />
                            )}
                            <input className={styles.modalInput}
                                   type='email'
                                   placeholder='Email'
                                   value={email}
                                   onChange={e => setEmail(e.target.value)}
                                   required
                            />
                            <input className={styles.modalInput}
                                   type="password"
                                   placeholder="Ваш пароль (минимум 6 символов)"
                                   value={password}
                                   onChange={e => setPassword(e.target.value)}
                                   required
                            />
                            {authStore.error && <p className={styles.error}>{authStore.error}</p>}
                            <AuthButton type="submit"
                                        disabled={authStore.loading}
                                        loading={authStore.loading}>
                                {isLogin ? 'Войти' : 'Зарегистрироваться'}
                            </AuthButton>
                        </form>
                        <p className={styles.toggleText}>
                            {isLogin ? (
                                <>
                                    Ещё нет аккаунта?{' '}
                                    <span onClick={() => setIsLogin(false)} className={styles.link}>
                                        Зарегистрироваться
                                    </span>
                                </>
                            ) : (
                                <>
                                    Уже есть аккаунт?{' '}
                                    <span onClick={() => setIsLogin(true)} className={styles.link}>
                                        Войти
                                    </span>
                                </>
                            )}
                        </p>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    ): null;
});

export default AuthModal;