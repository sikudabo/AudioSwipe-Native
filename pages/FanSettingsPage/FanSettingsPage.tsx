import React, { useState } from 'react';
import { NavigationAction  } from '@react-navigation/native';
import { View, StyleSheet} from 'react-native';
import { Text, TextInput } from 'react-native-paper';
import { AudioSwipeButton, AudioSwipeText } from '../../components';
import { colors } from '../../components/colors';
import { useUserData } from '../../hooks';

type FanSettingsPageProps = {
    navigation: any;
};

type FanSettingsPageDisplayLayerProps = {
    handleLogout: () => void;
}

type DataLayerProps = FanSettingsPageProps;

export default function FanSettingsPage({ navigation }: FanSettingsPageProps) {
   return <FanSettingsPage_DisplayLayer {...useDataLayer({ navigation })} />;
}



function FanSettingsPage_DisplayLayer({
    handleLogout,
}: FanSettingsPageDisplayLayerProps) {
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
            <View 
                style={styles.buttonsContainer}
            >
                <AudioSwipeButton 
                    backgroundColor={colors.primary}
                    color={colors.white}
                    onPress={handleLogout}
                    text="Logout"
                    fullWidth
                />
            </View>
        </View>
    );
}


function useDataLayer({ navigation }: DataLayerProps) {

    const { clearFan, fan, setFan } = useUserData();
    const { email, firstName, lastName, password, phoneNumber } = fan;
    const [newEmail, setNewEmail] = useState(email);
    const [newFirstName, setNewFirstName] = useState(firstName);
    const [newLastName, setNewLastName] = useState(lastName);
    const [newPassword, setNewPassword] = useState(password);
    const [newPhoneoNumber, setNewPhoneNumber] = useState(phoneNumber);

    async function handleLogout() {
        setFan({} as any);
        const currentState = navigation.getState();
        console.log('The navigation state is:', currentState);
        navigation.navigate('Home');
    }
    return {
        handleLogout,
    };
}

const styles = StyleSheet.create({
    buttonsContainer: {
        display: 'flex',
        flexDirection: 'row',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 20,
    },
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