import * as React from 'react';
import styles from './CardSkeleton.module.scss';
import Skeleton from "../Skeleton/Skeleton";

const CardSkeleton = () => {
    return (
        <div className={styles.card}>
            <Skeleton className={styles.cardHeader}>
                <Skeleton className={styles.blurBackground} />
            </Skeleton>
            <div className={styles.cardBody}>
                <Skeleton className={styles.genres} />
                <Skeleton className={styles.favorite} />
                <Skeleton className={styles.title} />
                <Skeleton className={styles.subtitle} />
            </div>
        </div>
    );
};

export default CardSkeleton;
