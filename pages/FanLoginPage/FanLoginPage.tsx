import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useForm } from 'react-hook-form';
import { AudioSwipeText, colors } from '../../components';

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
            <AudioSwipeText 
                customStyle={{
                    alignSelf: 'center',
                }}
                onPress={handleNavigate}
                size={32} 
                text="Login Page" 
                weight="normal"
            />
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
        backgroundColor: colors.secondary,
        height: '100%',
        opacity: 0.7,
        width: '100%',
    },
});