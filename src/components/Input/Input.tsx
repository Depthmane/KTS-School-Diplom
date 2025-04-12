import * as React from 'react';
import styles from './Input.module.scss';

export type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> & {
    value: string;
    onChange: (value: string) => void;
    afterSlot?: React.ReactNode;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ value,
         onChange,
         afterSlot,
         className,
         type = 'text',
         ...rest }, ref) => {


        return (
            <div className={`${styles.inputBody} ${className || ''}`.trim()}>
                <input
                    {...rest}
                    className={styles.input}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    type={type}
                    ref={ref}
                />
                {afterSlot && <div className={styles.inputIcon}>{afterSlot}</div>}
            </div>
        );
    }
);

export default Input;
