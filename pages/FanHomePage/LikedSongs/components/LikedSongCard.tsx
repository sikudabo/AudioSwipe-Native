import React from 'react';
import { ImageBackground, StyleSheet, TouchableOpacity, View  } from 'react-native';
import { Surface } from 'react-native-paper';
import { AudioSwipeText } from '../../../../components';
import { colors } from '../../../../components/colors';
import { baseUrl } from '../../../../utils/constants';
import truncate from 'lodash/truncate';

type LikedSongCardProps = {
    album: string;
    albumCover: any;
    artistName: string;
    handlePress: () => void;
    name: string;
    songId: string;
};

export default function LikedSongCard({
    album,
    albumCover,
    artistName,
    handlePress,
    name,
    songId,
}: LikedSongCardProps)  {
    return (
        <TouchableOpacity 
            onPress={handlePress}
            style={styles.cardContainer}
        >
            <Surface 
                style={styles.cardRow}
            >
                <ImageBackground
                    source={{ uri: `${baseUrl}api/get-photo/${albumCover}` }}
                    style={styles.img}
                />
               <View style={styles.textRowContainer}>
                <AudioSwipeText 
                        customStyle={styles.textStyle}
                        onPress={handlePress}
                        text={truncate(artistName, { length: 22})}
                        size={20}
                        weight={500}
                    />
                    <AudioSwipeText
                        customStyle={styles.textStyleAlbum}
                        onPress={handlePress}
                        text={truncate(name, { length: 22 })}
                        size={15}
                        weight={200}
                    />
               </View>
            </Surface>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: colors.white,
        width: 350,
        height: 100,
    },
    cardRow: {
        display: 'flex',
        flexDirection: 'row',
    },
    img: {
        height: 100,
        width: 100,
    },
    textRowContainer: {
        display: 'flex',
        paddingLeft: 5,
        paddingTop: 5,
    },
    textStyle: {
        color: colors.primary,
        maxWidth: '100%',
    },
    textStyleAlbum: {
        color: colors.primary,
        maxWidth: '100%',
    },
});