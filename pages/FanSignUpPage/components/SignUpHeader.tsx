import React from 'react';
import { AudioSwipeText, colors } from '../../../components';

type SignUpHeaderProps = {
    onPress: any;
};

export default function SignUpHeader({ onPress = () => {} }: SignUpHeaderProps) {
    return (
        <AudioSwipeText 
            color={colors.white}
            onPress={onPress}
            size={32} 
            text="Sign Up" 
            weight={900}
        />
    );
}