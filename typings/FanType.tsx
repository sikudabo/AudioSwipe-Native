export type FanType = {
    avatar: string;
    email: string;
    firstName: string;
    gender: string;
    _id: string;
    lastName: string;
    likedSongs?: Array<{
        songId: string;
        likedOn: Date;
    }>;
    password: string;
    phoneNumber: string;
    songsHeard: Array<string>;
    subscribedArtists: Array<{
        artistId: string;
        subscribedOn: Date,
    }>;
};