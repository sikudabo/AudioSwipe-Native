import React from 'react';
import { View, StyleSheet} from 'react-native';
import { Text } from 'react-native-paper';
import { AudioSwipeText } from '../../components';
import { colors } from '../../components/colors';

export default function FanSettingsPage() {
   return <FanSettingsPage_DisplayLayer {...useDataLayer} />;
}



function FanSettingsPage_DisplayLayer() {
    return (
        <View style={styles.container}>
            <View style={styles.settingsHeaderContainer}>
                <AudioSwipeText 
                    color={colors.primary}
                    size={40}
                    text="Settings"
                    weight={900}
                />
            </View>
        </View>
    );
}


function useDataLayer() {
    return {

    };
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        height: 1000,
    },
    settingsHeaderContainer: {
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        paddingTop: 100,
    },
});