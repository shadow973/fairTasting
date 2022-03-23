import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';
import {
  useFonts,
  Roboto_100Thin_Italic,
  Roboto_300Light_Italic,
  Roboto_400Regular_Italic,
  Roboto_500Medium_Italic,
  Roboto_700Bold_Italic,
  Roboto_900Black,
  Roboto_900Black_Italic,
  Roboto_500Medium,
  Roboto_400Regular,
  Roboto_700Bold,
  Roboto_300Light,
  Roboto_100Thin,

} from '@expo-google-fonts/roboto';
export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  let [fontsLoaded] = useFonts({
    Roboto_100Thin_Italic,
    Roboto_300Light_Italic,
    Roboto_400Regular_Italic,
    Roboto_500Medium_Italic,
    Roboto_700Bold_Italic,
    Roboto_900Black,
    Roboto_900Black_Italic,
    Roboto_500Medium,
    Roboto_400Regular,
    Roboto_700Bold,
    Roboto_300Light,
    Roboto_100Thin,
  });
  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          'space-mono': require('@assets/fonts/SpaceMono-Regular.ttf'),
          'MitchaellaModern': require('@assets/fonts/MitchaellaModern.ttf'),
          'Zodiak-Regular': require('@assets/fonts/Zodiak-Regular.ttf'),
          'Sentient-Regular': require('@assets/fonts/Sentient-Regular.ttf'),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return fontsLoaded && isLoadingComplete;
}
