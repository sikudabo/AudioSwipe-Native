import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { NavigationAction  } from '@react-navigation/native';
import { View, StyleSheet} from 'react-native';
import { Text, TextInput } from 'react-native-paper';
import { AudioSwipeButton, AudioSwipeText } from '../../components';
import { colors } from '../../components/colors';
import { useShowLoader, useUserData } from '../../hooks';

type FanSettingsPageProps = {
    navigation: any;
};

type FanSettingsPageDisplayLayerProps = {
    handleEmailChange: (val: string) => void;
    handleFirstNameChange: (val: string) => void;
    handleLastNameChange: (val: string) => void;
    handlePasswordChange: (val: string) => void;
    handleLogout: () => void;
    newEmail: string;
    newFirstName: string;
    newLastName: string;
    newPassword: string;
    takePicture: () => void;
}

type DataLayerProps = FanSettingsPageProps;

export default function FanSettingsPage({ navigation }: FanSettingsPageProps) {
   return <FanSettingsPage_DisplayLayer {...useDataLayer({ navigation })} />;
}



function FanSettingsPage_DisplayLayer({
    handleEmailChange,
    handleFirstNameChange,
    handleLastNameChange,
    handlePasswordChange,
    handleLogout,
    newEmail,
    newFirstName,
    newLastName,
    newPassword,
    takePicture
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
            <View style={styles.formContainer}>
                <TextInput 
                    activeOutlineColor={colors.primary}
                    label="First Name"
                    left={<TextInput.Icon icon="account" />}
                    mode="outlined"
                    onChangeText={handleFirstNameChange}
                    placeholder="First Name"
                    value={newFirstName}
                />
                <TextInput 
                    activeOutlineColor={colors.primary}
                    label="Last Name"
                    left={<TextInput.Icon icon="account" />}
                    mode="outlined"
                    onChangeText={handleLastNameChange}
                    placeholder="Last Name"
                    style={styles.textField}
                    value={newLastName}
                />
                <TextInput 
                    activeOutlineColor={colors.primary}
                    label="Email"
                    left={<TextInput.Icon icon="email" />}
                    style={styles.textField}
                    value={newEmail}
                    onChangeText={handleEmailChange}
                    mode="outlined"
                    outlineColor={colors.primary}
                    placeholder="Email"
                />
                <TextInput 
                    activeOutlineColor={colors.primary}
                    label="Password"
                    left={<TextInput.Icon icon="lock" />}
                    style={styles.textField}
                    onChangeText={handlePasswordChange}
                    value={newPassword}
                    mode="outlined"
                    outlineColor={colors.primary}
                    placeholder="Password"
                    secureTextEntry 
                />
            </View>
            <View style={styles.buttonsContainer}>
                <AudioSwipeButton 
                    backgroundColor={colors.primary}
                    color={colors.white}
                    icon="camera"
                    onPress={takePicture}
                    text="Avatar"
                    fullWidth 
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
    const [name, setName] = useState('');
    const [uri, setUri] = useState<Blob | null>(null);
    const { setIsLoading } = useShowLoader();

    function handleEmailChange(val: string) {
        setNewEmail(val);
    }

    function handleFirstNameChange(val: string) {
        setNewFirstName(val.trim());
    }

    function handleLastNameChange(val: string) {
        setNewLastName(val);
    }

    function handlePasswordChange(val: string) {
        setNewPassword(newPassword);
    }

    async function takePicture() {
        setIsLoading(true);
        await ImagePicker.requestCameraPermissionsAsync();
        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: false,
            aspect: [16, 9],
        });

        if (result.canceled) {
            return;
        }

        const fd = new FormData();

        const localUri = result.assets[0].uri;
        
        const filename = localUri.split('/').pop();

        setUri(localUri as any);
        setName(filename as string);

        fd.append('avatar', { name, uri, type: 'image' } as any);
    }

    async function handleLogout() {
        setFan({} as any);
        const currentState = navigation.getState();
        console.log('The navigation state is:', currentState);
        navigation.navigate('Home');
    }
    return {
        handleEmailChange,
        handleFirstNameChange,
        handleLastNameChange,
        handlePasswordChange,
        handleLogout,
        newEmail,
        newFirstName,
        newLastName,
        newPassword,
        takePicture,
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
    formContainer: {
        paddingLeft: 10,
        paddingRight: 10,
    },
    settingsHeaderContainer: {
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        paddingTop: 100,
    },
    textField: {
        marginTop: 20,
    },
});