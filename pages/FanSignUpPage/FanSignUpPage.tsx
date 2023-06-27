import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useForm } from 'react-hook-form';
import { AudioSwipeText, colors } from '../../components';
import { NavigationType } from '../../typings';
import MusicCelebrationImage from '../../assets/app-media/music-celebration.jpeg';

export default function FanSignUpPage({ navigation }: NavigationType) {
    return <FanSignUpPage_DisplayLayer {...useDataLayer({ navigation })} />;
}

type FanSignUpPageDisplayLayerProps = {
    handleNavigation: () => void;
};

function FanSignUpPage_DisplayLayer({ handleNavigation }: FanSignUpPageDisplayLayerProps) {
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


function useDataLayer({ navigation }: NavigationType) {

    function handleNavigation() {
        navigation.navigate('FanLogin');
    }
    
    return {
        handleNavigation,
    }
}

const styles = StyleSheet.create({
    container: {
        bacground: `url(${MusicCelebrationImage})`,
        backgroundSize: 'cover',
        height: '100%',
        opacity: 0.7,
        width: '100%',
    },
});