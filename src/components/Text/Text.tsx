import * as React from 'react'
import './Text.scss'

export type TextProps = {
    /** Дополнительный класс */
    className?: string;
    /** Стиль отображения */
    view?: 'title' | 'button' | 'p-20' | 'p-18' | 'p-16' | 'p-14';
    /** Html-тег */
    tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'p' | 'span';
    /** Начертание шрифта */
    weight?: 'normal' | 'medium' | 'bold';
    /** Контент */
    children: React.ReactNode;
    /** Цвет */
    color?: 'primary' | 'secondary' | 'accent';
    /** Максимальное кол-во строк */
    maxLines?: number;
};

const Text: React.FC<TextProps> = ({
                                       tag: Tag = "p",
                                       view,
                                       weight,
                                       className = "",
                                       children,
                                       color,
                                       maxLines,
                                   }) => {
    const classes = [
        "text",
        weight ? `text-${weight}` : view ? `text-${view}` : "",
        color && `text-${color}`,
        maxLines ? `text-maxLines-${maxLines}` : "",
        className,
    ]
        .filter(Boolean)
        .join(" ")

    return <Tag className={classes}>{children}</Tag>
}

export default Text;
