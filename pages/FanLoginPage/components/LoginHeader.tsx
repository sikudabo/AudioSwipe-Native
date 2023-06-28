import React from 'react';
import { AudioSwipeText, colors } from '../../../components';

type LoginHeaderProps = {
    onPress?: any;
};

export default function LoginHeader({ onPress = () => {} }: LoginHeaderProps) {
    return (
        <AudioSwipeText 
            color={colors.white}
            onPress={onPress}
            size={32} 
            text="Log In" 
            weight={900}
        />
    );
}