export interface Release {
    title: string;
    cover: string;
    year: number;
    rating: string;
    total_length: string;
    tracks: ReleaseTrack[];
}

export interface ReleaseTrack {
    title: string;
    length: string;
}