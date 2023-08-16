import React, { useEffect, useMemo, useRef, useState } from 'react';
import { PanResponder, PanResponderInstance, StyleSheet, View } from 'react-native';
import ReactTinderCard from 'react-tinder-card';
import { ActivityIndicator } from 'react-native-paper';
import { Text } from 'react-native-paper';
import DiscoverPlayerCard from './components/DiscoverPlayerCard';
import { AudioSwipeText } from '../../../components';
import { colors } from '../../../components/colors';
import { useShowLoader, useUserData } from '../../../hooks';
import { SongDataType } from '../../../typings';
import useFetchGenre from './hooks/useFetchGenre';
import { useAudioPlayerRef, useUpdateAudioPlayer } from '../../../contexts/SwipeAudioContext';
import { Audio } from 'expo-av';
import { baseUrl } from '../../../utils/constants';
import ExperimentalDiscoverPlayerCard from './components/ExperimentalDiscoverPlayerCard';
import axios from 'axios';
const CeCeCover = require('../../../assets/app-media/cece.jpeg');
const CeCeMp3 = require('../../../assets/app-media/cece.mp3');
const JoshuaRogersMp3 = require('../../../assets/app-media/joshuarogers.mp3');
const JoshuaRogersCover = require('../../../assets/app-media/joshuarogers.jpeg');
const JMossCover = require('../../../assets/app-media/jmoss.jpeg');
const JMossMp3 = require('../../../assets/app-media/jmoss.mp3');
const KirkCover = require('../../../assets/app-media/kirkfranklin.jpeg')
const KirkMp3 = require('../../../assets/app-media/kirkfranklin.mp3');

const db = [
  {
    albumName: 'Unconditional',
    artistName: 'Joshua Rogers',
    _id: 4,
    coverSource: JoshuaRogersCover,
    songMediaId: JoshuaRogersMp3,
    songName: 'So Good!',
  },
  {
    albumName: 'Praise Him',
    artistName: 'J Moss',
    coverSource: JMossCover,
    _id: 3,
    songMediaId: JMossMp3,
    songName: 'Praise in the Sanctuary',
  },
  {
    albumName: 'God is Good',
    artistName: 'Kirk Franklin',
    coverSource: KirkCover,
    _id: 2,
    songMediaId: KirkMp3,
    songName: 'God lifts us up!'
  },
  {
    albumName: 'God is so Good',
    artistName: 'CeCe Winans',
    coverSource: CeCeCover,
    _id: 1,
    songMediaId: CeCeMp3,
    songName: 'Praise God',
  },
];

type DiscoverMusicPlayerProps = {
    route: any,
}

type DataLayerProps = {
    genre: string;
}

type DiscoverMusicPlayerDisplayLayerProps = Pick<DataLayerProps, 'genre'> & {
    data: SongDataType[];
    genre: string;
    hasData: boolean;
    isLoading: boolean;
}

export default function DiscoverMusicPlayer({ route }: DiscoverMusicPlayerProps) {
    const { genre } = route.params;
    return <DiscoverMusicPlayer_DisplayLayer {...useDataLayer({ genre })} />
}

function DiscoverMusicPlayer_DisplayLayer({ data, genre, hasData, isLoading }: DiscoverMusicPlayerDisplayLayerProps) {
    const { fan } = useUserData();
    const { _id } = fan;
    const { createNewAudioSource, destroySound, setCurrentSound } = useUpdateAudioPlayer();
    const { currentSound, swipeAudioPlayerRef } = useAudioPlayerRef();
    const songListRef: SongDataType[] | any  = useRef()
    songListRef.current = data as SongDataType[];
    const [currentSongIndex, setCurrentSongIndex] = useState(hasData ? data.length - 1 : 0);
    const [exampleSongIndex, setExampleSongIndex] = useState(db.length - 1);
    const testSongIndexRef = useRef(exampleSongIndex);
    const testSongListRef = useRef(db);
    const currentSongIndexRef = useRef(currentSongIndex);
    const [isPlaying, setIsPlaying] = useState(false);
    const [audioClips, setAudioClips] = useState<SongDataType[]>([]);
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
        if (audioClips.length > 0) {
            playSound();
        }
    }, [hasData]);

    useEffect(() => {
        async function fetchData() {
            return await axios({
                method: 'GET',
                url: `${baseUrl}api/fetch-genre/${genre}/${_id}`,
            }).then(response => {
                const { audioClips } = response.data;
                setAudioClips(audioClips);
            });
        }

        fetchData();
    }, []);

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
        setAudioClips(audioClips.filter((song: SongDataType) => song._id !== id));
        console.log('The updated audio clips are:', audioClips);

        if (audioClips.length > 0) {
            createNewAudioSource(`${baseUrl}api/get-audio/${audioClips[currentSongIndexRef.current]?.songMediaId}`);
        }
    }

    async function playSound() {

        if (!hasData || currentSongIndexRef.current >= data.length) {
            return;
        }

        if (audioClips.length <= 0) {
            return;
        }

        await createNewAudioSource(`${baseUrl}api/get-audio/${audioClips[currentSongIndexRef.current]?.songMediaId}`);
       
    }
    
    if (isLoading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator animating={isLoading} color={colors.hotPink} />
            </View>
        );
    }
    else if ((typeof data !== 'undefined' && data.length === 0) || !hasData || typeof data === 'undefined' || data.length === 0 || audioClips.length === 0) {
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
                {audioClips.reverse().map((song: SongDataType, index: number) => (
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
                                    key={index}
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


function useDataLayer({ genre }: DataLayerProps) {
    const { data = [], isLoading } = useFetchGenre({ genre });

    return {
        data,
        genre,
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