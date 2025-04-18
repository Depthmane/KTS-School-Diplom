import * as React from 'react';
import Icon, { IconProps } from '../Icon';

const StarIcon: React.FC<IconProps> = ({ color, width = 24, height = 24, className, filled = false, ...props }) => {
    return (
        <Icon
            className={className}
            color={color}
            width={width}
            height={height}
            viewBoxWidth={24}
            viewBoxHeight={24}
            {...props}
        >
            {filled ? (
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            ) : (
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5" />
            )}
        </Icon>
    );
};

export default StarIcon;
