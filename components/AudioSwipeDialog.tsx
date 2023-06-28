import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { Dialog, Portal } from 'react-native-paper';
import AudioSwipeButton from './AudioSwipeButton';
import AudioSwipeText from './AudioSwipeText';
import { colors } from './colors';
import { useShowDialog } from '../hooks';



type AudioSwipeDialogDisplayLayerProps = {
    handleClose: () => void;
    isOpen: boolean;
    message: string;
}

function AudioSwipeDisplayLayer({
    handleClose,
    isOpen,
    message,
}: AudioSwipeDialogDisplayLayerProps) {
    return (
        <View style={styles.container}>
            <Portal>
                <Dialog 
                    visible={isOpen}
                    onDismiss={() => {}}
                >
                    <Dialog.Title>
                        <AudioSwipeText
                            color={colors.black}
                            size={32}
                            text="Alert!"
                            weight={900}
                        />
                    </Dialog.Title>
                </Dialog>
            </Portal>
        </View>
    );
}

function useDataLayer() {
    const { handleDialogMessageChange, isDialogVisible, message } = useShowDialog();

    const isOpen = useMemo(() => {
        return isDialogVisible;
    }, [isDialogVisible]);

    function handleClose() {
        handleDialogMessageChange(false);
    }

    return {
        handleClose,
        isOpen,
        message,
    };
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 5,
        paddingRight: 5,
        width: '75%',
    },
});