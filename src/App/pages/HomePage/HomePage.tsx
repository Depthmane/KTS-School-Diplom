import {useEffect, useState} from 'react';
import {getBands} from 'utils/firebaseLoader';
import {useNavigate} from 'react-router-dom';
import Card from "components/Card/Card";
import styles from './HomePage.module.scss';

const HomePage = () => {
    const [bands, setBands] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBands = async () => {
            const data = await getBands();
            setBands(data);
        };
        fetchBands();
    }, []);

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
};

export default HomePage;
