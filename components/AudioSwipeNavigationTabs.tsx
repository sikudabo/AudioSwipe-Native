import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FanDiscoverPageStack, FanHomePageStack } from '../pages';

const Tab = createBottomTabNavigator();

export default function AudioSwipeNavigationTabs() {
    return (
        <NavigationContainer independent>
            <Tab.Navigator screenOptions={{ headerShown: false }}>
                <Tab.Screen name="Home" component={FanHomePageStack} />
                <Tab.Screen name="Settings" component={FanDiscoverPageStack} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}