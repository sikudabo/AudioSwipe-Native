import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import DiscoverAudioCard from './components/DiscoverAudioCard';
import DiscoverSection from './Layout/DiscoverSection';
import { colors } from '../../../components/colors';
import { audiobookGenres, musicGenres, podcastGenres } from '../../../utils/constants';
import ExperimentalSwipePlayer from '../../../ExperimentalSwipePlayer';

type DiscoverProps = {
    navigation: any;
}


export default function Discover({ navigation }: DiscoverProps) {
    const handlePress = (genre: string) => {
        navigation.navigate('DiscoverPlayer', { genre });
    }
    return (
        <SafeAreaView style={styles.container}>
            <DiscoverSection 
                headerText="Discover Audio"
            >
                {musicGenres.map((genre, index) => (
                    <DiscoverAudioCard
                        genre={genre.name}
                        handlePress={() => handlePress(genre.name)}
                        img={genre.cover}
                        key={index}
                    />
                ))}
                {podcastGenres.map((genre, index) => (
                    <DiscoverAudioCard 
                        genre={genre.name}
                        handlePress={() => handlePress(genre.name)}
                        img={genre.cover}
                        key={index}
                    />
                ))}
                {audiobookGenres.map((genre, index) => (
                    <DiscoverAudioCard 
                        genre={genre.name}
                        handlePress={() => handlePress(genre.name)}
                        img={genre.cover}
                        key={index}
                    />
                ))}
            </DiscoverSection>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: colors.hotPink,
        height: '100%',
        overflow: 'scroll',
        paddingTop: 100,
        textAlign: 'center',
        width: '100%',
    },
    divider: {
        paddingTop: 20,
    },
});