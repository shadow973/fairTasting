import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {SafeAreaProvider } from 'react-native-safe-area-context';
import useCachedResources from '@fair/hooks/useCachedResources';
import useColorScheme from '@fair/hooks/useColorScheme';
import Navigation from '@fair/navigation';
import AuthContextProvider from '@fair/context/AuthContextProvider';
import FTENV from '@fair/ftenv'
import * as Sentry from 'sentry-expo';
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import languages from '@fair/i18n/language.json'

Sentry.init({
  dsn: 'https://c7522cd6ec574269a3cf20808d64fe22@o576853.ingest.sentry.io/5730927',
  release: "fairTasting@" + process.env.npm_package_version,
  enableInExpoDevelopment: true,
  debug: FTENV().sentryDebug,
  environment: FTENV().sentryEnv
});

i18n.translations = languages;

i18n.locale = Localization.locale;
i18n.fallbacks = true;
i18n.defaultLocale = 'en'

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      
      <SafeAreaProvider>
        
        <AuthContextProvider>
          <Navigation colorScheme={colorScheme} />
          <StatusBar style="light" />
        </AuthContextProvider>
      </SafeAreaProvider>
    );
  }
}
