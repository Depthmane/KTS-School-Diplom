import { observer} from "mobx-react-lite";
import { BandDetailsStore } from "stores/BandDetailsStore";
import {NavLink, useNavigate, useParams} from 'react-router-dom';
import BandMembers from 'components/BandMembers/BandMembers';
import BandReleases from 'components/BandReleases/BandReleases';
import Text from "components/Text/Text";
import styles from "./BandDetails.module.scss";
import {useEffect} from "react";
import {useLocalStore} from "hooks/useLocalStore";
import * as React from "react";
import NotFoundPage from "pages/NotFoundPage";
import BandDetailsSkeleton from "./BandDetailsSkeleton";
import FavoriteButton from "components/FavoriteButton";
import {Card} from "components";
import AppRoutes from "routes";
import BandLinksIcons from "components/icons/BandLinksIcons";

const BandDetails = observer(() => {
    const {id} = useParams<{ id: string }>();
    const store = useLocalStore(() => new BandDetailsStore());
    const navigate = useNavigate();

    useEffect(() => {
        store.loadBandById(id);
    }, [id]);

    useEffect (() => {
        window.scroll(0,0);
    },[id])

    const {band, releases, loading} = store;

    if (loading) return <BandDetailsSkeleton />;

    if (!band) return <NotFoundPage/>

    return (
        <div className={styles.bandDetails}>
            <div className={styles.bandBio}>
            <div className={styles.bandInfo}>
                        <div className={styles.bandHeader}>
                    <Text
                        view="title" >{band.name}
                    </Text>
                            <FavoriteButton bandId={band.id} className={styles.detailsFavoriteButton}/>
                        </div>
                <Text>
                    <strong>Страна:</strong> {band.country}
                </Text>
                <Text>
                    <strong>Год основания:</strong> {band.creationYear}
                </Text>
                <Text>
                    <strong>Статус:</strong> {band.isActive ? 'Активна' : 'Неактивна'}
                </Text>
                {!band.isActive && <Text>
                    <strong>Год распада:</strong> {band.endYear}
                </Text>}
                {/*сделать опциональный рендер если группа пересобралась с гиперссылкой <a> типо Joy Division\New Order*/}
                <Text>
                    <strong>Жанры: </strong>
                    {band.genres.map((genre, index) => (
                        <NavLink
                            key={genre}
                            to={{ pathname: "/", search: `?categories=${genre}` }}
                            className={styles.genreLink}
                        >
                            {genre} {index < band.genres.length - 1 && ' · '}
                        </NavLink>
                    ))}
                </Text>
                <Text><strong>Сайт: </strong>
                    <a href={`https://${band.website}`} target="_blank" rel="noopener noreferrer">{band.website}</a>
                </Text>
                <Text>{band.descriptionShort}</Text>
                <Text>{band.descriptionLong}</Text>
            </div>
                <div className={styles.bandImageAndLinks}>
                    <img className={styles.bandImage} src={band.image} alt={band.name}/>
                    <div className={styles.bandLinks}>
                        <BandLinksIcons
                            spotify={band.resourcesLinks?.spotify}
                            youtube={band.resourcesLinks?.youtube}
                            yandex={band.resourcesLinks?.yandex}
                        />
                    </div>
                </div>
            </div>
            <BandMembers members={band.members}/>
            <BandReleases releases={releases}/>
            <div className={styles.separator}></div>

            {store.similarBands.length > 0 && (
                <div>
                    <Text tag="h3">Также могут понравиться:</Text>
                    <div className={styles.similarBands}>
                        {store.similarBands.map(band => (
                            <Card
                                key={band.id}
                                image={band.image}
                                title={band.name}
                                captionSlot={band.genres.join(", ")}
                                subtitle={band.descriptionShort}
                                actionSlot={<FavoriteButton bandId={band.id}/>}
                                onClick={() => navigate(AppRoutes.bands.detail(band.id))}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
});

export default BandDetails;
