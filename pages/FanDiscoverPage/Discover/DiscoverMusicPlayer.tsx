import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { Text } from 'react-native-paper';
import DiscoverPlayerCard from './components/DiscoverPlayerCard';
import { AudioSwipeText } from '../../../components';
import { colors } from '../../../components/colors';
import { useShowLoader } from '../../../hooks';
import { SongDataType } from '../../../typings';
import useFetchGenre from './hooks/useFetchGenre';

type DiscoverMusicPlayerProps = {
    route: any,
}

type DataLayerProps = {
    genre: string;
}

type DiscoverMusicPlayerDisplayLayerProps = Pick<DataLayerProps, 'genre'> & {
    data: SongDataType[];
    hasData: boolean;
    isLoading: boolean;
}

export default function DiscoverMusicPlayer({ route }: DiscoverMusicPlayerProps) {
    const { genre } = route.params;
    return <DiscoverMusicPlayer_DisplayLayer genre={genre} {...useDataLayer({ genre })} />
}

function DiscoverMusicPlayer_DisplayLayer({ data, genre, hasData, isLoading }: DiscoverMusicPlayerDisplayLayerProps) {
    if (isLoading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator animating={isLoading} color={colors.hotPink} />
            </View>
        );
    }
    else if ((typeof data !== 'undefined' && data.length === 0) || !hasData) {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>
                    No Audio Available
                </Text>
            </View>
        )
    } else {
        return (
            <DiscoverPlayerCard
                albumName={data[0].name}
                artistName={data[0].artistName}
                coverSource={data[0].albumCover}
                songMediaId={data[0].songMediaId}
                songName={data[0].name}
            />
        );
    }
}

function useDataLayer({ genre }: DataLayerProps) {
    const { data = [], isLoading } = useFetchGenre({ genre });
    return {
        data,
        hasData: data.length > 0,
        isLoading,
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: colors.primary,
        height: '100%',
        paddingTop: 100,
        textAlign: 'center',
        width: '100%',
    },
    text: {
        color: colors.white,
        fontFamily: 'VarelaRound_400Regular',
        fontSize: 42,
        fontWeight: '900',
    }
});