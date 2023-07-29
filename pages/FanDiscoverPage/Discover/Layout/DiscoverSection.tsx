import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { AudioSwipeText } from '../../../../components';

type DiscoverSectionProps = {
    children: React.ReactNode;
    headerText: string;
};

export default function DiscoverSection({ children, headerText }: DiscoverSectionProps) {
    return (
        <SafeAreaView 
            style={styles.sectionWrapper}
        >
            <View 
                style={styles.textContainer}
            >
                <AudioSwipeText 
                    customStyle={{
                        paddingTop: 50,
                    }}
                    size={30}
                    text={headerText}
                    weight={900}
                />
            </View>
            <ScrollView>
                {children}
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    sectionWrapper: {
        alignItems: 'center',
        display: 'flex',
        height: 400,
        paddingBottom: 20,
        paddingTop: 200,
    },
    textContainer: {
        paddingBottom: 20,
    },
});