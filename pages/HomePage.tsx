import React from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';

type HomePageProps = {
    navigation: any;
}

export default function HomePage({ navigation }: HomePageProps) {
    function handleClick() {
        navigation.navigate('HomePage');
    }
    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                Home Page
            </Text>
            <Button color="pink" title="navigate" onPress={() => navigation.navigate('ArtistPage', { name: 'Joe', age: '32' })} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        textAlign: 'center',
        width: '100%',
    },
    text: {
        fontSize: 30,
        fontWeight: '900',
    },
});