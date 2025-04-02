import { observer} from "mobx-react-lite";
import bandDetailsStore from "stores/BandDetailsStore";
import {NavLink, useParams} from 'react-router-dom';
import BandMembers from 'components/BandMembers/BandMembers';
import BandReleases from 'components/BandReleases/BandReleases';
import Text from "components/Text/Text";
import styles from "./BandDetails.module.scss";
import {useEffect} from "react";

const BandDetails = observer(() => {
    const {id} = useParams<{ id: string }>();

    useEffect(() => {
        if (id) {
            bandDetailsStore.loadBandById(id);
        }
    },[]);

    const {band, releases, loading} = bandDetailsStore;

    if (loading) return <Text view="title">сюда надо добавить лоадер</Text>;

    if (!band) return <Text view="title">группа не найдена - <NavLink to={`/`}>тык</NavLink></Text>;

    return (
        <div className={styles.bandDetails}>
            <div className={styles.bandBio}>
            <div className={styles.bandInfo}>
                <Text view="title">{band.name}</Text>
                <Text>
                    <strong>Страна:</strong> {band.country}
                </Text>
                <Text>
                    <strong>Год основания:</strong> {band.creation_year}
                </Text>
                <Text>
                    <strong>Статус:</strong> {band.is_active ? 'Активна' : 'Неактивна'}
                </Text>
                {!band.is_active && <Text>
                    <strong>Год распада:</strong> {band.end_year}
                </Text>}
                {/*сделать опциональный рендер если группа пересобралась с гиперссылкой <a> типо Joy Division\New Order*/}
                <Text>
                    <strong>Жанры:</strong> {band.genres.join(' · ')}
                </Text>
                <Text><strong>Сайт: </strong>
                    <a href={`https://${band.website}`} target="_blank" rel="noopener noreferrer">{band.website}</a>
                </Text>
                <Text>{band.description_short}</Text>
                <Text>{band.description_long}</Text>
            </div>
            <img className={styles.bandImage} src={band.image} alt={band.name}/>
            </div>
            <BandMembers members={band.members}/>
            <BandReleases releases={releases}/>
        </div>
    );
});

export default BandDetails;
