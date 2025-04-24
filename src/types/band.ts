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
    resources_links?: ServerLink;
    images_swiper?: string[];
}

export interface ServerMember {
    first_name: string;
    last_name: string;
    english: string;
    instrument: string;
}

export interface ServerLink {
    spotify?: string;
    youtube?: string;
    yandex?: string;
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
    resourcesLinks?: Link;
    imagesSwiper?: string[];

}

export interface Member {
    firstName: string;
    lastName: string;
    english: string;
    instrument: string;
}

export interface Link {
    spotify?: string;
    youtube?: string;
    yandex?: string;
}