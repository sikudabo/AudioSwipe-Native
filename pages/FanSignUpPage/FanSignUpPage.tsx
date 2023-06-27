import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useForm } from 'react-hook-form';
import { AudioSwipeText, colors } from '../../components';

export default function FanSignUpPage() {
    return <FanSignUpPage_DisplayLayer {...useDataLayer()} />;
}


function FanSignUpPage_DisplayLayer() {
    return (
        <View style={styles.container}>
            <AudioSwipeText size={32} text="Hello, world!" weight={500} />
        </View>
    );
}


function useDataLayer() {
    return {

    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.secondary,
        height: '100%',
        opacity: 0.7,
        width: '100%',
    },
});