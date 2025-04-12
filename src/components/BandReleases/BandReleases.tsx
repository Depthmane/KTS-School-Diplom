import { observer } from "mobx-react-lite";
import ReleaseCard from 'components/ReleaseCard/ReleaseCard';
import { Release } from "types/release";
import Text from "components/Text/Text";
import styles from "./BandReleases.module.scss";
import * as React from "react";

const BandReleases = observer(({ releases }: { releases: Release[] }) => (
    <div>
        <Text className="text-bold" tag="h1">Релизы:</Text>
        {releases.length > 0 ? (
            <div className={styles.releaseGrid}>
                {releases.map((release, index) => (
                    <ReleaseCard key={index} release={release} />
                ))}
            </div>
        ) : (
            <p>Нет релизов для этой группы.</p>
        )}
    </div>
));

export default React.memo(BandReleases);
