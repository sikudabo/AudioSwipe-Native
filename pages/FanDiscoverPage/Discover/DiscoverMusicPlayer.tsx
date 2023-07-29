import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { Text } from 'react-native-paper';
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
    isLoading: boolean;
}

export default function DiscoverMusicPlayer({ route }: DiscoverMusicPlayerProps) {
    const { genre } = route.params;
    return <DiscoverMusicPlayer_DisplayLayer genre={genre} {...useDataLayer({ genre })} />
}

function DiscoverMusicPlayer_DisplayLayer({ data, genre, isLoading }: DiscoverMusicPlayerDisplayLayerProps) {
    if (isLoading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator animating={isLoading} color={colors.hotPink} />
            </View>
        );
    }
    return (
        <View style={styles.container}>
            <Text>{genre}</Text>
        </View>
    );
}

function useDataLayer({ genre }: DataLayerProps) {
    const { data, isLoading } = useFetchGenre({ genre });
    return {
        data,
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
});