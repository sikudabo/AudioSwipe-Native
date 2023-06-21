import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, View, Text, StyleSheet } from 'react-native';

const Stack = createNativeStackNavigator();

type HomePageProps = {
    navigation: any;
}

function AnotherComponent() {
    return (
        <View>
            Another component
        </View>
    );
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
            <Button color="pink" title="navigate" onPress={() => navigation.navigate('ArtistPage', { screen: 'AnotherComponent' })} />
            <Stack.Screen 
                component={AnotherComponent}
                name="Another"
            />
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