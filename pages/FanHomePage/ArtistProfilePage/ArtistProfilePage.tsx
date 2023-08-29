import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import axios from 'axios';
import * as Linking from 'expo-linking';
import { ActivityIndicator, Avatar, Text, Surface } from 'react-native-paper';
import { baseUrl } from '../../../utils/constants';
import { useShowDialog, useShowLoader, useUserData } from '../../../hooks';
import { AudioSwipeButton, AudioSwipeText  } from '../../../components/';
import { colors } from '../../../components/colors';
import { SongDataType } from '../../../typings';
import LikedSongCard from '../LikedSongs/components/LikedSongCard';
import { postNonBinaryData } from '../../../utils/api';

type ArtistProfilePageProps = {
    navigation: any;
    route: any;
}

export default function ArtistProfilePage({ navigation, route }: ArtistProfilePageProps) {
    const { artistId } = route.params;
    const [currentArtist, setCurrentArtist] = useState<any>({});
    const [currentArtistSongs, setCurrentArtistSongs] = useState<SongDataType[]>([]);
    const [fetchError, setFetchError] = useState(false);
    const { isLoading, setIsLoading } = useShowLoader();
    const { fan, setFan} = useUserData();
    const { _id, subscribedArtists } = fan;
    const hasSubscription = subscribedArtists.filter((artist: any) => artist.artistId === artistId);
    const isSubscribed = hasSubscription.length > 0;
    const { handleDialogMessageChange, setDialogMessage } = useShowDialog();

    function handlePress({ album, albumCover, artistId, artistName, name, songMediaId, song }: any) {
        navigation.navigate('LikedSongsPlayer', { albumName: album, artistName, artistId, coverSource: albumCover, songMediaId, songName: name });
    }

    async function subscribeToArtist() {
        setIsLoading(true);
        await postNonBinaryData({
            data: {
                artistId,
                fanId: _id,
            },
            url: `api/add-subscriber`,
        }).then(response => {
            setIsLoading(false);
            const { isSuccess, updatedFan } = response;

            if (isSuccess) {
                setFan(updatedFan);
            }

            return
        }).catch(e => {
            setIsLoading(false);
            setDialogMessage('There was an error subscribing to this artist. Please try again!');
            handleDialogMessageChange(true);
        });
    }

    async function unSubscribeFromArtist() {
        console.log('You are no longer subscribed');
    }
    
    useEffect(() => {
        async function fetchArtist() {
            setIsLoading(true);
            return await axios({
                method: 'GET',
                url: `${baseUrl}api/fetch-artist/${artistId}`,
            }).then(response => {
                setIsLoading(false);
                const { artist, artistSongs, isSuccess } = response.data;
                setCurrentArtistSongs(artistSongs);

                if (isSuccess) {
                    setCurrentArtist(artist);
                    return;
                }

                setFetchError(true);
            }).catch(() => {
                setIsLoading(false);
                setFetchError(true);
                return;
            });
        }

        fetchArtist();
    }, [route.params]);

    if (isLoading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator animating={isLoading} color={colors.hotPink} />
            </View>
        );
    } 

    if (fetchError) {
        <View style={styles.container}>
            <Text>
                Error
            </Text>
        </View>
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.artistAvatarContainer}>
                    <Avatar.Image 
                        size={150}
                        source={{ uri: `${baseUrl}api/get-photo/${currentArtist.avatar}` }}
                    />
                </View>
                <View style={styles.artistNameContainer}>
                    <AudioSwipeText 
                        color={colors.primary}
                        size={32}
                        text={currentArtist.artistName}
                        weight={900}
                    />
                </View>
                <View style={styles.locationSection}>
                    <AudioSwipeText 
                        color={colors.primary}
                        text={`${currentArtist.city}, ${currentArtist.state}`}
                    />
                </View>
                <View style={styles.bioSection}>
                    <AudioSwipeText 
                        color={colors.primary}
                        text={currentArtist.bio}
                    />
                </View>
                <View style={styles.subscribeSection}>
                    <AudioSwipeButton
                        backgroundColor={colors.primary}
                        color={colors.white}
                        onPress={isSubscribed ? unSubscribeFromArtist : subscribeToArtist}
                        text={isSubscribed ? 'Unsubscribe' : 'Subscribe'}
                        fullWidth
                    />
                </View>
                {currentArtist.spotifyLink &&
                    <View style={styles.subscribeSection}>
                        <AudioSwipeButton
                            backgroundColor={colors.success}
                            color={colors.white}
                            icon="spotify"
                            onPress={() => Linking.openURL(currentArtist.spotifyLink)}
                            text="Spotify"
                            fullWidth
                        />
                    </View>
                }
               {currentArtist.youtubeLink &&
                     <View style={styles.subscribeSection}>
                        <AudioSwipeButton
                            backgroundColor={colors.error}
                            color={colors.white}
                            icon="youtube"
                            onPress={() => Linking.openURL(currentArtist.youtubeLink)}
                            text="YouTube"
                            fullWidth
                        />
                    </View>
               }
                {currentArtist.soundcloudLink &&
                    <View style={styles.subscribeSection}>
                        <AudioSwipeButton
                            backgroundColor={colors.warning}
                            color={colors.white}
                            icon="soundcloud"
                            onPress={() => Linking.openURL(currentArtist.soundcloudLink)}
                            text="Soundcloud"
                            fullWidth
                        />
                    </View>
                }
                {isSubscribed &&
                    <View style={styles.artistSongsSection}>
                        {currentArtistSongs.map((song, index) => (
                            <View style={styles.cardContainer}>
                                <LikedSongCard 
                                    album={song.album}
                                    albumCover={song.albumCover}
                                    artistName={song.album}
                                    handlePress={() => handlePress({ album: song.album, albumCover: song.albumCover, artistId: song.artistId, artistName: song.artistName, name: song.name, songMediaId: song.songMediaId, song })}
                                    key={index}
                                    name={song.name}
                                    songId={song._id}
                                />
                            </View>
                        ))}
                    </View>
                }
            </ScrollView>
        </SafeAreaView>
    );

}

const styles = StyleSheet.create({
    artistAvatarContainer: {
        alignItems: 'center',
        display: 'flex',
        paddingBottom: 20,
        paddingTop: 40,
    },
    artistNameContainer: {
        alignItems: 'center',
        display: 'flex',
    },
    artistSongsSection: {
        alignItems: 'center',
        width: '100%',
        paddingRight: 10,
        paddingTop: 20,
    },
    bioSection: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 20,
    },
    cardContainer: {
        paddingBottom: 20,
    },
    container: {
        backgroundColor: colors.white,
        height: '100%',
        paddingTop: 150,
    },
    locationSection: {
        alignItems: 'center',
        paddingTop: 20,
    },
    loaderContainer: {
        alignItems: 'center',
        display: 'flex',
        paddingTop: 200,
        justifyContent: 'center',
    },
    subscribeSection: {
        alignItems: 'center',
        display: 'flex',
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 20,
    },
});
