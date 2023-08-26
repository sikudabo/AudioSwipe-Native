import React from 'react';
import { StyleSheet, View } from 'react-native';
import LikedSongsPlayerCard from './components/LikedSongsPlayerCard';
import { colors } from '../../../components/colors';

type LikedSongsPlayerProps = {
    navigation: any;
    route: any;
};

export default function LikedSongsPlayer({ navigation, route }: LikedSongsPlayerProps) {
    const { album, albumName, artistName, coverSource, songName, songMediaId } = route.params;

    return (
        <View style={styles.container}>
            <LikedSongsPlayerCard 
                albumName={albumName}
                artistName={artistName}
                coverSource={coverSource}
                songName={songName}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.primary,
        paddingTop: 30,
    },
});