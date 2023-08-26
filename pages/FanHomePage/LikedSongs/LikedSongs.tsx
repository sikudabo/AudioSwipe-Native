import React, { useEffect } from 'react';
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

type LikedSongsDisplayLayerProps = {
    fan: FanType;
    fanLikedSongs: SongDataType[];
};

export default function LikedSongs({ navigation }: FanLoginProps) {
    return <LikedSongs_DisplayLayer {...useDataLayer({ navigation })} />;
}


function LikedSongs_DisplayLayer({ fan, fanLikedSongs }: LikedSongsDisplayLayerProps) {

    const { firstName } = fan;

    function handlePress() {
        console.log('Song card has been pressed');
    }

    return (
        <View style={styles.container}>
            <AudioSwipeText 
                size={20}
                text={`Audio ${firstName} likes`}
                weight={700}
            />
            <View>
                {fanLikedSongs.length ? (
                    <View style={styles.audioSectionContainer}>
                        {fanLikedSongs.map((song, index) => (
                            <View 
                                style={styles.likedSongCardContainer}
                            >
                                <LikedSongCard 
                                    album={song.album}
                                    albumCover={song.albumCover}
                                    artistName={song.artistName}
                                    handlePress={handlePress}
                                    key={index}
                                    name={song.name}
                                    songId={song._id}
                                />
                            </View>
                        ))}
                    </View>
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
    };
}

const styles = StyleSheet.create({
    audioSectionContainer: {
        alignItems: 'center',
        display: 'flex',
        height: '95%',
        paddingBottom: 20,
        paddingTop: 100,
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
        color: colors.white,
        fontWeight: '900',
    },
});