import React from 'react';
import { StyleSheet, TextStyle } from 'react-native';
import { Button, ButtonProps } from 'react-native-paper';
import { colors } from './colors';

type AudioSwipeButtonProps = Omit<ButtonProps, 'buttonColor' | 'mode'> & {
    backgroundColor?: string;
    buttonHeight?: number;
    buttonType?: 'text' | 'outlined' | 'contained' | 'elevated' | 'contained-tonal';
    buttonWidth?: number;
    color?: string;
    customStyle?: any;
    onPress?: any;
    text: string;
    type?: string;
    weight?: string | number;
};

export default function AudioSwipeButton({
    backgroundColor = colors.secondary,
    buttonHeight = 50,
    buttonType = 'contained',
    buttonWidth = 100,
    color = colors.secondary,
    customStyle = {},
    onPress = () => {},
    text,
    type = 'button',
    weight = 900,
    ...props
}: AudioSwipeButtonProps) {
    const buttonStyles = StyleSheet.create({
        btnStyles: {
            borderRadius: 5,
            fontFamily: 'VarelaRound_400Regular',
            fontWeight: weight.toString() as TextStyle["fontWeight"],
            height: buttonHeight,
            width: buttonWidth,
        },
    });

    return (
        <Button 
            buttonColor={backgroundColor}
            mode={buttonType}
            onPress={onPress}
            rippleColor={backgroundColor}
            textColor={color}
            uppercase={false}
            style={buttonStyles.btnStyles}
            {...props}
        >
            {text}
        </Button>
    );
}

