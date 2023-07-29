import React from 'react';
import { ImageBackground, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Surface } from 'react-native-paper';
import { AudioSwipeText } from '../../../../components';
import { colors } from '../../../../components/colors';


type DiscoverAudioCardProps = {
    handlePress: () => void;
    img: any;
    genre: string;
};


export default function DiscoverAudioCard({ genre, handlePress, img }: DiscoverAudioCardProps) {
    return (
       <TouchableOpacity
            onPress={handlePress}
            style={styles.cardContainer}
        >
             <Surface
                elevation={4}
                style={styles.imgContainer}
            >
                <ImageBackground
                    source={img}
                    style={styles.img}
                >
                    <AudioSwipeText
                        onPress={handlePress}
                        size={32}
                        text={genre}
                        weight={700}
                    />
                </ImageBackground>
            </Surface>
        </TouchableOpacity>
    );
}


const styles = StyleSheet.create({
    cardContainer: {
        alignItems: 'center',
        borderRadius: 5,
        display: 'flex',
        paddingTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
        textAlign: 'center',
        width: '100%',
    },
    imgContainer: {
        alignItems: 'center',
        backgroundColor: colors.primary,
        justifyContent: 'center',
        height: 300,
        width: 300,
    },
    img: {
        alignItems: 'center',
        display: 'flex',
        height: 300,
        justifyContent: 'center',
        opacity: 0.7,
        width: 300,
    },
});