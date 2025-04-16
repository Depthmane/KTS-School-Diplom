export interface ServerBand {
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
    members: ServerMember[];
}

export interface ServerMember {
    first_name: string;
    last_name: string;
    english: string;
    instrument: string;
}

export interface Band {
    id: string;
    name: string;
    country: string;
    image: string;
    creationYear: number;
    endYear?: number;
    isActive: boolean;
    genres: string[];
    website: string;
    descriptionShort: string;
    descriptionLong: string;
    members: Member[];
}

export interface Member {
    firstName: string;
    lastName: string;
    english: string;
    instrument: string;
}