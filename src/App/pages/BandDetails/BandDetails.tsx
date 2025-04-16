import { observer} from "mobx-react-lite";
import { BandDetailsStore } from "stores/BandDetailsStore";
import {NavLink, useParams} from 'react-router-dom';
import BandMembers from 'components/BandMembers/BandMembers';
import BandReleases from 'components/BandReleases/BandReleases';
import Text from "components/Text/Text";
import styles from "./BandDetails.module.scss";
import {useEffect} from "react";
import {useLocalStore} from "hooks/useLocalStore";
import * as React from "react";
import NotFoundPage from "pages/NotFoundPage";

const BandDetails = observer(() => {
    const {id} = useParams<{ id: string }>();
    const store = useLocalStore(() => new BandDetailsStore());

    useEffect(() => {
        store.loadBandById(id);
    }, [id]);

    const {band, releases, loading} = store;

    if (loading) return <Text view="title">сюда надо добавить лоадер</Text>;

    if (!band) return <NotFoundPage/>

    return (
        <div className={styles.bandDetails}>
            <div className={styles.bandBio}>
            <div className={styles.bandInfo}>
                <Text view="title">{band.name}</Text>
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
                    <strong>Жанры:</strong> {band.genres.join(' · ')}
                </Text>
                <Text><strong>Сайт: </strong>
                    <a href={`https://${band.website}`} target="_blank" rel="noopener noreferrer">{band.website}</a>
                </Text>
                <Text>{band.descriptionShort}</Text>
                <Text>{band.descriptionLong}</Text>
            </div>
            <img className={styles.bandImage} src={band.image} alt={band.name}/>
            </div>
            <BandMembers members={band.members}/>
            <BandReleases releases={releases}/>
        </div>
    );
});

export default BandDetails;
