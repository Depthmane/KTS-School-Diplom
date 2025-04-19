import { Band } from "./band";

export type UserProfile = {
    id: string;
    login: string;
    favoriteGenres: string[];
    favoriteBands: Band[];
};