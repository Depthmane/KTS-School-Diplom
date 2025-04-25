import * as React from 'react';
import clsx from 'clsx';
import styles from './Text.module.scss';

export type TextProps = {
    className?: string;
    view?: 'title' | 'button' | 'p-20' | 'p-18' | 'p-16' | 'p-14';
    tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'p' | 'span';
    weight?: 'normal' | 'medium' | 'bold';
    children: React.ReactNode;
    color?: 'primary' | 'secondary' | 'accent' | 'inherit';
    maxLines?: number;
};

const Text: React.FC<TextProps> = ({
                                       tag: Tag = "p",
                                       view,
                                       weight,
                                       className,
                                       children,
                                       color,
                                       maxLines,
                                   }) => {
    const classes = clsx(
        styles.text,
        weight && styles[`text-${weight}`],
        view && styles[`text-${view}`],
        color && styles[`text-${color}`],
        maxLines && styles[`text-maxLines`],
        className ?? ""
    );

    return <Tag className={classes} style={{ '--max-lines': maxLines } as React.CSSProperties}>{children}</Tag>;
}

export default Text;
