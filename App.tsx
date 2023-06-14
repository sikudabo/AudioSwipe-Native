import { StatusBar } from 'expo-status-bar';
import AppLoading from 'expo-app-loading';
import styled from 'styled-components';
import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, Image, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useFonts, VarelaRound_400Regular } from '@expo-google-fonts/varela-round';
import { ArtistPage, HomePage } from './pages';
import Svg, { Circle, Rect } from 'react-native-svg';

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

  function RandomHeader() {
    return (
      <View style={styles.header} />
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView StickyHeaderComponent={RandomHeader} style={styles.scrollView}>
        <Text style={styles.text}>
          
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    height: 400,
  },
  scrollView: {
    backgroundColor: 'pink',
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    height: '50%',
    width: '100vw',
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
    width: '100vw',
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
    width: '100vw',
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
