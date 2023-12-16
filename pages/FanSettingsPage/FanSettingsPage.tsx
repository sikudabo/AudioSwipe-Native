import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { View, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { ActivityIndicator, Avatar, Modal, Portal, Surface, TextInput } from 'react-native-paper';
import { AudioSwipeButton, AudioSwipeText, FormContainer } from '../../components';
import { colors } from '../../components/colors';
import { useShowDialog, useShowLoader, useShowModal, useUserData } from '../../hooks';
import { deleteNonBinaryData, postNonBinaryData } from '../../utils/api';
import { baseUrl } from '../../utils/constants';
import { checkValidEmail } from '../../utils/helpers';
import * as FileSystem from 'expo-file-system';

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
    isModalOpen: boolean;
    newEmail: string;
    newFirstName: string;
    newLastName: string;
    newPassword: string;
    sendContactMessage: () => void;
    takePicture: () => void;
    toggleModalVisible: () => void;
    updateContactMessage: (val: string) => void;
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
    isModalOpen,
    newEmail,
    newFirstName,
    newLastName,
    newPassword,
    sendContactMessage,
    takePicture,
    toggleModalVisible,
    updateContactMessage
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
            <View>
                <Portal>
                    <Modal contentContainerStyle={styles.contentContainer} dismissable={false} style={styles.modalContainer} visible={isModalOpen}>
                        <View style={styles.topModalTextContainer}>
                            <AudioSwipeText 
                                color={colors.primary}
                                text="Contact us with any feedback, questions or concerns!"
                                weight={900}
                            />
                        </View>
                        <View style={styles.contactInputContainer}>
                            <TextInput 
                                activeOutlineColor={colors.primary}
                                label="Message"
                                mode="outlined"
                                onChangeText={updateContactMessage}
                                placeholder="Messsge"
                                style={styles.multilineInput}
                                multiline
                            />
                        </View>
                        <View style={styles.buttonsContainer}>
                            <AudioSwipeButton 
                                backgroundColor={colors.primary}
                                color={colors.white}
                                onPress={sendContactMessage}
                                text="Submit"
                                fullWidth 
                            />
                        </View>
                        <View style={styles.buttonsContainer}>
                            <AudioSwipeButton 
                                backgroundColor={colors.hotPink}
                                color={colors.white}
                                onPress={toggleModalVisible}
                                text="Close"
                                fullWidth 
                            />
                        </View>
                    </Modal>
                </Portal>
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
                            onPress={toggleModalVisible}
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
    const [name, setName] = useState<string>('');
    const [uri, setUri] = useState<Blob | any>(null);
    const { isLoading, setIsLoading } = useShowLoader();
    const { isModalOpen, setModalVisible } = useShowModal();
    const [contactMessage, setContactMessge] = useState<string>('');

    function toggleModalVisible() {
        setModalVisible(!isModalOpen);
    }

    function updateContactMessage(val: string) {
        setContactMessge(val);
    }

    async function sendContactMessage() {
        setIsLoading(true);
        if (!contactMessage || contactMessage.trim().length < 1) {
            setIsLoading(false);
            setModalVisible(false);
            setDialogMessage('You must enter a message!');
            handleDialogMessageChange(true);
            return;
        }

        await postNonBinaryData({
            data: {
                email,
                subject: 'General Fan Contact',
                text: contactMessage,
            },
            url: 'api/general-contact',
        }).then(response => {
            setIsLoading(false);
            const { message } = response;
            setModalVisible(false);
            setDialogMessage(message);
            handleDialogMessageChange(true);
        }).catch(() => {
            setIsLoading(false);
            setDialogMessage('There was an error sending that message! Please try again.');
            handleDialogMessageChange(true);
        });
    }

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
        setIsLoading(true);
        await ImagePicker.requestCameraPermissionsAsync();
        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: false,
            aspect: [4, 3],
            quality: 1,
        });

        if (result.canceled) {
            setIsLoading(false);
            return;
        }

        const localUri = result.assets[0].uri;
        
        const filename = localUri.split('/').pop();

        setUri(localUri as any);
        setName(filename as string);
        const fd = new FormData();
        await FileSystem.uploadAsync(`${baseUrl}api/update-fan-avatar/${_id}/${avatar}`, localUri, {
            fieldName: 'avatar',
            httpMethod: 'POST',
            uploadType: FileSystem.FileSystemUploadType.MULTIPART,
        }).then((response: any) => {
            const { isSuccess, message, updatedFan } = JSON.parse(response.body);
            if (isSuccess) {
                setFan(updatedFan);
            } 

            setIsLoading(false);
            setDialogMessage(message);
            handleDialogMessageChange(true);
        }).catch(e => {
            setIsLoading(false);
            console.log('Upload error:', e.message);
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
        isModalOpen,
        newEmail,
        newFirstName,
        newLastName,
        newPassword,
        sendContactMessage,
        takePicture,
        toggleModalVisible,
        updateContactMessage,
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
    contactInputContainer: {
        paddingBottom: 20,
    },
    container: {
        height: '100%',
        paddingTop: 50,
        width: '100%',
    },
    contentContainer: {
        backgroundColor: colors.white,
        minHeight: 400,
        paddingBottom: 20,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 20,
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
    modalContainer: {
        alignItems: 'center',
        display: 'flex',
    },
    multilineInput: {
        maxHeight: 100,
        minHeight: 100,
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
    topModalTextContainer: {
        paddingBottom: 10,
    },
});