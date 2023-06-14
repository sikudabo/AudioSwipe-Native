import { StatusBar } from 'expo-status-bar';
import AppLoading from 'expo-app-loading';
import styled from 'styled-components';
import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import { useFonts, VarelaRound_400Regular } from '@expo-google-fonts/varela-round';
import { ArtistPage, HomePage } from './pages';

const Stack = createNativeStackNavigator();

type AppDisplayLayerProps = {
  fontsLoaded: boolean;
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
  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="ArtistPage" >
          <Stack.Screen 
            component={HomePage}
            name="HomePage"
            options={{ gestureEnabled: true, title: 'Home' }}
          />
          <Stack.Screen 
            component={ArtistPage}
            initialParams={{ name: 'Simeon', age: 30 }}
            name="ArtistPage"
            options={{ title: 'Profile' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    fontWeight: "900",
    fontFamily: 'VarelaRound_400Regular',
    fontSize: 32,
    padding: '20px',
    width: '100vw',
    height: '50vh',
  },
  text: {
    paddingTop: 40,
    fontSize: 40,
    fontWeight: '900',
    fontFamily: 'VarelaRound_400Regular',
    color: '#fff',
  },
  firstRow: {
    fontSize: 20,
    fontFamily: 'VarelaRound_400Regular',
    flex: 3,
  },
  secondRow: {
    paddingTop: 30,
    fontSize: 15,
    fontFamily: 'VarelaRound_400Regular',
    flex: 2,
  },
  thirdRow: {
    paddingTop: 30,
    fontSize: 10,
    fontFamily: 'VarelaRound_400Regular',
    flex: 1,
  },
  testButton: {
    backgroundColor: '#00778B',
    color: '#fff',
    fontWeight: '700',
    borderRadius: 5,
    fontFamily: 'VarelaRound_400Regular',
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
