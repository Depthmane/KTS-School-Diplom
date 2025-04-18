import * as React from "react";
import { useEffect } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import { observer } from "mobx-react-lite";
import clsx from "clsx";

import userStore from "stores/UserStore";
import authStore from "stores/AuthStore";
import styles from "./UserProfilePage.module.scss";
import FavoriteButton from "components/FavoriteButton";
import {favoriteBandsStore} from "stores";
import {Card} from "components";

const UserProfilePage: React.FC = observer(() => {
    const { login } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (login) {
            userStore.fetchUserProfileByLogin(login);
        }
    }, [login]);

    if (userStore.loading) return <div>Идет загрузка</div>;
    if (userStore.error) return <div>Error: {userStore.error}</div>;

    const profile = userStore.profile;

    const uniqueGenres = Array.from(
        new Set(
            favoriteBandsStore.bandsData.flatMap(band => band.genres || [])
        )
    );

    if (!profile) return <div>Нет данных для данного профиля</div>;



    return (
        <div className={clsx(styles.profilePage)}>
            <div className={styles.profileHeader}>
                <h1>Профиль пользователя {profile.login}</h1>
            </div>

            <div className={styles.favoriteGenres}>
                <h2>Избранные жанры:</h2>
                {uniqueGenres.length > 0 ? (
                    <div className={styles.genres}>
                        {uniqueGenres.map((genre, index) => (
                            <span key={genre} className={styles.genre}>
                    <NavLink to={{ pathname: "/", search: `?categories=${genre}` }} className={styles.genreLink}>
                        {genre} {index < uniqueGenres.length - 1 && " · "}
                    </NavLink>
                </span>
                        ))}
                    </div>
                ) : (
                    <p>Нет жанров</p>
                )}
            </div>

            <div className={styles.favoriteBands}>
                <h2>Любимые группы: </h2>
                <div className={styles.bandList}>
                    {favoriteBandsStore.bandsData.length > 0 ? (
                        favoriteBandsStore.bandsData.map(band => (
                            <Card
                                key={band.id}
                                image={band.image}
                                title={band.name}
                                captionSlot={band.genres.join(", ")}
                                subtitle={band.description_short}
                                actionSlot={<FavoriteButton bandId={band.id} />}
                                onClick={() => navigate(`/band/${band.id}`)}
                            />
                        ))
                    ) : (
                        <p>Нет избранных групп</p>
                    )}
                </div>
            </div>
        </div>
    );
});

export default UserProfilePage;
