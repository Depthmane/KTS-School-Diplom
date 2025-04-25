import { useEffect, useRef, useCallback } from "react";
import filtersStore from "stores/FiltersStore";
import bandsStore from "stores/BandsStore";

export function usePagination(
    updateURL: (page: number, search: string, categories: string[]) => void
) {
    const shouldScrollToSavedPage = useRef(true);
    const isFirstLoad = useRef(true);

    const handleScrollToTop = useCallback(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        const previousPage = filtersStore.currentPage - 1;
        filtersStore.setCurrentPage(previousPage);
        bandsStore.trimBandsToPage();
        updateURL(previousPage, filtersStore.searchQuery, filtersStore.selectedCategories)
    },[])

    const handleScroll = useCallback(() => {
        const scrollTop = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const isBottom = scrollTop + windowHeight >= documentHeight - 100;


        if (
            isBottom &&
            !bandsStore.loading &&
            bandsStore.bands.length > 0 &&
            bandsStore.hasMore
        ) {
            isFirstLoad.current = false;
            const nextPage = filtersStore.currentPage + 1;
            filtersStore.setCurrentPage(nextPage);
            bandsStore.loadMoreBands();
            updateURL(nextPage, filtersStore.searchQuery, filtersStore.selectedCategories);
        }
    }, [updateURL]);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);


    return { handleScroll, shouldScrollToSavedPage, isFirstLoad, handleScrollToTop };
}
