import React, { useEffect, useRef, useState } from 'react';
import {
    ImageBackground,
    PanResponder,
    StyleSheet,
    View
} from 'react-native';
import {
    Avatar,
    Card,
    FAB,
    Text
} from 'react-native-paper';
import { Audio } from 'expo-av';
import { colors } from '../../../../components/colors';
import { baseUrl } from '../../../../utils/constants';
import { useAudioPlayerRef, useUpdateAudioPlayer } from '../../../../contexts/SwipeAudioContext';
import { useRoute } from '@react-navigation/native';

type DiscoverPlayerCardProps = {
    albumName: string;
    artistName: string;
    coverSource: string;
    songMediaId: string;
    songName: string;
};


export default function DiscoverPlayerCard({ 
    albumName,
    artistName,
    coverSource,
    songMediaId,
    songName,
}: DiscoverPlayerCardProps) {
    const { createNewAudioSource, setCurrentSound } = useUpdateAudioPlayer();
    const { currentSound, swipeAudioPlayerRef } = useAudioPlayerRef();
    const [isPlaying, setIsPlaying] = useState(false);
    const route = useRoute();
    let audioRef: any = useRef();

    useEffect(() => {
        destroyPlayer();
    }, [route.params]);

    useEffect(() => {
        playSound();
        setIsPlaying(true);
    }, []);

    async function destroyPlayer() {
        await audioRef.current.unloadAsync();
        audioRef.current = undefined;
    }

    async function handleCreate() {
        await createNewAudioSource(songMediaId);
    }

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
                uri: `${baseUrl}api/get-audio/${songMediaId}`,
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

    async function handlePause() {
        await currentSound.pauseAsync();
        setIsPlaying(false);
    }

    async function handlePlay() {
        await currentSound.playAsync();
        setIsPlaying(true);
    }


    return (
        <View style={styles.container}>
            <View style={styles.swipe}>
                <Card 
                    elevation={5}
                    style={styles.card}
                >
                    <View 
                        ref={swipeAudioPlayerRef}
                    />
                    <View 
                        style={styles.imgContainer}
                    >
                        <ImageBackground 
                            source={{ uri: `${baseUrl}api/get-photo/${coverSource}` }}
                            style={styles.img}
                        />
                    </View>
                    <Card.Content 
                        style={styles.contentSection}
                    >
                        <Text style={styles.text} variant="titleLarge">
                            {artistName} - {albumName}
                      </Text>
                      <Text style={styles.text} variant="bodySmall">
                        {songName}
                      </Text>
                    </Card.Content>
                    <Card.Actions>
                        <View style={styles.actionsContainer}>
                            <FAB icon={isPlaying ? "pause-circle" : "play-circle"} color={colors.white} onPress={isPlaying ? handlePause : handlePlay} size="large" style={styles.playBtn} />
                        </View>
                    </Card.Actions>
                </Card>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    actionsContainer: {
        alignContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
    },
    card: {
        backgroundColor: colors.white,
        height: 550,
        paddingBottom: 100,
        paddingLeft: 0,
        paddingRight: 0,
        width: 350,
    },
    container: {
        backgroundColor: colors.primary,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        height: 900,
        opacity: 0.7,
        paddingBottom: 20,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 50,
        width: '100%',
    },
    contentSection: {
        alignSelf: 'center',
        paddingBottom: 20,
        paddingTop: 20,
    },
    img: {
        borderRadius: 5,
        height: '100%',
        opacity: 1,
        width: '100%',
    },
    imgContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 300,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 20,
        width: '100%',
    },
    playBtn: {
        alignSelf: 'center',
        backgroundColor: colors.primary,
        borderRadius: 50,
        color: colors.white,
        marginBottom: 10,
    },
    swipe: {
        paddingTop: 75,
        position: 'absolute',
    },
    text: {
        color: colors.primary,
        fontFamily: 'VarelaRound_400Regular',
        fontWeight: '900',
    },
    textEmpty: {
        color: colors.white,
        fontFamily: 'VarelaRound_400Regular',
        fontWeight: '900',
    },
});