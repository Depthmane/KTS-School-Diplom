import * as React from 'react';

export type IconProps = React.SVGAttributes<SVGElement> & {
    className?: string;
    color?: 'primary' | 'secondary' | 'accent';
    width?: number;
    height?: number;
    viewBoxWidth?: number;
    viewBoxHeight?: number;
    filled?: boolean;
};

const colorMap = {
    primary: 'var(--text-primary)',
    secondary: 'var(--text-secondary)',
    accent: 'var(--text-accent)',
};

const Icon: React.FC<React.PropsWithChildren<IconProps>> = ({
                                                                children,
                                                                className,
                                                                color,
                                                                width = 24,
                                                                height = 24,
                                                                viewBoxWidth = 24,
                                                                viewBoxHeight = 24,
                                                                ...props
                                                            }) => {
    const aspectRatio = viewBoxWidth / viewBoxHeight;
    const calculatedHeight = height || width / aspectRatio;


    const appliedColor = color ? colorMap[color] : 'currentColor';

    return (
        <svg
            className={className}
            width={width}
            height={calculatedHeight}
            viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
            xmlns="http://www.w3.org/2000/svg"
            stroke={appliedColor}
            fill={appliedColor}
            {...props}
        >
            {children}
        </svg>
    );
};

export default Icon;