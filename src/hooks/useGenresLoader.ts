import { useEffect } from "react";
import { Option } from "components/Multidropdown";
import bandStore from "stores/BandStore";
import { autorun } from "mobx";

export const useGenresLoader = (setOptions: (opts: Option[]) => void) => {
    useEffect(() => {
        const disposer = autorun(async () => {
            await bandStore.loadGenres();
            const options = bandStore.genres.map((genre) => ({
                key: genre,
                value: genre,
            }));
            setOptions(options);
        });

        return () => disposer();
    }, [setOptions]);
};
