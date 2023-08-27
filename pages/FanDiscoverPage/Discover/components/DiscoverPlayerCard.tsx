import React, { useMemo, useState } from 'react';
import {
    ImageBackground,
    PanResponder,
    StyleSheet,
    View
} from 'react-native';
import {
    Card,
    FAB,
    Text
} from 'react-native-paper';
import { colors } from '../../../../components/colors';
import { baseUrl } from '../../../../utils/constants';
import { useAudioPlayerRef } from '../../../../contexts/SwipeAudioContext';

export type DiscoverPlayerCardProps = {
    albumName: string;
    artistName: string;
    coverSource: string;
    isLikedSong?: boolean;
    songName: string;
};


export default function DiscoverPlayerCard({ 
    albumName,
    artistName,
    coverSource,
    isLikedSong = false,
    songName,
}: DiscoverPlayerCardProps) {
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
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            height: 900,
            opacity: 1,
            paddingBottom: 20,
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: 50,
            width: '100%',
        },
        altContainer: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            height: 900,
            opacity: 1,
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
            backgroundColor: isLikedSong ? colors.primary : colors.hotPink,
            borderRadius: 50,
            color: colors.white,
            marginBottom: 10,
        },
        swipe: {
            paddingTop: 75,
            position: 'absolute',
        },
        text: {
            color: isLikedSong ? colors.primary : colors.hotPink,
            fontFamily: 'VarelaRound_400Regular',
            fontWeight: '900',
        },
        textEmpty: {
            color: colors.white,
            fontFamily: 'VarelaRound_400Regular',
            fontWeight: '900',
        },
    });
    const { currentSound, swipeAudioPlayerRef } = useAudioPlayerRef();
    const [isPlaying, setIsPlaying] = useState(true);

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
            <View {...panResponder.panHandlers}>
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
                            <FAB icon={isPlaying ? "pause-circle" : "play-circle"} color={colors.white} onTouchStart={isPlaying ? handlePause : handlePlay} size="large" style={styles.playBtn} />
                        </View>
                    </Card.Actions>
                </Card>
            </View>
        </View>
    );
}
