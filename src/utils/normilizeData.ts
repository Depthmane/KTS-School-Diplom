import {Band, Member, ServerBand, ServerMember, ServerLink, Link } from "types/band";
import {ServerRelease, Release, ServerReleaseTrack, ReleaseTrack} from "types/release";


export function normalizeMemberData(serverMember: ServerMember): Member {
    return {
        firstName: serverMember.first_name,
        lastName: serverMember.last_name,
        english: serverMember.english,
        instrument: serverMember.instrument
    };
}

export function normalizeLinksData(serverLink?: ServerLink): Link {
    return {
        spotify: serverLink?.spotify,
        youtube: serverLink?.youtube,
        yandex: serverLink?.yandex,
    };
}

export function normalizeBandData(serverBand: ServerBand): Band {
    return {
        id: serverBand.id,
        name: serverBand.name,
        country: serverBand.country,
        image: serverBand.image,
        creationYear: serverBand.creation_year,
        endYear: serverBand.end_year,
        isActive: serverBand.is_active,
        genres: serverBand.genres,
        website: serverBand.website,
        descriptionShort: serverBand.description_short,
        descriptionLong: serverBand.description_long,
        members: serverBand.members.map(normalizeMemberData),
        resourcesLinks: normalizeLinksData(serverBand.resources_links),
        imagesSwiper: serverBand.images_swiper || [],
    };
}

export function normalizeReleaseData(serverRelease: ServerRelease): Release {
    return {
        title: serverRelease.title,
        cover: serverRelease.cover,
        year: serverRelease.year,
        rating: serverRelease.rating,
        totalLength: serverRelease.total_length,
        tracks: serverRelease.tracks.map(normalizeReleaseTrackData),
    };
}

export function normalizeReleaseTrackData(serverTrack: ServerReleaseTrack): ReleaseTrack {
    return {
        title: serverTrack.title,
        length: serverTrack.length,
    };
}
