import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function useClearUser() {
    await AsyncStorage.setItem('user', JSON.stringify({}));
}