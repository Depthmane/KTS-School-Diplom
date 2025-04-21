import * as React from 'react';
import clsx from 'clsx';
import styles from './Card.module.scss';
import Text from "components/Text/Text";

export type CardProps = {
    className?: string;
    image: string;
    captionSlot?: React.ReactNode;
    actionSlot?: React.ReactNode;
    title: React.ReactNode;
    subtitle: React.ReactNode;
    onClick?: React.MouseEventHandler;
};

const Card: React.FC<CardProps> = ({
                                       className,
                                       image,
                                       captionSlot,
                                       actionSlot,
                                       title,
                                       subtitle,
                                       onClick,
                                   }) => {
    return (
        <div className={clsx(styles.card, className ?? "")} onClick={onClick}>
            <div className={styles.cardHeader}>
                <div className={styles.blurBackground} style={{backgroundImage: `url(${image})`}}/>
                <img src={image} alt="card-image" className={styles.image}/>
            </div>
            <div className={styles.cardBody}>
                <div className={styles.favoriteButton}>{actionSlot}</div>
                {captionSlot && (
                    <Text view="p-14" color="secondary">
                        {captionSlot}
                    </Text>
                )}

                <Text view="p-20" weight="medium" maxLines={2}>
                    {title}
                </Text>

                <Text view="p-16" maxLines={3} color="secondary">
                    {subtitle}
                </Text>
            </div>
        </div>
    );
};

/*Card.Skeleton = () => (
    <div className={styles.card}>
        <div className={styles.skeletonImage} />
        <div className={styles.content}>
            <div className={styles.skeletonTitle} />
            <div className={styles.skeletonSubtitle} />
            <div className={styles.skeletonCaption} />
        </div>
    </div>
);*/

export default React.memo(Card);
