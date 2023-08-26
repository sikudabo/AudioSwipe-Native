import React from 'react';
import DiscoverPlayerCard, { DiscoverPlayerCardProps} from '../../../FanDiscoverPage/Discover/components/DiscoverPlayerCard';

export default function LikedSongsPlayerCard({ albumName, artistName, coverSource, songName }: DiscoverPlayerCardProps) {
    return <DiscoverPlayerCard albumName={albumName} artistName={artistName} coverSource={coverSource} isLikedSong={true} songName={songName} />;
}