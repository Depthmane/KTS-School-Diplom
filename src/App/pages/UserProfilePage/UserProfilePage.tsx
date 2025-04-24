import * as React from "react";
import { useEffect } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import { observer } from "mobx-react-lite";
import clsx from "clsx";

import styles from "./UserProfilePage.module.scss";
import FavoriteButton from "components/FavoriteButton";
import { favoriteBandsStore, authStore, userStore } from "stores/index";
import Card  from "components/Card";
import UserProfilePageSkeleton from "./UserProfilePageSkeleton";

const UserProfilePage: React.FC = observer(() => {
    const { login } = useParams();
    const navigate = useNavigate();

    const isOwnProfile = authStore.user?.uid && userStore.ownProfile?.login === login;

    useEffect(() => {
        if (!login) return;

        (async () => {
            if (isOwnProfile) {
                await favoriteBandsStore.fetchForUser(authStore.user.uid, true);
            } else {
                const user = await userStore.fetchUserProfileByLogin(login);
                if (user) {
                    await favoriteBandsStore.fetchForUser(user.id, false);
                }
            }
        })();

        return () => {
            favoriteBandsStore.viewedUserBands = [];
            userStore.clearViewedProfile();
        };
    }, [login]);

    if (userStore.loading) return <UserProfilePageSkeleton />;
    if (userStore.error) return <div>Error: {userStore.error}</div>;

    const profile = (authStore.user?.uid && userStore.ownProfile?.login === login)
        ? userStore.ownProfile
        : userStore.viewedProfile;

    const bands = (authStore.user?.uid && userStore.ownProfile?.login === login)
        ? favoriteBandsStore.bandsData
        : favoriteBandsStore.viewedUserBands;

    const uniqueGenres = Array.from(
        new Set(
            bands.flatMap(band => band.genres || [])
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
                    {bands?.length > 0 ? (
                        bands.map(band => (
                            <Card
                                key={band.id}
                                image={band.image}
                                title={band.name}
                                captionSlot={band.genres.join(", ")}
                                subtitle={band.descriptionShort}
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
