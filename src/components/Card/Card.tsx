import * as React from 'react';
import styles from './Card.module.scss';
import Text from "components/Text/Text";

export type CardProps = {
    className?: string;
    image: string;
    captionSlot?: React.ReactNode;
    title: React.ReactNode;
    subtitle: React.ReactNode;
    contentSlot?: React.ReactNode;
    onClick?: React.MouseEventHandler;
    actionSlot?: React.ReactNode;
    textView?: 'title' | 'button' | 'p-20' | 'p-18' | 'p-16' | 'p-14';
    textMaxLines?: number;
    textWeight?: 'normal' | 'medium' | 'bold';
};

const Card: React.FC<CardProps> = ({
                                       className,
                                       image,
                                       captionSlot,
                                       title,
                                       subtitle,
                                       contentSlot,
                                       actionSlot,
                                       onClick,
                                   }) => {
    return (
        <div className={`${styles.card} ${className || ''}`} onClick={onClick}>
            <div className={styles.cardHeader}>
                <div className={styles.blurBackground} style={{backgroundImage: `url(${image})`}}></div>

                <img src={image} alt="card-image" className={styles.image}/>
            </div>
            <div className={styles.cardBody}>
                {captionSlot && <Text className={styles.textCaption} view="p-14" color="secondary">
                    {captionSlot}
                </Text>}

                <Text className={styles.textTitle} view="p-20" maxLines={2}>
                    {title}
                </Text>

                <Text className={styles.textSubtitle} view="p-16" maxLines={3} color="secondary">
                    {subtitle}
                </Text>
            </div>
            {/* <div className={styles.cardFooter}>
                {contentSlot && <Text className={styles.textPricing} view="p-18" weight="bold">
                    {contentSlot}
                </Text>}
                {actionSlot && <div className={styles.actionSlot}>{actionSlot}</div>}
            </div>*/}
        </div>
    );
};

export default Card;
