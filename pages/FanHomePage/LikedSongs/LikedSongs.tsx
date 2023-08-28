import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useQueryClient } from '@tanstack/react-query';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { MD3DarkTheme, Text } from 'react-native-paper';
import { AudioSwipeText } from '../../../components';
import { colors } from '../../../components/colors';
import { useGetUser, useUserData } from '../../../hooks';
import { FanType } from '../../../typings';
import { FanLoginProps } from '../../FanLoginPage/FanLoginPage';
import useFetchFanLikedSongs from '../hooks/useFetchFanLikedSongs';
import LikedSongCard from './components/LikedSongCard';
import { SongDataType } from '../../../typings';
import { baseUrl } from '../../../utils/constants';

type LikedSongsDisplayLayerProps = {
    fan: FanType;
    fanLikedSongs: SongDataType[];
    navigation: any;
};

export default function LikedSongs({ navigation }: FanLoginProps) {
    return <LikedSongs_DisplayLayer navigation={navigation} {...useDataLayer({ navigation })} />;
}


function LikedSongs_DisplayLayer({ fan, fanLikedSongs, navigation }: LikedSongsDisplayLayerProps) {
    const { firstName } = fan;
    const [likedSongs, setLikedSongs] = useState<SongDataType[]>([]);
    const { _id: fanId } = fan;

    function handlePress({ album, albumCover, artistId, artistName, name, songMediaId }: any) {
        navigation.navigate('LikedSongsPlayer', { albumName: album, artistName, artistId, coverSource: albumCover, songMediaId, songName: name });
    }

    useEffect(() => {
        async function fetchFanLikedSongs() {
            return await axios({
                method: 'GET',
                url: `${baseUrl}api/get-fan-liked-songs/${fanId}`,
            }).then(res => {
                const { fanLikedSongs } = res.data;
                setLikedSongs(fanLikedSongs);
                return fanLikedSongs;
            });
        }

        fetchFanLikedSongs();
    }, [fanLikedSongs]);

    return (
        <View style={styles.container}>
            <View style={styles.bottomPadding}>
                <View style={styles.topTextContainer}>
                    <AudioSwipeText 
                        customStyle={styles.topText}
                        size={25}
                        text='Audio You Like'
                        weight={900}
                    />
                </View>
                {likedSongs.length ? (
                    <SafeAreaView style={styles.audioSectionContainer}>
                        <ScrollView>
                            {likedSongs.map((song, index) => (
                                <View 
                                    style={styles.likedSongCardContainer}
                                >
                                    <LikedSongCard 
                                        album={song.album}
                                        albumCover={song.albumCover}
                                        artistName={song.artistName}
                                        handlePress={() => handlePress({ album: song.album, albumCover: song.albumCover, artistId: song.artistId, artistName: song.artistName, songMediaId: song.songMediaId, name: song.name  })}
                                        key={index}
                                        name={song.name}
                                        songId={song._id}
                                    />
                                </View>
                            ))}
                        </ScrollView>
                    </SafeAreaView>
                ): (
                    <View>
                        <AudioSwipeText 
                            text='There are no liked songs'
                            size={20}
                            weight={500}
                        />
                    </View>
                )}
            </View>
        </View>
    );
}

function useDataLayer({ navigation }: FanLoginProps) {
    const { fan } = useUserData();
    const { data: fanLikedSongs = [], isLoading } = useFetchFanLikedSongs();

    useEffect(() => {
        if (!fan) {
            navigation.navigate('FanLogin');
        }
    }, [fan]);

    return {
        fan,
        fanLikedSongs,
        isLoading,
    };
}

const styles = StyleSheet.create({
    audioSectionContainer: {
        alignItems: 'center',
        display: 'flex',
        height: '95%',
        paddingBottom: 100,
        paddingTop: 200,
        overflow: 'scroll',
    },
    bottomPadding: {
        paddingBottom: 30,
    },
    container: {
        alignItems: 'center',
        backgroundColor: colors.primary,
        height: '100%',
        paddingTop: 100,
        width: '100%',
    },
    likedSongCardContainer: {
        paddingBottom: 20,
    },
    topText: {
        fontFamily: 'VarelaRound_400Regular',
        paddingBottom: 20,
    },
    topTextContainer: {
        alignItems: 'center',
    },
});