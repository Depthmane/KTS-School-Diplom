import * as React from 'react'
import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import Input from "components/Input";
import styles from './MultiDropdown.module.scss';
import { CrossIcon } from "icons";
import clsx from "clsx";

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

const MultiDropdown: React.FC<MultiDropdownProps> = React.memo(({
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

    const handleSearch = useCallback((option: Option) => {
        const isSelected = value.some((val) => val.key === option.key);
        let newValues = isSelected
            ? value.filter((val) => val.key !== option.key)
            : [...value, option];

        setSearchText('');
        onChange(newValues);
    }, [value, onChange]);

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

    const filteredOptions = useMemo(() => {
        return options.filter((option) =>
            option.value.toLowerCase().includes(searchText.toLowerCase())
        );
    }, [options, searchText]);

    const isSelected = useCallback((option: Option) => {
        return value.some((val) => val.key === option.key);
    }, [value]);

    const handleClearSelection = () => {
        setSearchText('');
        onChange([])
    };

    return (
        <div className={clsx('multiDropdown', className || '')} ref={dropDownRef} style={{ width: '500px' }}>
            <Input
                value={searchText || (value.length > 0 ? getTitle(value) : '')}
                onChange={setSearchText}
                onFocus={handleFocus}
                afterSlot= {
                    searchText.length > 0 || value.length > 0 ? (
                        <CrossIcon
                            color="primary"
                            onClick={() => handleClearSelection()}
                            style = {{cursor: 'pointer'}}
                        />
                        ) : null
            }
                disabled={disabled}
                placeholder={value.length === 0 ? 'Поиск по жанрам..' : undefined}
                className={isOpen ? 'input-black-text' : ''}
            />
            {!disabled && isOpen && filteredOptions.length > 0 && (
                <div className={styles.dropdownMenu}>
                    {filteredOptions.map((option) => (
                        <div
                            key={option.key}
                            className={clsx(
                                styles.dropdownItem,
                                isSelected(option) && styles.dropdownItemSelected
                            )}
                            onClick={() => handleSearch(option)}
                        >
                            {option.value}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
});

export default MultiDropdown;
