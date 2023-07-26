import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { MD3DarkTheme, Text } from 'react-native-paper';
import { AudioSwipeText, colors } from '../../../components';
import { useGetUser, useUserData } from '../../../hooks';
import { FanType } from '../../../typings';

type LikedSongsDisplayLayerProps = {
    fan: FanType;
};

export default function LikedSongs() {
    return <LikedSongs_DisplayLayer {...useDataLayer()} />;
}


function LikedSongs_DisplayLayer({ fan }: LikedSongsDisplayLayerProps) {

    const { firstName } = fan;

    return (
        <View style={styles.container}>
            <Text>Welcome {firstName}!</Text>
        </View>
    );
}

function useDataLayer() {
    const { fan } = useUserData();

    return {
        fan,
    };
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingTop: 200,
        width: '100%',
    },
});