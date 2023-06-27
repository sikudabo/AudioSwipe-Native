import React from 'react';
import { ImageBackground, StyleSheet, } from 'react-native';
import { ImageBackgroundProps } from '../../typings';
import { screenHeight, screenWidth } from '../../utils/constants';

export default function AudioSwipeBackgroundContainer({
    children,
    customStyle = {},
    paddingTop = 50,
    src,
}: ImageBackgroundProps) {
    const backgroundStyles = StyleSheet.create({
        img: {
            alignItems: 'center',
            paddingTop: paddingTop,
            height: screenHeight,
            width: screenWidth,
            ...customStyle,
        },
    });

    return (
        <ImageBackground source={src} style={backgroundStyles.img}>
            {children}
        </ImageBackground>
    );
}