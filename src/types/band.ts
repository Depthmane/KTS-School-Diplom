export interface Band {
    id: string;
    name: string;
    country: string;
    image: string;
    creation_year: number;
    end_year?: number;
    is_active: boolean;
    genres: string[];
    website: string;
    description_short: string;
    description_long: string;
    members: Member[];
}

export interface Member {
    first_name: string;
    last_name: string;
    english: string;
    instrument: string;
}