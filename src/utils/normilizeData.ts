import {Band, Member, ServerBand, ServerMember} from "types/band";
import {ServerRelease, Release, ServerReleaseTrack, ReleaseTrack} from "types/release";


export function normalizeMemberData(serverMember: ServerMember): Member {
    return {
        firstName: serverMember.first_name,
        lastName: serverMember.last_name,
        english: serverMember.english,
        instrument: serverMember.instrument
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
        members: serverBand.members.map(normalizeMemberData)
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
