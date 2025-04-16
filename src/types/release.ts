export interface ServerRelease {
    title: string;
    cover: string;
    year: number;
    rating: string;
    total_length: string;
    tracks: ServerReleaseTrack[];
}

export interface ServerReleaseTrack {
    title: string;
    length: string;
}

export interface Release {
    title: string;
    cover: string;
    year: number;
    rating: string;
    totalLength: string;
    tracks: ReleaseTrack[];
}

export interface ReleaseTrack {
    title: string;
    length: string;
}