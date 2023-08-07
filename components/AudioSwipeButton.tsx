import React from 'react';
import { StyleSheet, TextStyle } from 'react-native';
import { Button, ButtonProps } from 'react-native-paper';
import { colors } from './colors';

type AudioSwipeButtonProps = Omit<ButtonProps, 'buttonColor' | 'children'> | any & {
    backgroundColor?: string;
    buttonHeight?: number;
    buttonType?: 'text' | 'outlined' | 'contained' | 'elevated' | 'contained-tonal';
    buttonWidth?: number;
    color?: string;
    customStyle?: any;
    fullWidth?: boolean;
    onPress?: any;
    text: string;
    type?: string;
    weight?: string | number;
};

/**
 * 
 * @param backgroundColor The background color of the button.
 * @param buttonHeight Height of the button. Default is 50 pixels. 
 * @param buttonType The button variant we want to use. The default value is contained.
 * @param buttonWidth The width of the button. The default is 100 pixels.
 * @param color The color of the button. 
 * @param customStyle A custom style object that can be added to customize the button. 
 * @param fullWidth A boolean determining if the button is fullWidth or not. 
 * @param onPress Function that handles press events. 
 * @param text The text that should be rendered within the button. 
 * @param type The type of button we are working with (for form submissions).
 * @param weight The font weight of the button. 
 * @param props react-native-paper Button properties. 
 * @returns A reactive native paper button with custom props. 
 */
export default function AudioSwipeButton({
    backgroundColor = colors.secondary,
    buttonHeight = 50,
    buttonType = 'contained',
    buttonWidth = 100,
    color = colors.secondary,
    customStyle = {},
    fullWidth = false,
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
            fontSize: 40,
            fontWeight: weight.toString() as TextStyle["fontWeight"],
            height: buttonHeight,
            paddingTop: 5,
            textAlign: 'center',
            width: fullWidth ? '100%' : buttonWidth,
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

