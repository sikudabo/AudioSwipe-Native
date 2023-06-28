import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useForm } from 'react-hook-form';
import { AudioSwipeText, colors } from '../../components';
import { AudioSwipeBackgroundContainer } from '../../components/backgrounds';
import LoginHeader from './components/LoginHeader';
const ConcertImage = require('../../assets/app-media/photo_concert.jpeg');

export default function FanLoginPage({ navigation }: FanLoginProps) {
    return <FanLoginPage_DisplayLayer navigation={navigation} {...useDataLayer({ navigation })} />;
}

type FanLoginProps = {
    navigation: any
}

type FanLoginPage_DisplayLayerProps = FanLoginProps & {
    handleNavigate: () => void;
}

type UseDataLayerProps = {
    navigation: any;
};


function FanLoginPage_DisplayLayer({
    handleNavigate,
}: FanLoginPage_DisplayLayerProps) {
    return (
        <View style={styles.container}>
            <AudioSwipeBackgroundContainer
                src={ConcertImage}
            >
                <AudioSwipeText
                    onPress={handleNavigate}
                    size={32}
                    text="Log In"
                    weight={900}
                />
            </AudioSwipeBackgroundContainer>
        </View>
    );
}


function useDataLayer({ navigation }: UseDataLayerProps) {

    function handleNavigate() {
        navigation.navigate('FanSignUp');
    }

    return {
        handleNavigate,
    }
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        padding: 0,
        width: '100%',
    },
    headerContainer: {
        paddingBottom: 30,
    },
});