import * as React from 'react';
import styles from './CardSkeleton.module.scss';

const CardSkeleton = () => {
    return (
        <div className={styles.card}>
            <div className={styles.cardHeader}>
                <div className={styles.blurBackground} />
                <div className={styles.image} />
            </div>
            <div className={styles.cardBody}>
                <div className={styles.title} />
                <div className={styles.subtitle} />
            </div>
        </div>
    );
};

export default CardSkeleton;
