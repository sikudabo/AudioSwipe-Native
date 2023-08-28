import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { NavigationAction  } from '@react-navigation/native';
import { View, StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import { ActivityIndicator, Avatar, Surface, Text, TextInput } from 'react-native-paper';
import { AudioSwipeButton, AudioSwipeText, FormContainer } from '../../components';
import { colors } from '../../components/colors';
import { useShowDialog, useShowLoader, useUserData } from '../../hooks';
import { deleteNonBinaryData, postBinaryData, postNonBinaryData } from '../../utils/api';
import { baseUrl } from '../../utils/constants';
import { checkValidEmail } from '../../utils/helpers';

type FanSettingsPageProps = {
    navigation: any;
};

type FanSettingsPageDisplayLayerProps = {
    avatar: string;
    handleDeleteProfile: () => void;
    handleEmailChange: (val: string) => void;
    handleFirstNameChange: (val: string) => void;
    handleLastNameChange: (val: string) => void;
    handlePasswordChange: (val: string) => void;
    handleLogout: () => void;
    handleSubmit: () => void;
    isLoading: boolean;
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
    avatar,
    handleDeleteProfile,
    handleEmailChange,
    handleFirstNameChange,
    handleLastNameChange,
    handlePasswordChange,
    handleLogout,
    handleSubmit,
    isLoading,
    newEmail,
    newFirstName,
    newLastName,
    newPassword,
    takePicture
}: FanSettingsPageDisplayLayerProps) {

    if (isLoading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator animating={isLoading} color={colors.hotPink} />
            </View>
        );
    }
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
            <View style={styles.avatarContainer}>
                <Avatar.Image 
                    size={150}
                    source={{ uri: `${baseUrl}api/get-photo/${avatar}` }}
                />
            </View>
            <SafeAreaView style={styles.formSectionContainer}>
                <ScrollView>
                <Surface style={styles.formContainer} elevation={3}>
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
                            onPress={handleSubmit}
                            text="Update"
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
                    <View 
                        style={styles.buttonsContainer}
                    >
                        <AudioSwipeButton 
                            backgroundColor={colors.hotPink}
                            color={colors.white}
                            text="Contact"
                            fullWidth
                        />
                    </View> 
                    <View 
                        style={styles.buttonsContainer}
                    >
                        <AudioSwipeButton 
                            backgroundColor={colors.error}
                            color={colors.white}
                            onPress={handleDeleteProfile}
                            text="Delete Account"
                            fullWidth
                        />
                    </View> 
                </Surface>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}


function useDataLayer({ navigation }: DataLayerProps) {
    const { handleDialogMessageChange, setDialogMessage } = useShowDialog();
    const { clearFan, fan, setFan } = useUserData();
    const { avatar, email, firstName, _id, lastName, password, phoneNumber } = fan;
    const [newEmail, setNewEmail] = useState(email);
    const [newFirstName, setNewFirstName] = useState(firstName);
    const [newLastName, setNewLastName] = useState(lastName);
    const [newPassword, setNewPassword] = useState(password);
    const [newPhoneoNumber, setNewPhoneNumber] = useState(phoneNumber);
    const [name, setName] = useState('');
    const [uri, setUri] = useState<Blob | null>(null);
    const { isLoading, setIsLoading } = useShowLoader();

    async function handleDeleteProfile() {
        setIsLoading(true);

        await deleteNonBinaryData({
            data: {
                _id,
                avatarId: avatar,
            },
            url: 'api/delete-fan',
        }).then(response => {
            const { isSuccess, message } = response;

            if (isSuccess) {
                setDialogMessage(message);
                handleDialogMessageChange(true);
                setFan({} as any);
                setIsLoading(false);
                return;
            }

            setIsLoading(false);
            setDialogMessage('There was an error deleting your account. Please try again!');
            handleDialogMessageChange(true);
            return;
        }).catch(e => {
            setIsLoading(false);
            console.log('There was an error:', e.message);
            setDialogMessage('There was an error deleting your account. Please try again!');
            handleDialogMessageChange(true);
            return;
        });
    }

    function handleEmailChange(val: string) {
        setNewEmail(val.trim());
    }

    function handleFirstNameChange(val: string) {
        setNewFirstName(val.trim());
    }

    function handleLastNameChange(val: string) {
        setNewLastName(val.trim());
    }

    function handlePasswordChange(val: string) {
        setNewPassword(val);
    }

    async function handleSubmit() {
        setIsLoading(true);
        if (!newFirstName.trim()) {
            setDialogMessage('You must enter a first name!');
            handleDialogMessageChange(true);
            setIsLoading(false);
            return;
        } else if (!newLastName.trim()) {
            setDialogMessage('You must enter a last name!');
            handleDialogMessageChange(true);
            setIsLoading(false);
            return;
        } else if (!checkValidEmail(newEmail.trim())) {
            setDialogMessage('You must enter a valid email!');
            handleDialogMessageChange(true);
            setIsLoading(false);
            return;
        } else if (newPassword.length < 6) {
            setDialogMessage('Password must be at least 6 characters long!');
            handleDialogMessageChange(true);
            setIsLoading(false);
            return;
        }

        await postNonBinaryData({
            data: {
                firstName: newFirstName,
                lastName: newLastName,
                email: newEmail,
                _id,
                password: newPassword,
            },
            url: `api/update-fan`
        }).then(response => {
            const { isSuccess, message, updatedFan } = response;

            if (!isSuccess) {
                setDialogMessage('There was an error updating your settings. Please try again!');
                handleDialogMessageChange(true);
                setIsLoading(false);
                return;
            }

            setDialogMessage(message);
            handleDialogMessageChange(true);
            setFan(updatedFan);
            setIsLoading(false);
        }).catch(e => {
            console.log('Error updating fan:', e.message);
            setDialogMessage('There was an error updating your settings. Please try again!');
            handleDialogMessageChange(true);
            setIsLoading(false);
        });
    }

    async function takePicture() {
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
        await postBinaryData({
                data: fd,
                url: `api/update-fan-avatar/${_id}/${avatar}`,
            }).then(response => {
                const { isSuccess, message, updatedFan } = response;

                if (isSuccess) {
                    setFan(updatedFan);
                } 

                setDialogMessage(message);
                handleDialogMessageChange(true);
            }).catch(e => {
                console.log('Error updating fan avatar:', e.message);
                setDialogMessage('There was an error updating your Avatar!');
                handleDialogMessageChange(true);
            });
    }

    async function handleLogout() {
        setFan({} as any);
    }
    return {
        avatar,
        handleDeleteProfile,
        handleEmailChange,
        handleFirstNameChange,
        handleLastNameChange,
        handlePasswordChange,
        handleLogout,
        handleSubmit,
        isLoading,
        newEmail,
        newFirstName,
        newLastName,
        newPassword,
        takePicture,
    };
}

const styles = StyleSheet.create({
    avatarContainer: {
        alignItems: 'center',
        display: 'flex',
        paddingBottom: 20,
        paddingTop: 20,
    },
    buttonsContainer: {
        display: 'flex',
        flexDirection: 'row',
        paddingTop: 20,
    },
    container: {
        height: '100%',
        paddingTop: 50,
        width: '100%',
    },
    formContainer: {
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
        opacity: 0.8,
    },
    formSectionContainer: {
        flex: 1,
        height: '95%',
        paddingBottom: 20,
        overflow: 'scroll',
    },
    loaderContainer: {
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        paddingTop: 200,
    },
    settingsHeaderContainer: {
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        paddingBottom: 10,
    },
    textField: {
        marginTop: 20,
    },
});