import React from 'react';
import { View } from 'react-native';
import { useQueryClient } from '@tanstack/react-query';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { FanDiscoverPageStack, FanHomePageStack, FanSettingsPage } from '../pages';
import { colors } from './colors';
import { useAudioPlayerRef, useUpdateAudioPlayer } from '../contexts/SwipeAudioContext';

const Tab = createMaterialBottomTabNavigator();

export default function AudioSwipeNavigationTabs() {
    const { currentSound } = useAudioPlayerRef();
    const { setCurrentSound } = useUpdateAudioPlayer();
    const client = useQueryClient();
    
    return (
        <NavigationContainer independent>
            <Tab.Navigator
                activeColor={colors.white}
                backBehavior='none'
                barStyle={{
                    backgroundColor: colors.secondary,
                }}
                inactiveColor={colors.white}
            >
                <Tab.Screen 
                    component={FanHomePageStack}
                    listeners={({ navigation, route }) => ({
                        tabPress: async (e) => {
                            if (currentSound) {
                                await currentSound.unloadAsync();
                            }
                            client.invalidateQueries(['fetchFanLikedSongs']);
                            setCurrentSound(null);
                            navigation.navigate('Songs');
                        },
                    })}
                    options={{
                        tabBarLabel: 'Home',
                        tabBarIcon: () => <Icon color={colors.white} name="home" size={26} />,
                    }}
                    name="Home" 
                />
                <Tab.Screen 
                    component={FanDiscoverPageStack} 
                    options={{
                        tabBarLabel: 'Discover',
                        tabBarIcon: () => <Icon color={colors.white} name="magnify" size={26} />,
                    }}
                    listeners={({ navigation, route }) => ({
                        tabPress: async (e) => {
                            if (currentSound) {
                                await currentSound.unloadAsync();
                            }
                            setCurrentSound(null);
                            navigation.navigate('DiscoverSongs');
                        },
                    })}
                    name="Discover" 
                />
                <Tab.Screen 
                    component={FanSettingsPage}
                    name="SettingsPage"
                    options={{
                        tabBarLabel: 'Settings',
                        tabBarIcon: () => <Icon color={colors.white} name="cog" size={26} />,
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}