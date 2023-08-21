import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { MD3DarkTheme, Text } from 'react-native-paper';
import { AudioSwipeText, colors } from '../../../components';
import { useGetUser, useUserData } from '../../../hooks';
import { FanType } from '../../../typings';
import { FanLoginProps } from '../../FanLoginPage/FanLoginPage';

type LikedSongsDisplayLayerProps = {
    fan: FanType;
};

export default function LikedSongs({ navigation }: FanLoginProps) {
    return <LikedSongs_DisplayLayer {...useDataLayer({ navigation })} />;
}


function LikedSongs_DisplayLayer({ fan }: LikedSongsDisplayLayerProps) {

    const { firstName } = fan;

    return (
        <View style={styles.container}>
            <Text>Welcome {firstName}!</Text>
        </View>
    );
}

function useDataLayer({ navigation }: FanLoginProps) {
    const { fan } = useUserData();

    useEffect(() => {
        if (!fan) {
            navigation.navigate('FanLogin');
        }
    }, [fan]);

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