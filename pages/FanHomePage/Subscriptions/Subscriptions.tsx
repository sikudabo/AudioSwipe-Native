import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { AudioSwipeText, colors } from '../../../components';


export default function Subscriptions() {
    return (
        <View style={styles.container}>
            <Text>Subscriptions</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        textAlign: 'center',
        width: '100%',
    },
});
