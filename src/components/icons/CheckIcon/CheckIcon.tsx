import * as React from 'react';
import Icon, { IconProps } from '../Icon';

const CheckIcon: React.FC<IconProps> = ({ color, width = 24, height = 24, className, ...props }) => {
    /*
        const viewBoxWidth = 18;
        const viewBoxHeight = 14;
    */

    return (
        <Icon
            className={className}
            color={color}
            width={width}
            height={height}
            {...props}
        >
            <path
                className="checkmark"
                d="M4 11.6129L9.87755 18L20 7"
                fill="none"
                stroke={color || 'currentColor'}
                strokeWidth="2"
                viewBox="0 0 24 24"
            />
        </Icon>
    );
};


export default CheckIcon;

/*<svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 5.6129L6.87755 12L17 1" stroke="black" stroke-width="2"/>
</svg>*/