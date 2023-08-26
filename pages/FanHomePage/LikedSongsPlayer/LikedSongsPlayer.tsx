import React from 'react';
import { StyleSheet, View } from 'react-native';
import LikedSongsPlayerCard from './components/LikedSongsPlayerCard';

type LikedSongsPlayerProps = {
    navigation: any;
    route: any;
};

export default function LikedSongsPlayer({ navigation, route }: LikedSongsPlayerProps) {
    const { album, albumName, artistName, coverSource, songName, songMediaId } = route.params;

    return (
        <View>
            <LikedSongsPlayerCard 
                albumName={albumName}
                artistName={artistName}
                coverSource={coverSource}
                songName={songName}
            />
        </View>
    );
}