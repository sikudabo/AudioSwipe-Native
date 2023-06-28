import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Dialog, Portal } from 'react-native-paper';
import AudioSwipeButton from './AudioSwipeButton';
import AudioSwipeText from './AudioSwipeText';
import { colors } from './colors';
import { useShowDialog } from '../hooks';



type AudioSwipeDialogDisplayLayerProps = {
    handleClose: () => void;
    isOpen: boolean;
    message: string;
}

export default function AudioSwipeDialog() {
    return <AudioSwipeDialog_DisplayLayer {...useDataLayer()} />;
}

function AudioSwipeDialog_DisplayLayer({
    handleClose,
    isOpen,
    message,
}: AudioSwipeDialogDisplayLayerProps) {
    return (
        <View style={styles.container}>
            <Portal>
                <Dialog 
                    visible={isOpen}
                    onDismiss={handleClose}
                >
                    <Dialog.Title style={styles.alertHeader}>
                        <AudioSwipeText
                            color={colors.black}
                            size={32}
                            text="Alert!"
                            weight={900}
                        />
                    </Dialog.Title>
                    <Dialog.Content>
                        <AudioSwipeText 
                            color={colors.black}
                            size={20}
                            weight={900}
                            text={message}
                        />
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button 
                            textColor={colors.secondary}
                            onPress={handleClose}
                        >
                           OK
                        </Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </View>
    );
}

function useDataLayer() {
    const { handleDialogMessageChange, isDialogVisible, message, setDialogMessage } = useShowDialog();

    const isOpen = useMemo(() => {
        return isDialogVisible;
    }, [isDialogVisible]);

    function handleClose() {
        setDialogMessage('');
        handleDialogMessageChange(false);
    }

    return {
        handleClose,
        isOpen,
        message,
    };
}

const styles = StyleSheet.create({
    alertHeader: {
        alignSelf: 'center',
    },
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 5,
        paddingRight: 5,
        width: '75%',
    },
});