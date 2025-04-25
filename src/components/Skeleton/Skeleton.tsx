import * as React from 'react';
import styles from './Skeleton.module.scss';

interface SkeletonProps {
    width?: string | number;
    height?: string | number;
    borderRadius?: string | number;
    style?: React.CSSProperties;
    className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({ width, height, borderRadius = 4, style, className }) => {
    return (
        <div
            className={`${styles.skeleton} ${className ?? ''}`}
            style={{
                width,
                height,
                borderRadius,
                ...style,
            }}
        />
    );
};

export default Skeleton;