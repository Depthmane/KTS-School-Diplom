import * as React from "react";
import Text from "components/Text/Text";
import ReleaseCardSkeleton from "components/ReleaseCard/ReleaseCardSkeleton";
import styles from "./BandReleases.module.scss";

const BandReleasesSkeleton = () => (
    <div>
        <Text className="text-bold" tag="h1">Релизы:</Text>
        <div className={styles.releaseGrid}>
            {[...Array(3)].map((_, index) => (
                <ReleaseCardSkeleton key={index} />
            ))}
        </div>
    </div>
);

export default BandReleasesSkeleton;
