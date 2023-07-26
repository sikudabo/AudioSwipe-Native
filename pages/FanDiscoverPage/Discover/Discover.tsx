import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { colors } from '../../../components/colors';


export default function Discover() {
    return (
        <View style={styles.container}>
            <Text>Discover</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: colors.hotPink,
        height: '100%',
        paddingTop: 100,
        textAlign: 'center',
        width: '100%',
    },
});