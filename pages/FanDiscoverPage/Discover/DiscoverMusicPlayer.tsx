import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { Text } from 'react-native-paper';
import DiscoverPlayerCard from './components/DiscoverPlayerCard';
import { AudioSwipeText } from '../../../components';
import { colors } from '../../../components/colors';
import { useShowLoader } from '../../../hooks';
import { SongDataType } from '../../../typings';
import useFetchGenre from './hooks/useFetchGenre';
import { useAudioPlayerRef, useUpdateAudioPlayer } from '../../../contexts/SwipeAudioContext';
import { Audio } from 'expo-av';
import { baseUrl } from '../../../utils/constants';

type DiscoverMusicPlayerProps = {
    route: any,
}

type DataLayerProps = {
    genre: string;
}

type DiscoverMusicPlayerDisplayLayerProps = Pick<DataLayerProps, 'genre'> & {
    data: SongDataType[];
    hasData: boolean;
    isLoading: boolean;
}

export default function DiscoverMusicPlayer({ route }: DiscoverMusicPlayerProps) {
    const { genre } = route.params;
    return <DiscoverMusicPlayer_DisplayLayer genre={genre} {...useDataLayer({ genre })} />
}

function DiscoverMusicPlayer_DisplayLayer({ data, genre, hasData, isLoading }: DiscoverMusicPlayerDisplayLayerProps) {
    const { createNewAudioSource, setCurrentSound } = useUpdateAudioPlayer();
    const { currentSound, swipeAudioPlayerRef } = useAudioPlayerRef();
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        playSound();
        setIsPlaying(true);
    }, []);

    function handleStatusUpdate(status: any) {
        
    }

    async function playSound() {

        await Audio.setAudioModeAsync({
            allowsRecordingIOS: false,
            playsInSilentModeIOS: true,
            staysActiveInBackground: false,
            shouldDuckAndroid: false,
        });

        const { sound } = await Audio.Sound.createAsync({
                uri: `${baseUrl}api/get-audio/${data[0].songMediaId}`,
            }, 
            {
                isLooping: true,
                shouldPlay: true,
            },
            (status: any) => handleStatusUpdate(status),
          );

       setCurrentSound(sound);
       currentSound.playAsync();
    }
    if (isLoading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator animating={isLoading} color={colors.hotPink} />
            </View>
        );
    }
    else if ((typeof data !== 'undefined' && data.length === 0) || !hasData || typeof data === 'undefined' || data.length === 0) {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>
                    No Audio Available
                </Text>
            </View>
        )
    } else if (hasData) {
        return (
            <DiscoverPlayerCard
                albumName={data[0].name}
                artistName={data[0].artistName}
                coverSource={data[0].albumCover}
                songMediaId={data[0].songMediaId}
                songName={data[0].name}
            />
        );
    } else {
        return (
            <View>
                <Text>
                    No Audio
                </Text>
            </View>
        )
    }
}

async function destroyPlayer(sound: any) {
    sound.unloadAsync();
}

function useDataLayer({ genre }: DataLayerProps) {
    const { data = [], isLoading } = useFetchGenre({ genre });
    const { currentSound } = useAudioPlayerRef();
    const { destroySound, setCurrentSound } = useUpdateAudioPlayer();
    
    if (data.length <= 0) {
        if (currentSound) {
            currentSound.unloadAsync();
            console.log('The current sound is:', currentSound);
        }
        setCurrentSound(null);
    }
    return {
        data,
        hasData: data.length > 0,
        isLoading,
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: colors.primary,
        height: '100%',
        paddingTop: 100,
        textAlign: 'center',
        width: '100%',
    },
    text: {
        color: colors.white,
        fontFamily: 'VarelaRound_400Regular',
        fontSize: 42,
        fontWeight: '900',
    }
});