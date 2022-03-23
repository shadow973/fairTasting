import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useCachedResources from '@fair/hooks/useCachedResources';
import useColorScheme from '@fair/hooks/useColorScheme';
import Navigation from '@fair/navigation';
import AuthContextProvider from '@fair/context/AuthContextProvider';
import FTENV from '@fair/ftenv'
import * as Sentry from 'sentry-expo';
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import languages from '@fair/i18n/language.json';


if (FTENV().enableSentry) {
  Sentry.init({
    dsn: 'https://c7522cd6ec574269a3cf20808d64fe22@o576853.ingest.sentry.io/5730927',
    release: "fairTasting@" + process.env.npm_package_version,
    enableInExpoDevelopment: true,
    debug: FTENV().sentryDebug,
    environment: FTENV().sentryEnv
  });
}
// const logger = {
//   info: function (...args) {
//     if (FTENV().enableSentry) {
//       Sentry.Native.captureMessage(args[0])
//     } else {
//       console.log(...args)
//     }
//   },
//   error: function (...args) {
//     if (FTENV().enableSentry) {
//       Sentry.Native.captureException(new Error(args[0]))
//     } else {
//       console.error(...args)
//     }
//   }
// }
// export default logger
i18n.translations = languages;

i18n.locale = Localization.locale;
i18n.fallbacks = true;
i18n.defaultLocale = 'en'

export default function App() {
  // const [ updateCheck, setUpdateCheck ] = useState(false)
  // const [showBox, setShowBox] = useState(true);
  // const showConfirmDialog = () => {
  //   return Alert.alert(
  //     i18n.t('go_back'),
  //     "Are you sure you want to remove this beautiful box?",
  //     [
  //       // The "Yes" button
  //       {
  //         text: "Yes",
  //         onPress: () => {
  //           setShowBox(false);
  //         },
  //       },
  //       // The "No" button
  //       // Does nothing but dismiss the dialog when tapped
  //       {
  //         text: "No",
  //       },
  //     ]
  //   );
  // };
  // const checkUpdates = async() =>{
  //   console.log("Hello")
  //   //showConfirmDialog();
  //   try {
  //     const update = await Updates.checkForUpdateAsync();
  //     if (update.isAvailable) {
  //       await Updates.fetchUpdateAsync();
  //       showConfirmDialog();
  //       await Updates.reloadAsync();
  //     }
  //     setUpdateCheck(true)
  //   } catch (e) {
  //     // handle or log error
  //   }
  // }
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  // useEffect(() => {
  //   if(!updateCheck){
  //   checkUpdates();
  //   }
  // }, [updateCheck])
  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <Sentry.Native.ErrorBoundary fallback="An error ocurred" showDialog>
        <SafeAreaProvider>
          <AuthContextProvider>
            <Navigation />
            <StatusBar style="light" />
          </AuthContextProvider>
        </SafeAreaProvider>
      </Sentry.Native.ErrorBoundary>
    );
  }
}
