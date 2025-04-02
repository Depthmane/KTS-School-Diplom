import {useEffect} from 'react';
import { observer } from "mobx-react-lite";
import bandStore from 'stores/BandStore'
import {useNavigate} from 'react-router-dom';
import Card from "components/Card";
import styles from './HomePage.module.scss'; // починить импорты
import Text from "components/Text";

const HomePage = observer(() => {
    const {bands, loading} = bandStore;
    const navigate = useNavigate();

    useEffect(() => {
        bandStore.loadBands();
    }, []);

    if (loading) {
        return <Text view="title">сделать скелеты карточек</Text>;
    }

    return (
        <div className={styles.bandList}>
            {bands.map((band) => (
                <Card
                    key={band.id}
                    image={band.image}
                    title={band.name}
                    captionSlot={band.genres.join(', ')}
                    subtitle={band.description_short}
                    onClick={() => navigate(`/band/${band.id}`)}
                />
            ))}
        </div>
    );
});

export default HomePage;
