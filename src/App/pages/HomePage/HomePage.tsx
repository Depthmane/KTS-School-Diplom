import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import bandStore from "stores/BandStore";
import { useLocation, useNavigate } from "react-router-dom";
import Card from "components/Card";
import styles from "./HomePage.module.scss";
import Text from "components/Text";
import Input from "components/Input";
import MultiDropdown from "components/Multidropdown";

const HomePage = observer(() => {
    const navigate = useNavigate();
    const location = useLocation();
    const query = new URLSearchParams(location.search);

    useEffect(() => {
        const page = parseInt(query.get("page") || "1", 10);
        const search = query.get("search") || "";
        const categories = query.get("categories") ? query.get("categories")!.split(",") : [];

        if (page === 1) {
            bandStore.setLastVisible(null);
        }

        bandStore.loadBands(page, search, categories);
    }, [location.search]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchValue = e.target.value;
        console.log("Search Value:", searchValue);
        bandStore.setSearchQuery(searchValue);
        bandStore.setCurrentPage(1);
        bandStore.setLastVisible(null);

        navigate(`?page=1&search=${searchValue}&categories=${bandStore.selectedCategories.join(",")}`);
    };
    /*
        const handleCategoryChange = (categories: string[]) => {
            bandStore.setSelectedCategories(categories);
            bandStore.setCurrentPage(1);
            bandStore.setLastVisible(null);

            navigate(`?page=1&search=${bandStore.searchQuery}&categories=${categories.join(",")}`);
        };*/

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const isBottom = e.currentTarget.scrollHeight === e.currentTarget.scrollTop + e.currentTarget.clientHeight;
        if (isBottom && !bandStore.loading && bandStore.bands.length > 0) {
            const nextPage = bandStore.currentPage + 1;
            bandStore.loadMoreBands();
            navigate(`?page=${nextPage}&search=${bandStore.searchQuery}&categories=${bandStore.selectedCategories.join(",")}`);
        }
    };

    if (bandStore.loading && bandStore.bands.length === 0) {
        return <Text view="title">Загрузка...</Text>;
    }

    return (
        <div className={styles.container} onScroll={handleScroll} >
            <Input value={bandStore.searchQuery} onChange={handleSearchChange} />
            {/*            <MultiDropdown selected={bandStore.selectedCategories} onChange={handleCategoryChange} />*/}
            <div className={styles.bandList} >
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
