import React from 'react';
import { Button, Image, StyleSheet, View } from 'react-native';


type ArtistPageProps = {
    navigation: any;
    route: any;
}

export default function ArtistPage({ route, navigation }: ArtistPageProps) {
    const { age, name } = route.params;
    console.log('The age is', age, 'and the name is', name);
    return (
        <View style={styles.container}>
            <Image source={require('../assets/app-media/audio-swipe-banner.jpeg')} style={styles.img} />
            <Button color="green" title="Navigate" onPress={() => navigation.navigate('HomePage')} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width:'100vh',
        textAlign: 'center',
        paddingTop: 50,
    },
    img: {
        height: 200,
        width: 200,
    },
});