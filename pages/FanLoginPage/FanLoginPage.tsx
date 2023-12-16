import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { ActivityIndicator, Modal, Portal, TextInput } from 'react-native-paper';
import { colors } from '../../components/colors';
import { AudioSwipeButton, AudioSwipeText, FormContainer } from '../../components';
import { AudioSwipeBackgroundContainer } from '../../components/backgrounds';
import LoginHeader from './components/LoginHeader';
import SignUpHeader from '../FanSignUpPage/components/SignUpHeader';
import { useShowDialog, useShowLoader, useShowModal, useStoreUser, useUserData } from '../../hooks';
import { checkValidEmail } from '../../utils/helpers';
import { postNonBinaryData } from '../../utils/api';
const ConcertImage = require('../../assets/app-media/music-fun.jpeg');

export default function FanLoginPage({ navigation }: FanLoginProps) {
    return <FanLoginPage_DisplayLayer navigation={navigation} {...useDataLayer({ navigation })} />;
}

export type FanLoginProps = {
    navigation: any
}

type FanLoginPage_DisplayLayerProps = FanLoginProps & {
    email: string;
    handleEmailChange: (email: string) => void;
    handleForgottenEmailUpdate: (val: string) => void;
    handleForgotSubmit: () => void;
    handleNavigate: () => void;
    handlePasswordChange: (password: string) => void;
    handleSubmit: () => void;
    isLoading: boolean;
    isModalOpen: boolean;
    password: string;
    toggleModal: () => void;
}

type UseDataLayerProps = {
    navigation: any;
};


function FanLoginPage_DisplayLayer({
    email,
    handleEmailChange,
    handleForgottenEmailUpdate,
    handleForgotSubmit,
    handleNavigate,
    handlePasswordChange,
    handleSubmit,
    isLoading,
    isModalOpen,
    password,
    toggleModal,
}: FanLoginPage_DisplayLayerProps) {
    if (isLoading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator animating={isLoading} color={colors.hotPink} />
            </View>
        )
    }
    return (
        <View style={styles.container}>
            <AudioSwipeBackgroundContainer
                src={ConcertImage}
            >
                <View style={styles.headerContainer}>
                    <SignUpHeader onPress={() => {}} text="Log In" />
                </View>
                <View>
                    <Portal>
                        <Modal contentContainerStyle={styles.contentContainer} dismissable={false} style={styles.modalContainer} visible={isModalOpen}>
                            <View style={styles.topModalTextContainer}>
                                <AudioSwipeText 
                                    color={colors.primary}
                                    text="We can fix this. Enter an email for us to reach you at and we will be in touch soon!"
                                    weight={900}
                                />
                            </View>
                            <View style={styles.forgotInputContainer}>
                                <TextInput 
                                    activeOutlineColor={colors.primary}
                                    label="Email"
                                    left={<TextInput.Icon icon="email" />}
                                    style={styles.textInput}
                                    mode="outlined"
                                    onChangeText={handleForgottenEmailUpdate}
                                    outlineColor={colors.primary}
                                    placeholder="Email"
                                />
                            </View>
                            <View>
                                <AudioSwipeButton 
                                    backgroundColor={colors.primary}
                                    color={colors.white}
                                    customStyle={{
                                        marginTop: 1,
                                    }}
                                    onPress={handleForgotSubmit}
                                    text="Submit"
                                    fullWidth
                                />
                            </View>
                            <View style={styles.closeModalButtonContainer}>
                                <AudioSwipeButton 
                                    backgroundColor={colors.hotPink}
                                    color={colors.white}
                                    customStyle={{
                                        marginTop: 1,
                                    }}
                                    onPress={toggleModal}
                                    text="Close"
                                    fullWidth
                                />
                            </View>
                        </Modal>
                    </Portal>
                </View>
                <SafeAreaView style={styles.formWrapper}>
                    <ScrollView>
                        <FormContainer opacity={0.75} topPadding={40}>
                            <TextInput 
                                activeOutlineColor={colors.secondary}
                                label="Email"
                                left={<TextInput.Icon icon="email" />}
                                style={styles.textInput}
                                mode="outlined"
                                onChangeText={handleEmailChange}
                                outlineColor={colors.secondary}
                                placeholder="Email"
                                value={email}
                            />
                            <TextInput 
                                activeOutlineColor={colors.secondary}
                                label="Password"
                                left={<TextInput.Icon icon="lock" />}
                                style={styles.bottomInputs}
                                mode="outlined"
                                onChangeText={handlePasswordChange}
                                outlineColor={colors.secondary}
                                placeholder="Password"
                                value={password}
                                secureTextEntry 
                            />
                            <View style={styles.buttonsContainer}>
                                <AudioSwipeButton 
                                    color={colors.white}
                                    customStyle={{
                                        marginTop: 1,
                                    }}
                                    onPress={handleSubmit}
                                    text="Login"
                                    fullWidth
                                />
                            </View>
                            <View style={styles.buttonsContainer}>
                                <AudioSwipeButton
                                    backgroundColor={colors.hotPink}
                                    color={colors.white}
                                    customStyle={{
                                        marginTop: 1,
                                    }}
                                    onPress={handleNavigate}
                                    text="Sign Up"
                                    fullWidth
                                />
                            </View>
                            <View style={styles.buttonsContainer}>
                                <AudioSwipeButton 
                                    backgroundColor={colors.primary}
                                    color={colors.white}
                                    customStyle={{
                                        marginTop: 1,
                                    }}
                                    onPress={toggleModal}
                                    text="Forgot?"
                                    fullWidth
                                />
                            </View>
                        </FormContainer>
                    </ScrollView>
                </SafeAreaView>
            </AudioSwipeBackgroundContainer>
        </View>
    );
}


function useDataLayer({ navigation }: UseDataLayerProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { handleDialogMessageChange, setDialogMessage } = useShowDialog();
    const { fan, setFan } = useUserData();
    const { firstName } = fan;
    const [forgotEmail, setForgotEmail] = useState('');
    const { isModalOpen, setModalVisible } = useShowModal();
    const { isLoading, setIsLoading } = useShowLoader();

    useEffect(() => {
        if (typeof firstName !== 'undefined') {
            navigation.navigate('Dashboard');
        }
    }, [fan]);
    

    function handleEmailChange(email: string) {
        setEmail(email.trim());
    }

    function handlePasswordChange(password: string) {
        setPassword(password);
    }

    async function handleForgotSubmit() {
        setIsLoading(true);
        if (!checkValidEmail(forgotEmail)) {
            setIsLoading(false);
            setDialogMessage('Please enter a valid email.');
            handleDialogMessageChange(true);
            return;
        }

        await postNonBinaryData({
            data: {
                email: forgotEmail,
            },
            url: 'api/forgot-login',
        }).then(response => {
            const { message } = response;
            setIsLoading(false);
            setModalVisible(false);
            setDialogMessage(message);
            handleDialogMessageChange(true);
        }).catch(() => {
            setIsLoading(false);
            setModalVisible(false);
            setDialogMessage('There was an error sending your email! Please try again.');
            handleDialogMessageChange(true);
        });
    }

    async function handleSubmit() {
        if (!checkValidEmail(email)) {
            setDialogMessage('Please enter a valid email');
            handleDialogMessageChange(true);
            return;
        }

        if (!password) {
            setDialogMessage('Please enter a password');
            handleDialogMessageChange(true);
            return;
        }

        await postNonBinaryData({
            data: { email, password },
            url: 'api/login-fan',
        }).then(response => {
            const { message, success, user } = response;

            if (success === false) {
                setDialogMessage(message);
                handleDialogMessageChange(true);
                return;
            }

            useStoreUser(user);
            let fan = user;
            fan.isLoggedIn = true;
            setFan(fan);
            setDialogMessage(message);
            handleDialogMessageChange(true);
            navigation.navigate('Dashboard');
            return;
        }).catch(e => {
            console.log(e.message);
        })
    }

    function handleNavigate() {
        navigation.navigate('FanSignUp');
    }

    function handleForgottenEmailUpdate(val: string) {
        setForgotEmail(val);
    }

    function toggleModal() {
        setModalVisible(!isModalOpen);
    }

    return {
        email,
        handleEmailChange,
        handleForgottenEmailUpdate,
        handleForgotSubmit,
        handleNavigate,
        handlePasswordChange,
        handleSubmit,
        isLoading,
        isModalOpen,
        password,
        toggleModal,
    }
}

const styles = StyleSheet.create({
    bottomInputs: {
        marginTop: 20,
        width: '100%',
    },
    buttonsContainer: {
        display: 'flex',
        flexDirection: 'row',
        paddingTop: 20,
    },
    closeModalButtonContainer: {
        paddingTop: 10,
    },
    container: {
        height: '100%',
        padding: 0,
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
    forgotInputContainer: {
        paddingBottom: 20,
    },
    formWrapper: {
        flex: 1,
        height: '50%',
        paddingLeft: 10,
        paddingRight: 10,
        width: '95%',
    },
    headerContainer: {
        paddingBottom: 30,
    },
    loaderContainer: {
        alignItems: 'center',
        display: 'flex',
        paddingTop: 200,
        justifyContent: 'center',
    },
    modalContainer: {
        alignItems: 'center',
        display: 'flex',
    },
    textInput: {
        width: '100%',
    },
    topModalTextContainer: {
        paddingBottom: 10,
    },
    topTextInputContainer: {
        paddingTop: 20,
    },
});