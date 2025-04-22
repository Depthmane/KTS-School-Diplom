import { useState } from "react";
import { authStore } from "stores/index";
import styles from './AuthModal.module.scss';
import {observer} from "mobx-react-lite";
import AuthButton from "./AuthButton/AuthButton";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AuthModal: React.FC<ModalProps> = observer(({ isOpen, onClose }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [login, setLogin] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (isLogin) {
            await authStore.login(email, password);
        } else {
            await authStore.register(email, password, login);
        }

        if (!authStore.error) onClose();
    }

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modalWindow} onClick={e => e.stopPropagation()}>
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
            </div>
        </div>
    )
})

export default AuthModal;
