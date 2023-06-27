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
            <AudioSwipeText 
                customStyle={{
                    alignSelf: 'center',
                }}
                size={32} 
                text="Sign Up Page" 
                weight="normal"
            />
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