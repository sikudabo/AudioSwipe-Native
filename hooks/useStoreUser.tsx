import AsyncStorage from '@react-native-async-storage/async-storage';
import { FanType } from '../typings';

export default async function useStoreUser(user: FanType) {
    const serializedFan = JSON.stringify(user);
    await AsyncStorage.setItem('user', serializedFan);
}