import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { AudioSwipeButton, AudioSwipeText, colors, FormContainer } from '../../components';
import { AudioSwipeBackgroundContainer } from '../../components/backgrounds';
import LoginHeader from './components/LoginHeader';
import SignUpHeader from '../FanSignUpPage/components/SignUpHeader';
import { useShowDialog, useStoreUser, useUserData } from '../../hooks';
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
    handleNavigate: () => void;
    handlePasswordChange: (password: string) => void;
    handleSubmit: () => void;
    password: string;
}

type UseDataLayerProps = {
    navigation: any;
};


function FanLoginPage_DisplayLayer({
    email,
    handleEmailChange,
    handleNavigate,
    handlePasswordChange,
    handleSubmit,
    password,
}: FanLoginPage_DisplayLayerProps) {
    return (
        <View style={styles.container}>
            <AudioSwipeBackgroundContainer
                src={ConcertImage}
            >
                <View style={styles.headerContainer}>
                    <SignUpHeader onPress={() => {}} text="Log In" />
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
        });
    }

    function handleNavigate() {
        navigation.navigate('FanSignUp');
    }

    return {
        email,
        handleEmailChange,
        handleNavigate,
        handlePasswordChange,
        handleSubmit,
        password,
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
    container: {
        height: '100%',
        padding: 0,
        width: '100%',
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
    textInput: {
        width: '100%',
    },
    topTextInputContainer: {
        paddingTop: 20,
    }
});