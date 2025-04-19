import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpotify, faYoutube, faYandexInternational } from '@fortawesome/free-brands-svg-icons';
import styles from './BandLinksIcons.module.scss'

type BandLinksIconsProps = {
    spotify?: string;
    youtube?: string;
    yandex?: string;
};

const BandLinksIcons: React.FC<BandLinksIconsProps> = ({ spotify, youtube, yandex}) => {
    return (
        <div className={styles.bandLinksIconsContainer}>
            {spotify && (
                <a href={spotify} target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faSpotify} size="2x"  className={styles.icon}/>
                </a>
            )}
            {youtube && (
                <a href={youtube} target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faYoutube} size="2x" className={styles.icon}/>
                </a>
            )}
            {yandex && (
                <a href={yandex} target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faYandexInternational} size="2x" className={styles.icon}/>
                </a>
            )}

        </div>
    )
}

export default BandLinksIcons;