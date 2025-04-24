import { useState } from "react";
import clsx from "clsx";
import { Release } from "types/index";
import Text from "components/Text/Text";
import styles from "./ReleaseCard.module.scss";
import * as React from "react";
import {observer} from "mobx-react-lite";

interface ReleaseCardProps {
    release: Release;
    className?: string;
}

const ReleaseCard: React.FC<ReleaseCardProps> = observer(({ release, className }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsOpen((prevState) => !prevState);
    };

    return (
        <div
            className={clsx(styles.releaseCard, isOpen && styles.open, className ?? "")}
            onClick={toggleOpen}
        >
            <div className={styles.releaseCardHeader}>
                <Text weight="bold">
                    {release.title} ({release.year})
                </Text>
            </div>
            <img src={release.cover} alt={release.title} className={styles.releaseCardCover} />
            <div className={styles.releaseCardBody}>
                <Text className={styles.releaseCardInfo}>
                    Рейтинг: {release.rating}
                    <br />
                    Продолжительность: {release.totalLength}
                </Text>
                <Text>Треки:</Text>
                <ul>
                    {release.tracks.map((track, index) => (
                        <li key={index}>
                            <Text>
                                {index + 1}. {track.title} - {track.length}
                            </Text>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
});

export default React.memo(ReleaseCard);