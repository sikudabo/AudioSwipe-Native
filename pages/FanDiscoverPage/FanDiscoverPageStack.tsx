import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Discover from './Discover/Discover';
import DiscoverMusicPlayer from './Discover/DiscoverMusicPlayer';

const DiscoverStack = createNativeStackNavigator();

export default function FanDiscoverPageStack() {
    return (
        <DiscoverStack.Navigator>
            <DiscoverStack.Screen name="DiscoverSongs" component={Discover} options={{ headerShown: false }} />
            <DiscoverStack.Screen name="DiscoverPlayer" component={DiscoverMusicPlayer} options={{ headerShown: false }} />
        </DiscoverStack.Navigator>
    );
}