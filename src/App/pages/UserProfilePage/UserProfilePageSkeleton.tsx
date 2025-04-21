import * as React from "react";
import styles from "./UserProfilePageSkeleton.module.scss";

const UserProfilePageSkeleton: React.FC = () => {
    return (
        <div className={styles.profilePage}>
            <div className={styles.profileHeader}>
                <div className={styles.skeletonTextLarge} />
            </div>

            <div className={styles.favoriteGenres}>
                <div className={styles.skeletonTextMedium} />
                <div className={styles.genres}>
                    {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className={styles.skeletonGenre} />
                    ))}
                </div>
            </div>

            <div className={styles.favoriteBands}>
                <div className={styles.skeletonTextMedium} />
                <div className={styles.bandList}>
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className={styles.skeletonCard} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UserProfilePageSkeleton;
