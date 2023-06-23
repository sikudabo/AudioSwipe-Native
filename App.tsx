import React, { useCallback, useEffect, useMemo, useRef, useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import AppLoading from 'expo-app-loading';
import styled from 'styled-components';
import { NavigationContainer } from '@react-navigation/native';
import { Avatar, Button, Card, Checkbox, configureFonts, FAB, IconButton, MD3Colors, MD3LightTheme as DefaultTheme, PaperProvider, RadioButton, Text, Portal, Dialog, ProgressBar } from 'react-native-paper';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image, ImageBackground, PanResponder, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { useFonts, VarelaRound_400Regular } from '@expo-google-fonts/varela-round';
import { colors } from './components';
import { ArtistPage, HomePage } from './pages';
import Svg, { Circle, Rect } from 'react-native-svg';
import * as SplashScreen from 'expo-splash-screen';
import { Audio } from 'expo-av';
import ReactTinderCard from 'react-tinder-card';
const CeCeCover = require('./assets/app-media/cece.jpeg');
const CeCeMp3 = require('./assets/app-media/cece.mp3');
const JoshuaRogersMp3 = require('./assets/app-media/joshuarogers.mp3');
const JoshuaRogersCover = require('./assets/app-media/joshuarogers.jpeg');
const JMossCover = require('./assets/app-media/jmoss.jpeg');
const JMossMp3 = require('./assets/app-media/jmoss.mp3');
const KirkCover = require('./assets/app-media/kirkfranklin.jpeg')
const KirkMp3 = require('./assets/app-media/kirkfranklin.mp3');

const db = [
  {
    albumName: 'Unconditional',
    artistName: 'Joshua Rogers',
    coverArtSource: JoshuaRogersCover,
    id: 1,
    mp3File: JoshuaRogersMp3,
    songName: 'So Good!',
  },
  {
    albumName: 'God is so Good',
    artistName: 'CeCe Winans',
    coverArtSource: CeCeCover,
    id: 2,
    mp3File: CeCeMp3,
    songName: 'Praise God',
  },
  {
    albumName: 'Praise Him',
    artistName: 'J Moss',
    coverArtSource: JMossCover,
    id: 3,
    mp3File: JMossMp3,
    songName: 'Praise in the Sanctuary',
  },
  {
    albumName: 'God is Good',
    artistName: 'Kirk Franklin',
    coverArtSource: KirkCover,
    id: 4,
    mp3File: KirkMp3,
    songName: 'God lifts us up!'
  }
];


const Stack = createNativeStackNavigator();

type AppDisplayLayerProps = {
  fontsLoaded: boolean;
};

SplashScreen.preventAutoHideAsync()

const theme = {
  ...DefaultTheme,
  dark: true,
  rippleEffectEnabled: false,
};

export default function App() {
  return <App_DisplayLayer {...useDataLayer()} />
}

function TopAvatar(props: any) {
  return <Avatar.Icon {...props} icon="music" style={{ backgroundColor: colors.secondary }} />;
}


function App_DisplayLayer({ fontsLoaded }: AppDisplayLayerProps) {

  const [mediaSound, setSound] = useState();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  let soundRef = useRef(new Audio.Sound());
  let audioRef: any = useRef(undefined);
  let statusRef: any = useRef(undefined);
  const [audioTime, setAudioTime] = useState('0:00');
  const [audioProgress, setAudioProgress] = useState(0.0);
  const [songList, setSongList] = useState(db);
  const [currentSongIndex, setCurrentSongIndex] = useState(db.length - 1);
  const [lastDirection, setLastDirection] = useState('');
  const currentSongIndexRef = useRef(currentSongIndex);
  const canSwipe = currentSongIndex >= 0;
  const songListRef = useRef(db);
  const [shouldDisplay, setShouldDisplay] = useState(true);

  const childRefs: any = useMemo(
    () =>
      Array(songListRef.current.length)
        .fill(0)
        .map((i) => React.createRef()),
    []
  );

  function updateCurrentIndex(val: number) {
    setCurrentSongIndex(val);
    currentSongIndexRef.current = val;
  }

  function swiped(direction: string, index: number) {
    return;
  }

  async function swipe(direction: string) {
    await childRefs[currentSongIndexRef.current].current.swipe(direction);
  }

  async function cardLeftScreen(direction: string, id: number, index: number) {
    setAudioProgress(0.0);
    setAudioTime('0:00');
    setLastDirection(direction);
    updateCurrentIndex(index - 1);
    songListRef.current = songListRef.current.filter((song) => song.id !== id);
    if (audioRef.current) {
      await audioRef.current.unloadAsync();
      audioRef.current = undefined;
      playSound();
    }
  }
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
  const mediaCardRef = useRef(
    PanResponder.create({
      onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
    })
  )

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  async function createSound() {
  }

  useEffect(() => {
    setIsPlaying(true);
    playSound();
  }, []);

  useEffect(() => {
    if (songListRef.current.length === 0) {
      setShouldDisplay(false);
    }
    console.log('Should display is:', shouldDisplay);
  }, [songListRef.current.length]);

  useEffect(() => {
    if (!audioRef.current) {
      setAudioProgress(0.0);
    }
  }, [audioRef.current]);

  function onSwipe(direction: any) {
    console.log('The swipe direction was:', direction);
  }

  async function handleAudioTimeUpdate(status: any) {
    statusRef.current = status;
    if (status.positionMillis > 31000 || status.positionMillis >= status.durationMillis) {
      setAudioProgress(0.0);
      setIsPlaying(false);
      if (audioRef.current) {
       await audioRef.current.unloadAsync();
      }
      audioRef.current = undefined;
      return;
    }
    if (!status.isPlaying) {
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
    }
    if (status.positionMillis >= 1000) {
      setAudioTime(`${status.positionMillis < 10000 ? `0:0` : `0:`}${Math.floor(status.positionMillis / 1000) as unknown as string}`);
    } else {
      setAudioTime('0:00');
    }
    if(status.positionMillis >= status.durationMillis) {
      setAudioProgress(0);
      if (audioRef.current) {
        await audioRef.current.unloadAsync();
      }
      audioRef.current = undefined;
      return;
    }
    else if (status.positionMillis >= 1000 && status.positionMillis <= 1500) {
      setAudioProgress(0.01);
    } else if (status.positionMillis >= 2000 && status.positionMillis <= 2500) {
      setAudioProgress(0.02);
    } else if (status.positionMillis >= 3000 && status.positionMillis >= 35000) {
      setAudioProgress(0.03);
    } else if (status.positionMillis >= 4000 && status.positionMillis <= 4500) {
      setAudioProgress(0.04);
    } else if (status.positionMillis >= 5000 && status.positionMillis <= 5500) {
      setAudioProgress(0.05);
    } else if (status.positionMillis >= 6000 && status.positionMillis <= 6500) {
      setAudioProgress(0.06);
    } else if (status.positionMillis >= 7000 && status.positionMillis <= 7500) {
      setAudioProgress(0.07);
    } else if (status.positionMillis >= 8000 && status.positionMillis <= 8500) {
      setAudioProgress(0.08);
    } else if (status.positionMillis >= 9000 && status.positionMillis <= 9500) {
      setAudioProgress(0.09);
    } else if (status.positionMillis >= 10000 && status.positionMillis <= 10500) {
      setAudioProgress(0.1);
    } else if (status.positionMillis >= 11000 && status.positionMillis <= 11500) {
      setAudioProgress(0.15);
    } else if (status.positionMillis >= 12000 && status.positionMillis <= 12500) {
      setAudioProgress(0.2);
    } else if (status.positionMillis >= 13000 && status.positionMillis <= 13500) {
      setAudioProgress(0.25);
    }  else if (status.positionMillis >= 14000 && status.positionMillis <= 14500) {
      setAudioProgress(0.3);
    }  else if (status.positionMillis >= 15000 && status.positionMillis <= 15500) {
      setAudioProgress(0.35);
    } else if (status.positionMillis >= 16000 && status.positionMillis <= 16500) {
      setAudioProgress(0.4);
    } else if (status.positionMillis >= 17000 && status.positionMillis <= 17500) {
      setAudioProgress(0.45);
    } else if (status.positionMillis >= 18000 && status.positionMillis <= 18500) {
      setAudioProgress(0.5);
    } else if (status.positionMillis >= 19000 && status.positionMillis <= 19500) {
      setAudioProgress(0.55);
    } else if (status.positionMillis >= 20000 && status.positionMillis <= 20500) {
      setAudioProgress(0.6);
    } else if (status.positionMillis >= 21000 && status.positionMillis <= 21500) {
      setAudioProgress(0.62);
    } else if (status.positionMillis >= 22000 && status.positionMillis <= 22500) {
      setAudioProgress(0.65);
    } else if (status.positionMillis >= 23000 && status.positionMillis <= 23500) {
      setAudioProgress(0.68);
    } else if (status.positionMillis >= 24000 && status.positionMillis <= 24500) {
      setAudioProgress(0.7);
    } else if (status.positionMillis >= 25000 && status.positionMillis <= 25500) {
      setAudioProgress(0.73);
    } else if (status.positionMillis >= 26000 && status.positionMillis <= 26500) {
      setAudioProgress(0.78);
    } else if (status.positionMillis >= 27000 && status.positionMillis <= 27500) {
      setAudioProgress(0.8);
    } else if (status.positionMillis >= 28000 && status.positionMillis <= 28500) {
      setAudioProgress(0.83);
    } else if (status.positionMillis >= 29000 && status.positionMillis <= 29500) {
      setAudioProgress(0.92);
    } else if (status.positionMillis > 29500 && status.positionMillis <= 31000) {
      setAudioProgress(1);
      if (audioRef.current) {
        await audioRef.current.unloadAsync();
      }
      audioRef.current = undefined;
    }
  }  

  async function playSound() {
    if (songListRef.current.length <= 0) {
      return;
    }
    if (!shouldDisplay) {
      return;
    }
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      playsInSilentModeIOS: true,
      staysActiveInBackground: true,
      shouldDuckAndroid: false,
    });
    if (!audioRef.current) {
      const { sound } = await Audio.Sound.createAsync(songListRef.current[currentSongIndexRef.current].mp3File, {
        shouldPlay: true,
      }, 
        (status: any) => handleAudioTimeUpdate(status),
      );
      audioRef.current = sound;
    }

    if (isPlaying) {
      setIsPlaying(false);
     await audioRef.current.pauseAsync();
    } else {
      setIsPlaying(!isPlaying);
      await audioRef.current.playAsync();
    }
  }

  if (!fontsLoaded) {
    return null;
  }

  function handleIsUpdatingChange() {
    setIsUpdating(!isUpdating);
  }

  return (
    <PaperProvider theme={theme}>
        {shouldDisplay ? (
          <View onLayout={onLayoutRootView} style={styles.container}>
          {songListRef.current.map((song, index) => (
            <View style={styles.swipe}>
              <ReactTinderCard 
                key={song.id}
                onCardLeftScreen={(direction) => cardLeftScreen(direction, song.id, index)}
                onSwipe={(direction) => swiped(direction, index)}
                preventSwipe={['down', 'up']}
                ref={childRefs[index]}
                swipeRequirementType="position"
              >
                <View {...panResponder.panHandlers}>
                  <Card elevation={5} style={styles.card}>
                    <View style={styles.imgContainer}>
                      <ImageBackground source={song.coverArtSource} style={styles.img} />
                    </View>
                    <Card.Content style={styles.contentSection}>
                      <Text style={styles.text} variant="titleLarge">
                        {song.artistName} - {song.albumName}
                      </Text>
                      <Text style={styles.text} variant="bodySmall">
                        {song.songName}
                      </Text>
                    </Card.Content>
                    <View>
                      <ProgressBar animatedValue={audioProgress} color={colors.primary} />
                      <Text style={styles.audioTime}>{audioTime}</Text>
                    </View>
                    <View style={styles.actionsContainer}>
                      <FAB disabled={isUpdating} icon="thumb-down-outline" color={colors.white} onTouchStart={() => swipe('left')} size="small" style={styles.downVoteBtn} />
                      <FAB icon={isPlaying ? "pause-circle" : "play-circle"} color={colors.white} onTouchStart={playSound} size="large" style={styles.playBtn} />
                      <FAB disabled={isUpdating} icon="thumb-up-outline" color={colors.white} onTouchStart={() => swipe('right')} size="small" style={styles.upVoteBtn} />
                    </View>
                  </Card>
                </View>
              </ReactTinderCard>
            </View>
          ))} 
        </View>
        ) : (
          <View>
            <View style={styles.container}>
              <Text style={styles.textEmpty}>
                No More Songs Available 
              </Text>
            </View>
          </View>
        )}
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  audioTime: {
    fontFamily: 'VarelaRound_400Regular',
    fontWeight: '900',
    marginLeft: 20,
    paddingTop: 5,
  },
  actionsContainer: {
    alignContent: 'center',
    alignItems: 'center',
    display: 'flex',
    gap: 10,
    flexDirection: 'row',
    paddingBottom: 50,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 30,
    width: '100%',
  },
  btn: {
    borderColor: colors.secondary,
    borderRadius: 5,
    marginBottom: 20,
  },
  card: {
    backgroundColor: colors.white,
    height: 670,
    paddingBottom: 200,
    paddingLeft: 0,
    paddingRight: 0,
    width: 350,
  },
  cardCover: {
    width: '100%',
    height: '100%',
  },
  container: {
    backgroundColor: colors.primary,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    height: 900,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 75,
    opacity: 0.7, 
    width: '100%',
  },
  contentSection: {
    alignSelf: 'center',
    paddingBottom: 20,
    paddingTop: 20,
  },
  downVoteBtn: {
    backgroundColor: colors.primary,
    borderRadius: 50,
    color: colors.white,
    justifyContent: 'flex-start',
    marginBottom: 10,
    marginRight: 'auto',
  },
  emptyStateContent: {
    paddingTop: 200,
  },
  iconButton: {
    backgroundColor: colors.white,
    borderColor: colors.white,
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
    height: 400,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    width: '100%',
  },
  playBtn: {
    backgroundColor: colors.primary,
    borderRadius: 50,
    color: colors.white,
    marginBottom: 10,
  },
  swipe: {
    position: 'absolute',
  },
  topTitle: {
    alignSelf: 'center',
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
  upVoteBtn: {
    backgroundColor: colors.primary,
    borderRadius: 50,
    color: colors.white,
    justifyContent: 'flex-end',
    marginBottom: 10,
    marginLeft: 'auto',
  },
});

function useDataLayer() {
  const [fontsLoaded] = useFonts({
    VarelaRound_400Regular,
  });

  return {
    fontsLoaded,
  }
}