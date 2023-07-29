import React, { useEffect, useRef, useState } from 'react';
import { 
    KeyboardAvoidingView,
    View, 
    SafeAreaView,
    ScrollView,
    StyleSheet,
} from 'react-native';
import SignUpHeader from './components/SignUpHeader';
import { AudioSwipeButton, AudioSwipeText, FormContainer, colors } from '../../components';
import { NavigationType } from '../../typings';
import { AudioSwipeBackgroundContainer } from '../../components/backgrounds';
import { HelperText, RadioButton, TextInput } from 'react-native-paper';
const MusicCelebrationImage = require('../../assets/app-media/music-fun.jpeg');
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import { useShowDialog, useUserData } from '../../hooks';
import { checkValidAge, checkValidEmail, formatUserBirthday } from '../../utils/helpers';
import { putBinaryData } from '../../utils/api';
import FormData from 'form-data';
/**
 * 
 * @param navigation 
 * @returns The fan sign up page display layer 
 */
export default function FanSignUpPage({ navigation }: NavigationType) {
    return <FanSignUpPage_DisplayLayer {...useDataLayer({ navigation })} />;
}

type FanSignUpPageDisplayLayerProps = {
    birthday: Date;
    email: string;
    formatPhoneNumber: (newValue: string) => void;
    handleBirthdayChange: (event: DateTimePickerEvent, date?: any) => void;
    handleNavigation: () => void;
    handleSubmit: () => void;
    gender: string;
    password: string;
    phoneNumber: string;
    phoneRef: any;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    setFirstName: React.Dispatch<React.SetStateAction<string>>;
    setLastName: React.Dispatch<React.SetStateAction<string>>;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
    showBirthdayPicker: boolean;
    takePicture: () => void;
    toggleDateTimePicker: (isOpen: boolean) => void;
    toggleGender: (gender: string) => void;
};
/**
 * 
 * @param handleNavigation a function to handle navigating to a new page. 
 * @returns The fan sign up form
 */
function FanSignUpPage_DisplayLayer({ 
    birthday,
    email,
    handleBirthdayChange,
    handleNavigation,
    handleSubmit,
    formatPhoneNumber,
    gender,
    password,
    phoneNumber,
    phoneRef,
    setEmail,
    setFirstName,
    setLastName,
    setPassword,
    showBirthdayPicker,
    takePicture,
    toggleDateTimePicker,
    toggleGender,
}: FanSignUpPageDisplayLayerProps) {
    const [isOpen, setIsOpen] = useState(false);

    function handleFirstNameChange(value: string) {
        setFirstName(value);
    }

    function handleLastNameChange(value: string) {
        setLastName(value);
    }

    function handleEmailChange(value: string) {
        setEmail(value.trim());
    }

    function handlePasswordChange(value: string) {
        setPassword(value);
    }

    return (
        <View style={styles.container}>
            <AudioSwipeBackgroundContainer
                src={MusicCelebrationImage}
            >
               <View style={styles.headerContainer}>
                    <SignUpHeader onPress={handleNavigation} text="Sign Up" />
               </View>
               <SafeAreaView style={styles.formWrapper}>
                    <ScrollView>
                        <FormContainer>
                            <TextInput 
                                activeOutlineColor={colors.secondary}
                                label="First Name"
                                left={<TextInput.Icon icon="account" />}
                                outlineColor={colors.secondary}
                                mode="outlined"
                                onChangeText={handleFirstNameChange}
                                placeholder="First Name"
                                style={styles.textInput}
                            />
                            <HelperText
                                type="info"
                            >
                                Required* 
                            </HelperText>
                            <TextInput 
                                activeOutlineColor={colors.secondary}
                                label="Last Name"
                                style={styles.bottomInputs}
                                left={<TextInput.Icon icon="account" />}
                                onChangeText={handleLastNameChange}
                                mode="outlined"
                                outlineColor={colors.secondary}
                                placeholder="Last Name"
                            />
                            <HelperText 
                                type="info"
                            >
                                Required* 
                            </HelperText>
                            <TextInput 
                                activeOutlineColor={colors.secondary}
                                label="Email"
                                left={<TextInput.Icon icon="email" />}
                                style={styles.bottomInputs}
                                value={email}
                                onChangeText={handleEmailChange}
                                mode="outlined"
                                outlineColor={colors.secondary}
                                placeholder="Email"
                            />
                            <HelperText 
                                type="info"
                            >
                                Required*
                            </HelperText>
                            <KeyboardAvoidingView
                                behavior="padding"
                                style={styles.keyboardContainer}
                            >
                            <TextInput 
                                activeOutlineColor={colors.secondary}
                                label="Password"
                                left={<TextInput.Icon icon="lock" />}
                                style={styles.bottomInputs}
                                onChangeText={handlePasswordChange}
                                value={password}
                                mode="outlined"
                                outlineColor={colors.secondary}
                                placeholder="Password"
                                secureTextEntry 
                            />
                            <HelperText type="info">
                                Required* 
                            </HelperText>
                            </KeyboardAvoidingView>
                            <KeyboardAvoidingView
                                behavior="padding"
                                style={styles.keyboardContainer}
                            >
                                <View>
                                    <TextInput 
                                        activeOutlineColor={colors.secondary}
                                        keyboardType="phone-pad"
                                        label="Phone Number"
                                        left={<TextInput.Icon icon="phone" />}
                                        style={styles.bottomInputs}
                                        mode="outlined"
                                        onChangeText={formatPhoneNumber}
                                        outlineColor={colors.secondary}
                                        placeholder="e.g. (309217901)"
                                        value={phoneNumber}
                                    />
                                    <HelperText type="info">
                                        Required*
                                    </HelperText>
                                </View>
                            </KeyboardAvoidingView>
                            {!isOpen && (
                                <View style={styles.birthdayBtnContainer}>
                                    <AudioSwipeButton 
                                        color={colors.white}
                                        customStyle={{
                                            marginTop: 1,
                                        }}
                                        onPress={() => setIsOpen(true)}
                                        text="Birthday"
                                        fullWidth
                                    />
                                    <HelperText type="info">
                                        Required* (Must be at least 13)
                                    </HelperText>
                                </View>
                            )}
                            {isOpen && (
                                <View style={styles.pickerContainer}>
                                    <DateTimePicker 
                                        display="spinner"
                                        mode="date"
                                        onChange={handleBirthdayChange}
                                        testID="dateTimePicker"
                                        value={birthday}
                                        style={styles.datePickerInput}
                                    />
                                    <AudioSwipeButton 
                                        buttonHeight={50}
                                        color={colors.white}
                                        customStyle={styles.pickerSelectButton}
                                        onPress={() => setIsOpen(false)}
                                        text="Select"
                                        weight={900}
                                        fullWidth
                                    />
                                </View>
                            )}
                            <View style={styles.genderSectionContainer}>
                                <AudioSwipeText 
                                    color={colors.black}
                                    size={30}
                                    text="Gender"
                                    weight={900}
                                />
                                <View style={styles.radioButtonsContainer}>
                                    <AudioSwipeText
                                        color={colors.black}
                                        customStyle={{
                                            marginLeft: 10,
                                        }}
                                        text="Female"
                                    />
                                    <RadioButton.Android
                                        color={colors.secondary}
                                        onPress={() => toggleGender('female')}
                                        status={gender === 'male' ? 'unchecked' : 'checked'}
                                        value="female"
                                    />
                                </View>
                                <View style={styles.radioButtonsContainer}>
                                <AudioSwipeText
                                        color={colors.black}
                                        customStyle={{
                                            marginLeft: 10,
                                        }}
                                        text="Male"
                                    />
                                    <RadioButton.Android
                                        color={colors.secondary}
                                        onPress={() => toggleGender('male')}
                                        status={gender === 'male' ? 'checked' : 'unchecked'}
                                        value="male"
                                    />
                                </View>
                            </View>
                            <View style={styles.imageButtonContainer}>
                                <AudioSwipeButton 
                                    color={colors.white}
                                    icon="camera"
                                    onPress={takePicture}
                                    text="Avatar"
                                    fullWidth 
                                />
                                <HelperText type="info">
                                    Required* 
                                </HelperText>
                            </View>
                            <View style={styles.submitButtonContainer}>
                                <AudioSwipeButton 
                                    color={colors.white}
                                    onPress={handleSubmit}
                                    text="Submit"
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

/**
 * 
 * @param navigation used to handle navigating between screens
 * @returns a navigation function 
 */
function useDataLayer({ navigation }: NavigationType) {

    const phoneRef = useRef();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [birthday, setBirthday] = useState(new Date(2023, 2, 20));
    const [showBirthdayPicker, setShowBirthdayPicker] = useState(false);
    const [gender, setGender] = useState('female');
    const [avatar, setAvatar] = useState<any>();
    const [uri, setUri] = useState<Blob | null>(null);
    const [fileType, setFileType] = useState(null);
    const [name, setName] = useState('');
    const { handleDialogMessageChange, setDialogMessage } = useShowDialog();
    const { fan } = useUserData();

    useEffect(() => {
        if (fan) {
            navigation.navigate('Dashboard');
        }
    }, [fan]);

    async function takePicture() {
        await ImagePicker.requestCameraPermissionsAsync();
        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: false,
            aspect: [16, 9],
        });

        if (result.canceled) {
            return;
        }

        const localUri = result.assets[0].uri;
        
        const filename = localUri.split('/').pop();


        setFileType(result.assets[0].type as any);
        setAvatar(result as any);
        setUri(localUri as any);
        setName(filename as string);
    }

    function toggleDateTimePicker(isOpen: boolean) {
        setShowBirthdayPicker(isOpen);
    }

    function toggleGender(gender: string) {
        setGender(gender);
    }

    function formatPhoneNumber(newValue: string) {

        if ((newValue as string).length > 10) {
            return;
        } 
        
        if (isNaN(Number(newValue))) {
            return;
        }
        
        setPhoneNumber((newValue as string).trim());
    }

    function handleBirthdayChange(event: DateTimePickerEvent, date: any) {
        const newDate = new Date(date);
        setBirthday(newDate);
    }

    function handleNavigation() {
        navigation.navigate('FanLogin');
    }

    async function handleSubmit() {
        if (!firstName.trim()) {
            setDialogMessage("You must enter a first name.");
            handleDialogMessageChange(true)
            return;
        }

        else if (!lastName.trim()) {
            setDialogMessage("You must enter a last name.");
            handleDialogMessageChange(true);
            return;
        }

        else if (!email.trim()) {
            setDialogMessage("You must enter an email.");
            handleDialogMessageChange(true);
            return;
        }

        else if (!password.trim()) {
            setDialogMessage("You must enter a password.");
            handleDialogMessageChange(true);
            return;
        }

        else if (!checkValidEmail(email)) {
            setDialogMessage("You must enter a valid email.");
            handleDialogMessageChange(true);
            return;
        }

        else if (phoneNumber.length !== 10) {
            setDialogMessage("You must enter a valid 10-digit phone number.");
            handleDialogMessageChange(true);
            return;
        }

        else if (!checkValidAge(formatUserBirthday(birthday))) {
            setDialogMessage("You must enter a birthday and be at least 13-years old to join.");
            handleDialogMessageChange(true);
            return;
        }

        else if (!avatar || !name || !uri) {
            setDialogMessage("You must enter an Avatar picture.");
            handleDialogMessageChange(true);
            return;
        }

        const fd = new FormData();
        fd.append('firstName', firstName);
        fd.append('lastName', lastName);
        fd.append('email', email);
        fd.append('password', password);
        fd.append('birthday', String(birthday));
        fd.append('phoneNumber', phoneNumber);
        fd.append('gender', gender);
        fd.append('avatar', { name, uri, type: "image" });

        await putBinaryData({
            data: fd,
            url: 'api/save-fan'
        }).then(response => {
            const { message, success } = response;
            if (!success) {
                setDialogMessage(message);
                handleDialogMessageChange(true);
                return;
            }
            setDialogMessage("Welcome to AudioSwipe!");
            handleDialogMessageChange(true);
            return;
        }).catch(e => {
            setDialogMessage("Error. Please try again!");
            handleDialogMessageChange(true);
        });
    }


    
    return {
        birthday,
        handleBirthdayChange,
        handleNavigation,
        handleSubmit,
        email,
        formatPhoneNumber,
        firstName,
        gender,
        lastName,
        password,
        phoneNumber,
        phoneRef,
        setEmail,
        setFirstName,
        setLastName,
        setPassword,
        showBirthdayPicker,
        takePicture,
        toggleDateTimePicker,
        toggleGender,
    };
}

const styles = StyleSheet.create({
    textInput: {
        width: '100%',
    },
    birthdayBtnContainer: {
        marginTop: 20,
    },
    bottomInputs: {
        marginTop: 20,
        width: '100%',
    },
    container: {
        height: '100%',
        padding: 0,
        width: '100%',
    },
    datePickerInput: {
        width: '100%',
        marginTop: 5,
    },
    formWrapper: {
        flex: 1,
        height: '50%',
        paddingLeft: 10,
        paddingRight: 10,
        width: '95%',
    },
    genderSectionContainer: {
        display: 'flex',
        gap: 10,
        paddingTop: 20,
        paddingBottom: 20,
    },
    imageButtonContainer: {
        paddingTop: 20,
        paddingBottom: 20,
    },
    keyboardContainer: {
        flex: 1,
    },
    headerContainer: {
        paddingBottom: 30,
    },
    phoneInput: {
        marginTop: 20,
        width: '100%',
    },
    pickerContainer: {
        display: 'flex',
        gap: 4,
    },
    pickerSelectButton: {
        marginTop: 10,
    },
    radioButtonsContainer: {
        display: 'flex',
        gap: 5,
    },
    radidoButtonText: {
        marginLeft: 10,
    },
    submitButtonContainer: {
        paddingBottom: 100,
        paddingTop: 20,
    },
});