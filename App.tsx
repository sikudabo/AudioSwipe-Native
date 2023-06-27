import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, View } from 'react-native';
import { useFonts, VarelaRound_400Regular } from '@expo-google-fonts/varela-round';
import { colors } from './components';
import * as SplashScreen from 'expo-splash-screen';
import { FanSignUpPage } from './pages';
import FanLoginPage from './pages/FanLoginPage/FanLoginPage';



const Stack = createNativeStackNavigator();

type AppDisplayLayerProps = {
  fontsLoaded: boolean;
};

SplashScreen.preventAutoHideAsync()

const theme = {
  ...DefaultTheme,
  dark: true,
  rippleEffectEnabled: false,
};

export default function App() {
  return <App_DisplayLayer {...useDataLayer()} />
}


function App_DisplayLayer({ fontsLoaded }: AppDisplayLayerProps) {


  return (
    <PaperProvider theme={theme}>
        <NavigationContainer>
          <View style={styles.appContainer}>
          <Stack.Navigator 
            initialRouteName="FanLogin"
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen 
              component={FanSignUpPage}
              name="FanSignUp"
              options={{
                title: "Sign Up"
              }}
            />
            <Stack.Screen 
              component={FanLoginPage}
              name="FanLogin"
              options={{
                title: "Login",
              }}
            />
          </Stack.Navigator>
          </View>
        </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    height: '100%',
    padding: 0,
    width: '100%',
  }
});

function useDataLayer() {
  const [fontsLoaded] = useFonts({
    VarelaRound_400Regular,
  });

  return {
    fontsLoaded,
  }
}