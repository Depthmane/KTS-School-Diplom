import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useLocation, useNavigate } from "react-router-dom";
import bandStore from "stores/BandStore";
import filtersStore from "stores/FiltersStore";
import Card from "components/Card";
import Text from "components/Text";
import Input from "components/Input";
import MultiDropdown from "components/MultiDropdown";
import { Option } from "components/Multidropdown";
import styles from "./HomePage.module.scss";
import {useGenresLoader} from "hooks/useGenresLoader";

const HomePage = observer(() => {
    const navigate = useNavigate();
    const location = useLocation();
    const query = new URLSearchParams(location.search);

    const [categoriesOptions, setCategoriesOptions] = useState<Option[]>([]);

    useGenresLoader(setCategoriesOptions);


    useEffect(() => {
        const options = bandStore.genres.map((genre) => ({ key: genre, value: genre }));
        setCategoriesOptions(options);
    }, [bandStore.genres]);

    useEffect(() => {
        const page = parseInt(query.get("page") || "1", 10);
        const search = query.get("search") || "";
        const categories = query.get("categories") ? query.get("categories")!.split(",") : [];

        filtersStore.setSearchQuery(search);
        filtersStore.setSelectedCategories(categories);

        if (page === 1) {
            bandStore.setLastVisible(null);
        }


        bandStore.loadBands(page);
    }, [location.search]);

    const updateURL = (page: number, search: string, categories: string[]) => {
        const params = new URLSearchParams();
        params.set("page", String(page));
        if (search) params.set("search", search);
        if (categories.length > 0) params.set("categories", categories.join(","));
        navigate(`?${params.toString()}`);
    };

    const handleSearchChange = (value: string) => {
        filtersStore.setSearchQuery(value);
        bandStore.setLastVisible(null);
        updateURL(1, value, filtersStore.selectedCategories);
    };

    const handleCategoryChange = (categories: string[]) => {
        filtersStore.setSelectedCategories(categories);
        bandStore.setCurrentPage(1);
        bandStore.setLastVisible(null);
        updateURL(1, filtersStore.searchQuery, categories);
    };

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const isBottom =
            e.currentTarget.scrollHeight === e.currentTarget.scrollTop + e.currentTarget.clientHeight;

        if (isBottom && !bandStore.loading && bandStore.bands.length > 0) {
            const nextPage = bandStore.currentPage + 1;
            bandStore.loadMoreBands();
            updateURL(nextPage, filtersStore.searchQuery, filtersStore.selectedCategories);
        }
    };

    if (bandStore.loading && bandStore.bands.length === 0) {
        return <Text view="title">все еще нужно добавить лоадер..</Text>;
    }

    return (
        <div className={styles.container} onScroll={handleScroll}>
            <Input
                value={filtersStore.searchQuery}
                onChange={handleSearchChange}
                /*debounce={true}*/
            />
            <MultiDropdown
                options={categoriesOptions}
                value={filtersStore.selectedCategories.map((cat) => ({ key: cat, value: cat }))}
                onChange={(options) => handleCategoryChange(options.map((opt) => opt.value))}
                getTitle={(selected) => selected.map((s) => s.value).join(", ")}
            />
            <div className={styles.bandList}>
                {bandStore.bands.map((band) => (
                    <Card
                        key={band.id}
                        image={band.image}
                        title={band.name}
                        captionSlot={band.genres.join(", ")}
                        subtitle={band.description_short}
                        onClick={() => navigate(`/band/${band.id}`)}
                    />
                ))}
            </div>
        </div>
    );
});

export default HomePage;
