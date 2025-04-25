import styles from "./BandDetailsSkeleton.module.scss";
import Skeleton from "components/Skeleton/Skeleton";
import CardSkeleton from "components/Card/CardSkeleton";

const BandDetailsSkeleton = () => {
    return (
        <div className={styles.bandDetails}>
            <div className={styles.bandBio}>
                <div className={styles.bandInfo}>
                    <div className={styles.bandHeader}>
                        <Skeleton width={250} height={40} /> {/* название группы */}
                        <Skeleton width={32} height={32} borderRadius="50%" /> {/* звездочка */}
                    </div>

                    <Skeleton width={150} height={20} /> {/* страна */}
                    <Skeleton width={200} height={20} /> {/* год основания */}
                    <Skeleton width={150} height={20} /> {/* статус */}
                    <Skeleton width={180} height={20} /> {/* год распада  */}
                    <Skeleton width={300} height={20} /> {/* жанры */}
                    <Skeleton width={250} height={20} /> {/* ссылка на сайт */}
                    <Skeleton width={450} height={50} /> {/* описание короткое */}
                    <Skeleton width={450} height={200} /> {/* описание длинное */}
                </div>

                <div className={styles.bandImageAndLinks}>
                    <div className={styles.bandSwiperWrapper}>
                        <Skeleton
                            width="100%"
                            height="100%"
                            className={`${styles.bandImageBlur}`}
                        /> {/* Картинка группы - скелет */}
                        <div className={styles.bandSwiper}>
                            <Skeleton width="100%" height="100%" /> {/* Картинка скелет в swiper */}
                        </div>
                    </div>

                    <div className={styles.bandLinks} style={{ display: "flex", gap: "16px" }}>
                        <Skeleton width={40} height={40} borderRadius="50%" /> {/* иконки ссылок */}
                        <Skeleton width={40} height={40} borderRadius="50%" />
                        <Skeleton width={40} height={40} borderRadius="50%" />
                    </div>
                </div>
            </div>

            <div>
                <Skeleton width={180} height={30} style={{ marginBottom: 20 }} /> {/* участники  */}
                <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                    {Array.from({ length: 4 }).map((_, index) => (
                        <Skeleton key={index} width={400} height={24} />
                    ))}
                </div>
            </div>

            <div>
                <Skeleton width={300} height={40} style={{ margin: "30px 0 20px" }} /> {/* релизы */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "40px" }}>
                    {Array.from({ length: 3 }).map((_, index) => (
                        <Skeleton key={index} width={350} height={350} />
                    ))}
                </div>
            </div>

            <div className={styles.separator}></div>

            <div>
                <Skeleton width={300} height={30} style={{ margin: "30px 0 20px" }} /> {/* также могут понравиться */}
                <div className={styles.similarBands}>
                    {Array.from({ length: 3 }).map((_, index) => (
                        <CardSkeleton key={index} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BandDetailsSkeleton;
