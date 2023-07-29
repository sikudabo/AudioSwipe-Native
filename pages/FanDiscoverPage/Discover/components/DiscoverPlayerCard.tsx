import React from 'react';
import {
    ImageBackground,
    PanResponder,
    StyleSheet,
    View
} from 'react-native';
import {
    Avatar,
    Card,
    FAB,
    Text
} from 'react-native-paper';
import { Audio } from 'expo-av';
import { colors } from '../../../../components/';

const styles = StyleSheet.create({
    actionsContainer: {
        alignContent: 'center',
        alignItems: 'center',
        display: 'flex',
        gap: 10,
        flexDirection: 'row',
        paddingBottom: 50,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 30,
        width: '100%',
    },
    card: {
        backgroundColor: colors.white,
        height: 500,
        paddingBottom: 100,
        paddingLeft: 0,
        paddingRight: 0,
        width: 250,
    },
    container: {
        backgroundColor: colors.primary,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        height: 900,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 50,
        width: '100%',
    },
    contentSection: {
        alignSelf: 'center',
        paddingBottom: 20,
        paddingTop: 20,
    },
    img: {
        borderRadius: 5,
        height: '100%',
        opacity: 1,
        width: '100%',
    },
    imgContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 400,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 20,
        width: '100%',
    },
    playBtn: {
        backgroundColor: colors.primary,
        borderRadius: 50,
        color: colors.white,
        marginBottom: 10,
    },
    swipe: {
        paddingTop: 75,
        position: 'absolute',
    },
    text: {
        color: colors.primary,
        fontFamily: 'VarelaRound_400Regular',
        fontWeight: '900',
    },
    textEmpty: {
        color: colors.white,
        fontFamily: 'VarelaRound_400Regular',
        fontWeight: '900',
    },
});