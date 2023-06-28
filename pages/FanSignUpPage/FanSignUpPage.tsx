import React, { useRef, useState } from 'react';
import PhoneInput from 'react-native-phone-input';
import { 
    KeyboardAvoidingView,
    View, 
    SafeAreaView,
    ScrollView,
    StyleSheet, 
    NativeSyntheticEvent
} from 'react-native';
import { useForm } from 'react-hook-form';
import SignUpHeader from './components/SignUpHeader';
import TextInputMask from 'react-native-text-input-mask';
import { AudioSwipeButton, AudioSwipeText, FormContainer, colors } from '../../components';
import { NavigationType } from '../../typings';
import { AudioSwipeBackgroundContainer } from '../../components/backgrounds';
import { HelperText, RadioButton, TextInput } from 'react-native-paper';
const MusicCelebrationImage = require('../../assets/app-media/music-fun.jpeg');
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as ImagePicker from 'expo-image-picker';

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
    handleBirthdayChange: (event: DateTimePickerEvent, date?: any) => void;
    handleNavigation: () => void;
    formatPhoneNumber: (newValue: string) => void;
    gender: string;
    phoneNumber: string;
    phoneRef: any;
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
    handleBirthdayChange,
    handleNavigation,
    formatPhoneNumber,
    gender,
    phoneNumber,
    phoneRef,
    showBirthdayPicker,
    takePicture,
    toggleDateTimePicker,
    toggleGender,
}: FanSignUpPageDisplayLayerProps) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <View style={styles.container}>
            <AudioSwipeBackgroundContainer
                src={MusicCelebrationImage}
            >
               <View style={styles.headerContainer}>
                <SignUpHeader onPress={handleNavigation} />
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
                                        placeholder="e.g. (17655068385)"
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
                            </View>
                            <View style={styles.submitButtonContainer}>
                                <AudioSwipeButton 
                                    color={colors.white}
                                    onPress={() => console.log('Submitting')}
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

    const [phoneNumber, setPhoneNumber] = useState('');
    const [birthday, setBirthday] = useState(new Date(2023, 2, 20));
    const [showBirthdayPicker, setShowBirthdayPicker] = useState(false);
    const [gender, setGender] = useState('female');
    const [avatar, setAvatar] = useState<any>();
    const [uri, setUri] = useState<Blob | null>(null);
    const [name, setName] = useState('');

    async function takePicture() {
        await ImagePicker.requestCameraPermissionsAsync();
        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
        });

        if (result.canceled) {
            return;
        }

        const localUri = result.assets[0].uri;
        const filename = localUri.split('/').pop();

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
        console.log('The new date is:', date);
        setBirthday(date as Date);
    }

    function handleNavigation() {
        navigation.navigate('FanLogin');
    }

    function handleSubmit() {
        if (!avatar || !uri || !name) {
            return;
        }

        const fd = new FormData();
        fd.append('avatar', JSON.stringify({ uri, name, type: 'image/jpg' }));
    }


    
    return {
        birthday,
        handleNavigation,
        handleBirthdayChange,
        formatPhoneNumber,
        gender,
        phoneNumber,
        phoneRef,
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
        borderColor: colors.secondary,
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
        paddingBottom: 20,
        paddingTop: 20,
    },
});