import React from 'react';
import DiscoverPlayerCard, { DiscoverPlayerCardProps } from '../../../FanDiscoverPage/Discover/components/DiscoverPlayerCard';
import { useAudioPlayerRef, useUpdateAudioPlayer } from '../../../../contexts/SwipeAudioContext';

export default function LikedSongsPlayerCard({ albumName, artistName, artistId, coverSource, navigation, songName }: DiscoverPlayerCardProps) {
    const { setCurrentSound } = useUpdateAudioPlayer();
    const { currentSound, swipeAudioPlayerRef } = useAudioPlayerRef();
    async function handlePress() {
        await currentSound.unloadAsync();
        navigation.navigate('ArtistProfilePage', { artistId });
    }
    return <DiscoverPlayerCard albumName={albumName} artistName={artistName} coverSource={coverSource} handlePress={handlePress} isLikedSong={true} songName={songName} hasViewProfile />;
}