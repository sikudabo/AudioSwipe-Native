import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LikedSongs from './LikedSongs/LikedSongs';
import Subscriptions from './Subscriptions/Subscriptions';

const HomeStack = createNativeStackNavigator();

export default function HomeStackScreen() {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen name="Songs" component={LikedSongs} options={{ headerShown: false }} />
            <HomeStack.Screen name="Subscriptions" component={Subscriptions} />
        </HomeStack.Navigator>
    );
}