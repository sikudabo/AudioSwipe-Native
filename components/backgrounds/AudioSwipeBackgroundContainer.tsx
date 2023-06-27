import React from 'react';
import { ImageBackground, StyleSheet, } from 'react-native';
import { ImageBackgroundProps } from '../../typings';
import { screenHeight, screenWidth } from '../../utils/constants';

/**
 * 
 * @param children React.ReactNode
 * @param customStyle custom css styling
 * @param paddingTop Controls upper padding. 
 * @param src Source for the background image. This will likely never be a URI
 * @returns The AudioSwipeBackgroundContainer component
 */
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