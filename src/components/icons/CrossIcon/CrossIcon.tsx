import * as React from 'react';
import Icon, { IconProps } from '../Icon';

const CrossIcon: React.FC<IconProps> = ({ color, width = 24, height = 24, className, ...props }) => {
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
            <line x1="18" y1="6" x2="6" y2="18" strokeWidth="2" strokeLinecap="round" />
            <line x1="6" y1="6" x2="18" y2="18" strokeWidth="2" strokeLinecap="round" />
        </Icon>
    );
};

export default CrossIcon;
