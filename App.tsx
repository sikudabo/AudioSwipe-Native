import React, { useCallback, useMemo } from 'react';
import { StatusBar } from 'expo-status-bar';
import AppLoading from 'expo-app-loading';
import styled from 'styled-components';
import { NavigationContainer } from '@react-navigation/native';
import { Button, configureFonts, FAB, IconButton, MD3Colors, MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useFonts, VarelaRound_400Regular } from '@expo-google-fonts/varela-round';
import { ArtistPage, HomePage } from './pages';
import Svg, { Circle, Rect } from 'react-native-svg';
import * as SplashScreen from 'expo-splash-screen';

const Stack = createNativeStackNavigator();

type AppDisplayLayerProps = {
  fontsLoaded: boolean;
};

SplashScreen.preventAutoHideAsync()

const fontConfig = {
  default: {
    regular: {
      fontFamily: 'VarelaRound_400Regular',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'VarelaRound_400Regular',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'VarelaRound_400Regular',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'VarelaRound_400Regular',
      fontWeight: 'normal',
    },
  },
};

const theme = {
  ...DefaultTheme,
  bogusColor: true,
  colors: {
    primary: '#00778B',
    bogusColor: 'orange',
    error: 'orange',
  },
  fonts: configureFonts(fontConfig as any),
};

const StyledButton = styled(Button)`
  background-color: red;
  color: #fff;
  font-weight: 900;
  font-size: 16px;
  height: 100px;
  width: 200px;
  padding: 30px;
`;


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

  function RandomHeader() {
    return (
      <View style={styles.header} />
    );
  }

  return (
    <PaperProvider theme={theme as any}>
      <View style={{ marginTop: 50 }} onLayout={onLayoutRootView}>
        <Button buttonColor="red" icon="send" textColor="white">
          Press 
        </Button>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  fab: {
    backgroundColor: '#a1248b',
    borderRadius: 50,
    color: 'white',
    position: 'absolute',
    marginLeft: 30,
    marginTop: 100,
  },
  btn: {
    borderColor: '#0080C6',
    borderRadius: 5,
    fontFamily: 'VarelaRound_400Regular',
    width: '50%',
  },
  safe: {
    flex: 1,
    height: 400,
  },
  scrollView: {
    backgroundColor: '#fff',
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    height: '50%',
    padding: 100,
    width: '100%',
  },
  header: {
    width: '100%',
    color: '#fff',
    height: 40,
  },
  tealBackground: {
    alignItems: 'center',
    backgroundColor: '#00778B',
    display: 'flex',
    height: '100vh',
    justifyContent: 'center',
    width: '100%',
  },
  logoText: {
    alignSelf: 'center',
    color: '#fff',
    fontFamily: 'VarelaRound_400Regular',
    fontSize: 200,
    fontWeight: '500',
  },
  backgroundImage: {
    height: '100vh',
    width: '100%',
  },
  text: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '900',
  },
  firstItem: {
    flex: 3,
    backgroundColor: 'red',
  },
  secondItem: {
    flex: 2,
    backgroundColor: 'green',
  },
  thirdItem: {
    flex: 1,
    backgroundColor: 'orange',
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
