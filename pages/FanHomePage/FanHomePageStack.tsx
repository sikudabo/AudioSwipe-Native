import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ArtistProfilePage from './ArtistProfilePage/ArtistProfilePage';
import LikedSongs from './LikedSongs/LikedSongs';
import Subscriptions from './Subscriptions/Subscriptions';
import LikedSongsPlayer from './LikedSongsPlayer/LikedSongsPlayer';

const HomeStack = createNativeStackNavigator();

export default function HomeStackScreen() {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen name="Songs" component={LikedSongs} options={{ gestureEnabled: false, headerShown: false }} />
            <HomeStack.Screen name="Subscriptions" component={Subscriptions} />
            <HomeStack.Screen name="LikedSongsPlayer" component={LikedSongsPlayer} options={{ gestureEnabled: false, headerShown: false }} />
            <HomeStack.Screen name="ArtistProfilePage" component={ArtistProfilePage} options={{ gestureEnabled: false, headerShown: false }} />
        </HomeStack.Navigator>
    );
}