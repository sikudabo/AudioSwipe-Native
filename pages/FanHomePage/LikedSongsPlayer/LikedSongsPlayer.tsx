import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import LikedSongsPlayerCard from './components/LikedSongsPlayerCard';
import { colors } from '../../../components/colors';
import { baseUrl } from '../../../utils/constants';
import { useAudioPlayerRef, useUpdateAudioPlayer } from '../../../contexts/SwipeAudioContext';

type LikedSongsPlayerProps = {
    navigation: any;
    route: any;
};

export default function LikedSongsPlayer({ navigation, route }: LikedSongsPlayerProps) {
    const { album, albumName, artistName, artistId, coverSource, songName, songMediaId } = route.params;
    const { createNewAudioSource } = useUpdateAudioPlayer();

    useEffect(() => {
        async function playSound() {
            await createNewAudioSource(`${baseUrl}api/get-audio/${songMediaId}`);
        }
        playSound();
    }, [route]);


    return (
        <View style={styles.container}>
            <LikedSongsPlayerCard 
                artistId={artistId}
                albumName={albumName}
                artistName={artistName}
                coverSource={coverSource}
                navigation={navigation}
                songName={songName}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.primary,
        height: '100%',
        paddingTop: 30,
    },
});