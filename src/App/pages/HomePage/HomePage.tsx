import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";
import bandsStore from "stores/BandsStore";
import {usePagination} from "hooks/usePagination";
import {useFilters} from "hooks/useFilters";
import Card from "components/Card";
import Input from "components/Input";
import Text from "components/Text"
import MultiDropdown from "components/MultiDropdown";
import styles from "./HomePage.module.scss";
import {favoriteBandsStore, filtersStore} from "stores/index";
import {createRef, useEffect, useRef} from "react";
import AppRoutes from "routes";
import FavoriteButton from "components/FavoriteButton";
import CheckBox from "components/CheckBox"
import CardSkeleton from "components/Card/CardSkeleton";
import ScrollToTopButton from "components/ScrollToTop";
import CrossIcon from "components/icons/CrossIcon";
import { motion, AnimatePresence } from 'framer-motion';

const HomePage = observer(() => {
    const navigate = useNavigate();
    const {
        categoriesOptions,
        localSearchValue,
        setLocalSearchValue,
        handleCategoryChange,
        updateURL,
        handleHideFavorites,
        handleClearFilters
    } = useFilters();
    const {shouldScrollToSavedPage, isFirstLoad} = usePagination(updateURL);

    const displayedBands = filtersStore.hideFavorites
        ? bandsStore.bands.filter(band => !favoriteBandsStore.bands.includes(band.id))
        : bandsStore.bands;

    const cardRefs = useRef<React.RefObject<HTMLDivElement>[]>([]);

    if (cardRefs.current.length !== bandsStore.bands.length) {
        cardRefs.current = Array.from({length: bandsStore.bands.length}, (_, i) => cardRefs.current[i] ?? createRef<HTMLDivElement>());
    }
    /*
        const cardRefs = useMemo(() => Array.from({ length: bandsStore.bands.length }, () => createRef<HTMLDivElement>()), [bandsStore.bands.length]);
    */

    useEffect(() => {
        const page = filtersStore.currentPage;
        const indexToScroll = (page - 1) * 9;

        if (
            page > 1 &&
            shouldScrollToSavedPage.current &&
            isFirstLoad.current &&
            bandsStore.bands.length >= indexToScroll + 1 &&
            cardRefs.current[indexToScroll]?.current
        ) {
            shouldScrollToSavedPage.current = false;
            cardRefs.current[indexToScroll]!.current!.scrollIntoView({
                behavior: "auto",
                block: "start",
            });
        }
    }, [filtersStore.currentPage, bandsStore.bands.length]);

    return (
        <div className={styles.container}>
            <Input
                value={localSearchValue}
                onChange={setLocalSearchValue}
                placeholder={"Поиск по названию группы.."}
                afterSlot={             // вот это костыыыыыль... извините
                    <AnimatePresence mode="wait" initial={false}>
                        {localSearchValue.length > 0 && (
                            <motion.div
                                key="cross-icon"
                                initial={{ opacity: 0, rotate: 0 }}
                                animate={{ opacity: 1, rotate: -90 }}
                                exit={{ opacity: 0, rotate: 0 }}
                                transition={{ duration: 0.4, ease: 'easeInOut' }}
                                style={{ transformOrigin: 'center', display: 'inline-flex' }}
                            >
                                <CrossIcon
                                    color="primary"
                                    onClick={() => setLocalSearchValue('')}
                                    className={styles.crossIcon}
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>
                }
            />
            <div className={styles.dropdownAndCheckboxContainer}>
                <MultiDropdown
                    options={categoriesOptions}
                    value={filtersStore.selectedCategoriesOptions}
                    onChange={(options) => handleCategoryChange(options.map((opt) => opt.value))}
                    getTitle={(selected) => selected.map((s) => s.value).join(", ")}
                />
                <CheckBox
                    checked={filtersStore.hideFavorites}
                    onChange={handleHideFavorites}
                    className={styles.checkBox}
                >
                    Скрыть избранные группы
                </CheckBox>
            </div>
            <div className={styles.bandList}>
                {bandsStore.isInitialLoading
                    ? Array.from({ length: 12 }).map((_, index) => (
                        <div key={index}>
                            <CardSkeleton />
                        </div>
                    ))
                    : displayedBands.map((band, index) => (
                        <div ref={cardRefs.current[index]} key={band.id}>
                            <Card
                                data-index={index}
                                image={band.image}
                                title={band.name}
                                captionSlot={band.genres.join(", ")}
                                subtitle={band.descriptionShort}
                                actionSlot={<FavoriteButton bandId={band.id}/>}
                                onClick={() => navigate(AppRoutes.bands.detail(band.id))}
                            />
                        </div>
                    ))}
            </div>
            {filtersStore.currentPage > 1 && (
                <ScrollToTopButton updateURL={updateURL} />
            )}
            {!bandsStore.hasMore && bandsStore.bands.length === 0 && (
                <div className={styles.nothingFound}>
                    <Text tag="h2">Ничего не нашлось. Может, очистить фильтры?</Text>
                    <button
                        onClick={handleClearFilters}
                        className= {styles.clearFiltersButton}
                    >
                        Да, очистить!
                    </button>
                </div>
            )}
        </div>
    );
});

export default HomePage;