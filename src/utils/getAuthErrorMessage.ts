export const getAuthErrorMessage = (code: string | null): string => {
    console.log('код ошибки:', code);
    if (!code) return 'Произошла неизвестная ошибка. Попробуйте ещё раз.';

    switch (code) {
        case 'auth/email-already-in-use':
            return 'Этот email уже используется.';
        case 'auth/invalid-email':
            return 'Некорректный email.';
        case 'auth/user-not-found':
            return 'Пользователь не найден.';
        case 'auth/wrong-password':
            return 'Неверный пароль.';
        case 'auth/weak-password':
            return 'Пароль слишком слабый (минимум 6 символов).';
        case 'auth/too-many-requests':
            return 'Слишком много попыток. Попробуйте позже.';
        case 'auth/network-request-failed':
            return 'Нет подключения к интернету.';
        case 'auth/login-already-in-use':
            return 'Этот логин уже занят.';
        default:
            return 'Ошибка авторизации. Попробуйте позже.';
    }
};