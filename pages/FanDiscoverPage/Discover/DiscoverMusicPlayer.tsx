import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { AudioSwipeText, colors } from '../../../components';


export default function DiscoverMusicPlayer() {
    return (
        <View style={styles.container}>
            <Text>Music Player</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        textAlign: 'center',
        width: '100%',
    },
});