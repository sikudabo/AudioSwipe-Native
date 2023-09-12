import React, { useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {  MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, View } from 'react-native';
import { useFonts, VarelaRound_400Regular } from '@expo-google-fonts/varela-round';
import { AudioSwipeDialog, AudioSwipeNavigationTabs } from './components';
import { colors } from './components/colors';
import * as SplashScreen from 'expo-splash-screen';
import { FanLoginPage, FanSignUpPage } from './pages';
import GlobalContextProciders from './GlobalContextProviders';
import 'react-native-gesture-handler';



const Stack = createNativeStackNavigator();
const queryClient = new QueryClient();

type AppDisplayLayerProps = {
  fontsLoaded: boolean;
}

const theme = {
  ...DefaultTheme,
  dark: true,
  rippleEffectEnabled: false,
};

SplashScreen.preventAutoHideAsync();

export default function App() {
  return <App_DisplayLayer {...useDataLayer()} />
}


function App_DisplayLayer({ fontsLoaded }: AppDisplayLayerProps) {

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <PaperProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <GlobalContextProciders>
            <View onLayout={onLayoutRootView} style={styles.appContainer}>
              <AudioSwipeDialog />
              <Stack.Navigator>
                <Stack.Screen 
                  component={FanLoginPage}
                  name="FanLogin"
                  options={{
                    headerShown: false,
                    title: "Login",
                  }}
                />
                <Stack.Screen 
                  component={FanSignUpPage}
                  name="FanSignUp"
                  options={{
                    title: "Sign Up"
                  }}
                />
                <Stack.Screen 
                  component={AudioSwipeNavigationTabs}
                  name="Dashboard"
                  options={{
                    gestureEnabled: false,
                    headerShown: false,
                  }}
                />
              </Stack.Navigator>
            </View>
          </GlobalContextProciders>
        </NavigationContainer>
      </QueryClientProvider>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  activityContainer: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
  },
  childContainer: {
    paddingTop: 200,
  },
  appContainer: {
    height: '100%',
    padding: 0,
    width: '100%',
  },
});

function useDataLayer() {
  const [fontsLoaded] = useFonts({
    VarelaRound_400Regular,
  });

  return {
    fontsLoaded,
  }
}