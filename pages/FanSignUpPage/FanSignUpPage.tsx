import React, { useRef, useState } from 'react';
import PhoneInput from 'react-native-phone-input';
import { 
    View, 
    SafeAreaView,
    ScrollView,
    StyleSheet 
} from 'react-native';
import { useForm } from 'react-hook-form';
import SignUpHeader from './components/SignUpHeader';
import { AudioSwipeText, FormContainer, colors } from '../../components';
import { NavigationType } from '../../typings';
import { AudioSwipeBackgroundContainer } from '../../components/backgrounds';
import { HelperText, TextInput } from 'react-native-paper';
const MusicCelebrationImage = require('../../assets/app-media/music-celebration.jpeg');

/**
 * 
 * @param navigation 
 * @returns The fan sign up page display layer 
 */
export default function FanSignUpPage({ navigation }: NavigationType) {
    return <FanSignUpPage_DisplayLayer {...useDataLayer({ navigation })} />;
}

type FanSignUpPageDisplayLayerProps = {
    handleNavigation: () => void;
    formatPhoneNumber: (newValue: string) => void;
    phoneNumber: string;
    phoneRef: any;
};
/**
 * 
 * @param handleNavigation a function to handle navigating to a new page. 
 * @returns The fan sign up form
 */
function FanSignUpPage_DisplayLayer({ 
    handleNavigation,
    formatPhoneNumber,
    phoneNumber,
    phoneRef,
}: FanSignUpPageDisplayLayerProps) {
    return (
        <View style={styles.container}>
            <AudioSwipeBackgroundContainer
                src={MusicCelebrationImage}
            >
               <SignUpHeader onPress={handleNavigation} />
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

    function formatPhoneNumber(newValue: string) {

        if ((newValue as string).length > 10) {
            return;
        } 
        
        if (isNaN(Number(newValue))) {
            return;
        }
        
        setPhoneNumber((newValue as string).trim());
    }

    function handleNavigation() {
        navigation.navigate('FanLogin');
    }
    
    return {
        handleNavigation,
        formatPhoneNumber,
        phoneNumber,
        phoneRef,
    };
}

const styles = StyleSheet.create({
    textInput: {
        width: '100%',
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
    formWrapper: {
        flex: 1,
        maxHeight: '75%',
        paddingTop: 50,
        paddingLeft: 10,
        paddingRight: 10,
        width: '95%',
    },
    phoneInput: {
        borderColor: colors.secondary,

        marginTop: 20,
        width: '100%',
    },
});