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
    const { album, albumName, artistName, coverSource, songName, songMediaId } = route.params;
    const { createNewAudioSource } = useUpdateAudioPlayer();
    const { currentSound } = useAudioPlayerRef();

    useEffect(() => {
        playSound();
    }, []);

    async function playSound() {
        await createNewAudioSource(`${baseUrl}api/get-audio/${songMediaId}`);
        console.log('The current sound is:', currentSound);
    }

    return (
        <View style={styles.container}>
            <LikedSongsPlayerCard 
                albumName={albumName}
                artistName={artistName}
                coverSource={coverSource}
                songName={songName}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.primary,
        paddingTop: 30,
    },
});