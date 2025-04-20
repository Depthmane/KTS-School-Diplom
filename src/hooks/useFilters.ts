import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import filtersStore from "stores/FiltersStore";
import { parseQueryParams } from "utils/queryParams";
import { useDebounce } from "./useDebounce";
import { bandsStore } from "stores";
import {favoriteBandsStore} from "../stores";

export function useFilters() {
    const [localSearchValue, setLocalSearchValue] = useState(filtersStore.searchQuery);
    const debouncedSearchValue = useDebounce(localSearchValue, 500);
    const [isInitialSearchApplied, setIsInitialSearchApplied] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();

    const updateURL = useCallback(() => {
        const params = filtersStore.toSearchParams();
        setSearchParams(params);
    }, [setSearchParams]);

    const categoriesOptions = bandsStore.categoriesOptions;

    useEffect(() => {
        const { page, search } = filtersStore.syncFromSearchParams(searchParams);

        setLocalSearchValue(search);

        const startFromPage = async () => {
            await bandsStore.preparePaginationCursor(page);
        };

        startFromPage();
    }, [searchParams]);

    useEffect(() => {
        if (!isInitialSearchApplied) {
            setIsInitialSearchApplied(true);
            return;
        }
        filtersStore.setSearchQuery(debouncedSearchValue);
        filtersStore.setCurrentPage(1);
        updateURL();
    }, [debouncedSearchValue]);

    const handleCategoryChange = useCallback((categories: string[]) => {
        filtersStore.setSelectedCategories(categories);
        filtersStore.setCurrentPage(1);
        updateURL();
    }, [updateURL]);

    const handleHideFavorites = useCallback((checked: boolean) => {
        filtersStore.setHideFavorites(checked);
        filtersStore.setCurrentPage(1);
        console.log(favoriteBandsStore.bands)
        console.log(bandsStore.bands)
        updateURL();
    }, [updateURL, handleCategoryChange]);

    return { categoriesOptions, localSearchValue, setLocalSearchValue, handleCategoryChange, updateURL, handleHideFavorites };
}
