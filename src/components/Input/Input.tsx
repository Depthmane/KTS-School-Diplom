import * as React from 'react';
import styles from './Input.module.scss';
import {useDebounce} from "hooks/useDebounce";

export type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> & {
    value: string;
    onChange: (value: string) => void;
    afterSlot?: React.ReactNode;
    debounce: boolean;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ value,
         onChange,
         afterSlot,
         debounce = false,
         className,
         type = 'text',
         ...rest }, ref) => {

        const debouncedValue = debounce ? useDebounce(value, 500) : value;

        React.useEffect(() => {
            if (debouncedValue !== value) {
                onChange(debouncedValue);
            }
        }, [debouncedValue, value, onChange])
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
{/*                {afterSlot && <div className={styles.inputIcon}>{afterSlot}</div>}*/}
            </div>
        );
    }
);

export default Input;
