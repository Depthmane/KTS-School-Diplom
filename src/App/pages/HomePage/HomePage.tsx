import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import bandsStore from "stores/BandsStore";
import { usePagination } from "hooks/usePagination";
import { useFilters } from "hooks/useFilters";
import Card from "components/Card";
import Text from "components/Text";
import Input from "components/Input";
import MultiDropdown from "components/MultiDropdown";
import styles from "./HomePage.module.scss";
import { filtersStore } from "stores";
import {createRef, useEffect, useRef} from "react";
import AppRoutes from "routes";

const HomePage = observer(() => {
    const navigate = useNavigate();
    const { categoriesOptions, localSearchValue, setLocalSearchValue, handleCategoryChange, updateURL } = useFilters();
    const { initialLoadDone, shouldScrollToSavedPage, isFirstLoad } = usePagination(updateURL);

    const cardRefs = useRef<React.RefObject<HTMLDivElement>[]>([]);

    if (cardRefs.current.length !== bandsStore.bands.length) {
        cardRefs.current = Array.from({ length: bandsStore.bands.length }, (_, i) => cardRefs.current[i] ?? createRef<HTMLDivElement>());
    }
    /*
        const cardRefs = useMemo(() => Array.from({ length: bandsStore.bands.length }, () => createRef<HTMLDivElement>()), [bandsStore.bands.length]);
    */

    useEffect(() => {
        const page = filtersStore.currentPage;
        const indexToScroll = (page - 1) * 10;

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
    }, [initialLoadDone, filtersStore.currentPage, bandsStore.bands.length]);

    if (bandsStore.loading && bandsStore.bands.length === 0) {
        return <Text view="title">все еще нужно добавить лоадер..</Text>;
    }

    return (
        <div className={styles.container}>
            <Input
                value={localSearchValue}
                onChange={setLocalSearchValue}
                placeholder={"Поиск по названию группы.."}
            />
            <MultiDropdown
                options={categoriesOptions}
                value={filtersStore.selectedCategoriesOptions}
                onChange={(options) => handleCategoryChange(options.map((opt) => opt.value))}
                getTitle={(selected) => selected.map((s) => s.value).join(", ")}
            />
            <div className={styles.bandList}>
                {bandsStore.bands.map((band, index) => (
                    <div ref={cardRefs.current[index]} key={band.id}>
                        <Card
                            data-index={index}
                            image={band.image}
                            title={band.name}
                            captionSlot={band.genres.join(", ")}
                            subtitle={band.descriptionShort}
                            onClick={() => navigate(AppRoutes.bands.detail(band.id))}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
});

export default HomePage;