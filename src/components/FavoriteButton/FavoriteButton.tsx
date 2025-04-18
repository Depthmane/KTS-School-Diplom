import {authStore, favoriteBandsStore}  from "stores";
import styles from './FavoriteButton.module.scss'
import {observer} from "mobx-react-lite";
import AuthModal from "../AuthModal/AuthModal";
import {useState} from "react";
import StarIcon from "icons/StarIcon";

type FavoriteButtonProps ={
    bandId: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = observer(({ bandId }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const user = authStore.user
    const isFavorite = favoriteBandsStore.isFavorite(bandId)

    const handleClick = async (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!user) {
            setIsModalOpen(true);
            return;
        }
        if (isFavorite) {
            await favoriteBandsStore.remove(user.uid, bandId)
        } else {
            await favoriteBandsStore.add(user.uid, bandId)
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
        <button onClick={handleClick} className={styles.favoriteButton}>
            <StarIcon filled={isFavorite} color="accent" className={styles.crossIcon}/>
        </button>
    {isModalOpen && <AuthModal isOpen={isModalOpen} onClose={handleCloseModal}/>}
    </>
    )
})

export default FavoriteButton