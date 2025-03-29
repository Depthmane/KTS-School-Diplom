import ReleaseCard from 'components/ReleaseCard/ReleaseCard';
import {Release} from "types/index";
import Text from "components/Text/Text";
import styles from "./BandReleases.module.scss";

const BandReleases = ({releases}: { releases: Release[] }) => (
    <div>
        <Text className="text-bold" tag="h1">Релизы:</Text>
        {releases.length > 0 ? (
            <div className={styles.releaseGrid}>
                {releases.map((release, index) => (
                    <ReleaseCard key={index} release={release}/>
                ))}
            </div>
        ) : (
            <p>Нет релизов для этой группы.</p>
        )}
    </div>
);

export default BandReleases;
