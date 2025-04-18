import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import bandsStore from "stores/BandsStore";
import styles from "components/Navbar/Navbar.module.scss";

const RandomBandLink: React.FC = observer(() => {
    const navigate = useNavigate();

    const handleClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();

        const randomId = await bandsStore.fetchRandomBandId();
        if (!randomId) return;

        navigate(`/band/${randomId}`);
    };

    return (
        <a href="#" onClick={handleClick} className={styles.navLink}>
            Случайная группа!
        </a>
    );
});

export default RandomBandLink;