import * as React from 'react';
import Icon, { IconProps } from '../Icon';

const ArrowDownIcon: React.FC<IconProps> = ({ color, width = 24, height = 24, className, ...props }) => {


    return (
        <Icon
            className={className}
            color={color}
            width={width}
            height={height}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M2.33563 8.74741L3.66436 7.25259L12 14.662L20.3356 7.25259L21.6644 8.74741L12 17.338L2.33563 8.74741Z"
                viewBox="0 0 24 24"
                fill={color || 'currentColor'}
                strokeWidth={0}
                fillRule="evenodd"
                clipRule="evenodd"

            />
        </Icon>
    );
};

export default ArrowDownIcon