import * as React from 'react';
import clsx from 'clsx';
import styles from './CheckBox.module.scss';
import { CheckIcon } from 'icons';
import { observer } from 'mobx-react-lite';
import authStore from 'stores/AuthStore';

export type CheckBoxProps = Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'onChange' | 'children'
    > & {
    onChange: (checked: boolean) => void;
    children?: React.ReactNode;
};

const CheckBox: React.FC<CheckBoxProps> = observer(({ className, checked, disabled, onChange, children, ...props }) => {
    const user = authStore.user;
    const isAuthorized = !!user;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!disabled) {
            onChange(e.target.checked);
        }
    };

    return (
        <label
            className={clsx(styles.wrapper, className, { [styles.disabled]: !isAuthorized })}
        >
            <input
                type="checkbox"
                checked={checked ?? false}
                disabled={!isAuthorized}
                onChange={handleChange}
                className={styles.checkbox}
                {...props}
            />
            <span className={styles.custom}>
                <CheckIcon
                    style={{
                        strokeDasharray: 24,
                        strokeDashoffset: checked ? 0 : 24,
                        transition: 'stroke-dashoffset 0.4s ease-in-out',
                        color: !isAuthorized ? 'var(--checkbox-check-disabled)' : 'var(--checkbox-check)'
                    }}
                />
            </span>
            {children}

            {!isAuthorized && (
                <div className={styles.tooltip}>
                    Авторизируйтесь, чтобы скрывать избранное (это бесплатно =))
                </div>
            )}
        </label>
    );
});

export default CheckBox;
