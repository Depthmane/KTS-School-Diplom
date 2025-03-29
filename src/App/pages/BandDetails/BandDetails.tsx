import {useParams} from 'react-router-dom';
import {useBandDetails} from 'hooks/useBandDetails';
import BandMembers from 'components/BandMembers/BandMembers';
import BandReleases from 'components/BandReleases/BandReleases';
import Text from "components/Text/Text";
import styles from "./BandDetails.module.scss";
import {Band} from "types/band";

const BandDetails = () => {
    const {id} = useParams<{ id: string }>();
    const {band, releases, loading} = useBandDetails(id);

    if (loading) return <Text view="title">сюда надо добавить лоадер</Text>;
    if (!band) return <Text view="title">группа не найдена - <a href={`/`}>тык</a></Text>;

    return (
        <div className={styles.bandDetails}>
            <div className={styles.bandInfo}>
                <Text className="text-title">{band.name}</Text>
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
            <BandMembers members={band.members}/>
            <BandReleases releases={releases}/>
        </div>
    );
};

export default BandDetails;
