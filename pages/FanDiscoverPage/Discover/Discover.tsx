import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { AudioSwipeText, colors } from '../../../components';


export default function Discover() {
    return (
        <View style={styles.container}>
            <Text>Discover</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        textAlign: 'center',
        width: '100%',
    },
});