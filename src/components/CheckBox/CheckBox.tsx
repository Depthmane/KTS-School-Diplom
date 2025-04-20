import * as React from 'react';
import clsx from 'clsx';
import styles from './CheckBox.module.scss';
import CheckIcon from 'icons/CheckIcon';
import { observer } from 'mobx-react-lite';

export type CheckBoxProps = Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'onChange' | 'children'
    > & {
    onChange: (checked: boolean) => void;
    children?: React.ReactNode;
};

const CheckBox: React.FC<CheckBoxProps> = observer(({ className, checked, disabled, onChange, children, ...props }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!disabled) {
            onChange(e.target.checked);
        }
    };

    return (
        <label className={clsx(styles.wrapper, className, { [styles.disabled]: disabled })}>
            <input
                type="checkbox"
                checked={checked ?? false}
                disabled={disabled}
                onChange={handleChange}
                className={styles.checkbox}
                {...props}
            />
            <span className={styles.custom}>
                {checked && (
                    <CheckIcon
                        style={{ color: disabled ? 'var(--checkbox-check-disabled)' : 'var(--checkbox-check)' }}
                    />
                )}
            </span>
            {children}
        </label>
    );
});

export default CheckBox;
