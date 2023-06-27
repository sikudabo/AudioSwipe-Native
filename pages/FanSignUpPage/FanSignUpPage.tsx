import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useForm } from 'react-hook-form';
import { Text } from 'react-native-paper';
import { colors } from '../../components';
import MusicCelebrationImage from '../../assets/app-media/music-celebration.jpeg';

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.secondary,
        height: '100%',
        opacity: 0.7,
        width: '100%',
    },
});