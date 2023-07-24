import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function useGetUser() {
    const serializedFan = await AsyncStorage.getItem('user');
    const unserializedFan = JSON.parse(serializedFan as string);
    return unserializedFan;
}