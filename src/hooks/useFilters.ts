import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import filtersStore from "stores/FiltersStore";
import { parseQueryParams } from "utils/queryParams";
import { useDebounce } from "./useDebounce";
import { bandsStore } from "stores";

export function useFilters() {
    const [localSearchValue, setLocalSearchValue] = useState(filtersStore.searchQuery);
    const debouncedSearchValue = useDebounce(localSearchValue, 500);
    const [isInitialSearchApplied, setIsInitialSearchApplied] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();

    const updateURL = useCallback((page: number, search: string, categories: string[]) => {
        const params = new URLSearchParams();
        params.set("page", String(page));
        if (search) params.set("search", search);
        if (categories.length > 0) params.set("categories", categories.join(","));
        setSearchParams(params);
    }, [setSearchParams]);

    const categoriesOptions = bandsStore.categoriesOptions;

    useEffect(() => {
        const { page, search, categories } = parseQueryParams(searchParams);
        filtersStore.setSearchQuery(search);
        filtersStore.setSelectedCategories(categories);
        filtersStore.setCurrentPage(page);
        filtersStore.syncFromSearchParams(searchParams);

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
        bandsStore.setLastVisible(null);
        updateURL(1, debouncedSearchValue, filtersStore.selectedCategories);
    }, [debouncedSearchValue]);

    const handleCategoryChange = useCallback((categories: string[]) => {
        filtersStore.setSelectedCategories(categories);
        filtersStore.setCurrentPage(1);
        bandsStore.setLastVisible(null);
        updateURL(1, filtersStore.searchQuery, categories);
    }, [filtersStore, bandsStore, updateURL]);

    return { categoriesOptions, localSearchValue, setLocalSearchValue, handleCategoryChange, updateURL };
}
