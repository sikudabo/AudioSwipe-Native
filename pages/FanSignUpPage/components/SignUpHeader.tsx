import React from 'react';
import { AudioSwipeText, colors } from '../../../components';

type SignUpHeaderProps = {
    onPress: any;
    text: string;
};

export default function SignUpHeader({ onPress = () => {}, text }: SignUpHeaderProps) {
    return (
        <AudioSwipeText 
            color={colors.white}
            onPress={onPress}
            size={32} 
            text={text}
            weight={900}
        />
    );
}