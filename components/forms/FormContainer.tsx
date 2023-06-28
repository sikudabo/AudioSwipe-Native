import React from 'react';
import { StyleSheet } from 'react-native';
import { Surface, Text } from 'react-native-paper';
import AudioSwipeButton from '../AudioSwipeButton';
import AudioSwipeText from '../AudioSwipeText';

export default function FormContainer({ children }: { children: React.ReactNode }) {
    return <FormContainer_DisplayLayer children={children} />;
}

function FormContainer_DisplayLayer({
    children,
}: { children: React.ReactNode }) {
    const formContainerStyles = StyleSheet.create({
        formContainer: {
            height: '100%',
            opacity: 0.75,
            paddingBottom: 20,
            paddingLeft: 5,
            paddingRight: 5,
            paddingTop: 25,
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
