import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useForm } from 'react-hook-form';
import SignUpHeader from './components/SignUpHeader';
import { AudioSwipeText, colors } from '../../components';
import { NavigationType } from '../../typings';
import { AudioSwipeBackgroundContainer } from '../../components/backgrounds';
const MusicCelebrationImage = require('../../assets/app-media/music-celebration.jpeg');

export default function FanSignUpPage({ navigation }: NavigationType) {
    return <FanSignUpPage_DisplayLayer {...useDataLayer({ navigation })} />;
}

type FanSignUpPageDisplayLayerProps = {
    handleNavigation: () => void;
};

function FanSignUpPage_DisplayLayer({ handleNavigation }: FanSignUpPageDisplayLayerProps) {
    return (
        <View style={styles.container}>
            <AudioSwipeBackgroundContainer
                src={MusicCelebrationImage}
            >
               <SignUpHeader onPress={handleNavigation} />
            </AudioSwipeBackgroundContainer>
        </View>
    );
}


function useDataLayer({ navigation }: NavigationType) {

    function handleNavigation() {
        navigation.navigate('FanLogin');
    }
    
    return {
        handleNavigation,
    };
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
    },
});