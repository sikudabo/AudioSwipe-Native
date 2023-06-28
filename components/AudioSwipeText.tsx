import React from 'react';
import { StyleProp, StyleSheet, TextStyle } from 'react-native';
import { Text } from 'react-native-paper';
import { colors } from './colors';

type AudioSwipeTextProps = {
    color?: string;
    customStyle?: any;
    onPress?: any;
    size?: number;
    text: string;
    weight?: number | string;
};

/**
 * 
 * @param customStyle a custom style that can be added to the text component. 
 * @param size this handles the font size of the text.
 * @param text This is what is rendered as "children" within the component. 
 * @param weight this handles the font weight. 
 * @returns A react-native-paper text component that is reusable and customizable based on our styles. 
 */
export default function AudioSwipeText({
    color = colors.white,
    customStyle = {},
    onPress = () => {},
    size = 16,
    text,
    weight = 900,
}: AudioSwipeTextProps) {
    const textStyles = StyleSheet.create({
        text: {
            color: color as TextStyle["color"],
            fontFamily: 'VarelaRound_400Regular',
            fontSize: size,
            fontWeight: weight.toString() as TextStyle["fontWeight"],
            ...customStyle as object,
        },
    });

    return (
        <Text onPress={onPress} style={textStyles.text}>
            {text}
        </Text>
    );
}