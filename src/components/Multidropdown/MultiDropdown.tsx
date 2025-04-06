import * as React from 'react'
import { useEffect, useRef, useState } from 'react';
import Input from "components/Input";
/*import ArrowDownIcon from "../icons/ArrowDownIcon";*/
import styles from './MultiDropdown.module.scss';

export type Option = {
    key: string;
    value: string;
};

export type MultiDropdownProps = {
    className?: string;
    options: Option[];
    value: Option[];
    onChange: (value: Option[]) => void;
    disabled?: boolean;
    getTitle: (value: Option[]) => string;
};

const MultiDropdown: React.FC<MultiDropdownProps> = ({
                                                                  options,
                                                                  value,
                                                                  onChange,
                                                                  disabled,
                                                                  getTitle,
                                                                  className
                                                              }) => {
    const [isOpen, setOpen] = useState(false);
    const [searchText, setSearchText] = useState('');
    const dropDownRef = useRef<HTMLDivElement | null>(null);

    const handleFocus = () => {
        if (!disabled) {
            setOpen(true);
        }
    };

    const handleSearch = (option: Option) => {
        const isSelected = value.some((val) => val.key === option.key);
        let newValues = isSelected
            ? value.filter((val) => val.key !== option.key)
            : [...value, option];

        setSearchText('');
        onChange(newValues);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropDownRef.current && !dropDownRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const filteredOptions = options.filter((option) =>
        option.value.toLowerCase().includes(searchText.toLowerCase())
    );

    const handleClearSelection = () => {
        onChange([]);
    };

    return (
        <div className={`multi-dropdown ${className || ""}`.trim()} ref={dropDownRef}>
            <Input
                value={searchText || (value.length > 0 ? getTitle(value) : '')}
                onChange={setSearchText}
                onFocus={handleFocus}
                /*afterSlot={<ArrowDownIcon color="secondary" />}*/
                disabled={disabled}
                placeholder={value.length === 0 ? getTitle(value) : undefined}
                className={!isOpen ? '' : 'input-black-text'}
            />
            <button onClick={handleClearSelection} disabled={disabled} className={styles.clearButton}> Clear</button>
            {!disabled && isOpen && filteredOptions.length > 0 && (
                <div className={styles.dropdownMenu}>
                    {filteredOptions.map((option) => (
                        <div
                            key={option.key}
                            className={`${styles.dropdownItem} ${value.some((val) => val.key === option.key) ? `${styles.dropdownItemSelected}` : ""}`}
                            onClick={() => handleSearch(option)}
                        >
                            {option.value}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MultiDropdown;
