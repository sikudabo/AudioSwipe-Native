import React from 'react';
import { StyleSheet } from 'react-native';
import { Surface, Text } from 'react-native-paper';
import AudioSwipeButton from '../AudioSwipeButton';
import AudioSwipeText from '../AudioSwipeText';

export default function FormContainer({ children, opacity, topPadding }: { children: React.ReactNode; opacity?: number; topPadding?: number; }) {
    return <FormContainer_DisplayLayer children={children} opacity={opacity} topPadding={topPadding} />;
}

function FormContainer_DisplayLayer({
    children,
    opacity = 0.75,
    topPadding = 25,
}: { children: React.ReactNode; opacity?: number; topPadding?: number; }) {
    const formContainerStyles = StyleSheet.create({
        formContainer: {
            height: '100%',
            opacity,
            paddingBottom: 20,
            paddingLeft: 5,
            paddingRight: 5,
            paddingTop: topPadding,
            width: '100%',
        },
    });
    return (
        <Surface 
            elevation={3}
            mode="elevated"
            style={formContainerStyles.formContainer}
        >
            {children}
        </Surface>
    );
}
