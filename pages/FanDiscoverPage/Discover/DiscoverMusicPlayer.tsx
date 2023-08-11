import React, { useEffect, useMemo, useRef, useState } from 'react';
import { PanResponder, PanResponderInstance, StyleSheet, View } from 'react-native';
import ReactTinderCard from 'react-tinder-card';
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
    const { createNewAudioSource, destroySound, setCurrentSound } = useUpdateAudioPlayer();
    const { currentSound, swipeAudioPlayerRef } = useAudioPlayerRef();
    const songListRef: SongDataType[] | any  = useRef()
    songListRef.current = data as SongDataType[];
    const [currentSongIndex, setCurrentSongIndex] = useState(data.length > 0 ? data.length - 1 : 0);
    const currentSongIndexRef = useRef(currentSongIndex);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef: any = useRef(undefined);
    const childRefs: any = useMemo(
        () =>
          Array(songListRef.current.length)
            .fill(0)
            .map((i) => React.createRef()),
        []
    );

    const panResponder = useMemo(() => 
    PanResponder.create({
      onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
      onStartShouldSetPanResponder: (evt, gestureState) => false,
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        const { dx, dy } = gestureState
        return (dx > 2 || dx < -2 || dy > 2 || dy < -2)
      },
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => {
        const { dx, dy } = gestureState
        return (dx > 2 || dx < -2 || dy > 2 || dy < -2)
      },
    })
  , []);

    useEffect(() => {
        if (data.length > 0) {
            playSound();
        }
    }, [hasData]);

    function handleStatusUpdate(status: any) {
        return;
    }

    function updateCurrentIndex(val: number) {
        setCurrentSongIndex(val);
        currentSongIndexRef.current = val;
      }

    async function cardLeftScreen(direction: string, id: string, index: number) {
        await currentSound.unloadAsync();
        updateCurrentIndex(index);
        songListRef.current = songListRef.current.filter((song: SongDataType) => song?._id !== id);

        if (songListRef.current.length > 0) {
            createNewAudioSource(`${baseUrl}api/get-audio/${data[currentSongIndexRef.current]?.songMediaId}`);
        }
    }

    async function playSound() {

        if (!hasData || currentSongIndexRef.current >= data.length) {
            return;
        }

        if (songListRef.current.length <= 0) {
            return;
        }

        console.log('The current index is:', currentSongIndexRef.current);

        await createNewAudioSource(`${baseUrl}api/get-audio/${data[currentSongIndexRef.current]?.songMediaId}`);
       
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
           <View style={styles.altContainer}>
                {songListRef.current.reverse().map((song: SongDataType, index: number) => (
                    <View key={song._id} style={styles.swipe}>
                        <ReactTinderCard 
                            key={index}
                            onCardLeftScreen={(direction) => cardLeftScreen(direction, song?._id, index)}
                            preventSwipe={['down', 'up']}
                            ref={childRefs[index]}
                            swipeRequirementType="position"
                        >
                            <View {...panResponder.panHandlers}>
                                <DiscoverPlayerCard
                                    albumName={song.album}
                                    artistName={song.artistName}
                                    coverSource={song.albumCover}
                                    songMediaId={song.songMediaId}
                                    songName={song.name}
                                />
                            </View>
                        </ReactTinderCard>
                    </View>
                ))}
           </View>
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
    altContainer: {
        alignItems: 'center',
        backgroundColor: colors.hotPink,
        height: '100%',
        paddingTop: 100,
        textAlign: 'center',
        width: '100%',
    },
    swipe: {
        paddingBottom: 20,
        paddingTop: 75,
        position: 'absolute',
      },
    text: {
        color: colors.white,
        fontFamily: 'VarelaRound_400Regular',
        fontSize: 42,
        fontWeight: '900',
    }
});