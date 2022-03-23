import React, { useEffect, useState } from 'react';
import { useAuthContext } from '@fair/context/AuthContextProvider';
import WelcomeScreen from '@fair/screens/WelcomeScreen';
import FairDetailsScreen from '@fair/screens/FairDetails.web';
import BarDetailsScreen from '@fair/screens/BarDetails.web';
import TicketDetailsScreen from '@fair/screens/TicketDetails.web';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { ColorSchemeName } from 'react-native';
import NotFoundScreen from '../screens/NotFoundScreen';
import SignInScreen from '../screens/auth/SignInScreen';
import CreateAccountScreen from '@fair/screens/auth/CreateAccountScreen';
import ForgotPasswordScreen from '@fair/screens/auth/ForgotPasswordScreen';
import EventDetailsScreen from '../screens/events/EventDetailsScreen';
import { AuthStackParamList, RootStackParamList } from '../types';
import BottomTabNavigator from './BottomTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';
import BetaTesterScreen from '@fair/screens/users/BetaTesterScreen.web';
import PrivacyScreen from '@fair/screens/about/PrivacyScreen';
import TermsScreen from '@fair/screens/about/TermsScreen';
import CookiePolicyScreen from '@fair/screens/about/CookiePolicyScreen';
import AcceptableUseScreen from '@fair/screens/about/AcceptableUseScreen';
import BetaTesterVerifyScreen from '@fair/screens/users/BetaTesterVerifyScreen.web';
import i18n from 'i18n-js';
import CustomerDetailsScreen from '@fair/screens/customers/CustomerDetailsScreen.web';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createStackNavigator<RootStackParamList>();
const AuthStack = createStackNavigator<AuthStackParamList>();

function RootNavigator() {
  const { user, isTokenValid, loading } = useAuthContext()


  return (
    <AuthStack.Navigator screenOptions={{
      headerShown: false,
      title: 'fairTasting | ' + i18n.t('home.sub_teaser')
    }}>
      <AuthStack.Screen name="Welcome" component={WelcomeScreen} />
      <AuthStack.Screen name="FairDetails" component={FairDetailsScreen} />
      <AuthStack.Screen name="BarDetails" component={BarDetailsScreen} />
      <AuthStack.Screen name="TicketDetails" component={TicketDetailsScreen} />
      <AuthStack.Screen name="BetaTester" component={BetaTesterScreen} />
      <AuthStack.Screen name="BetaTesterVerify" component={BetaTesterVerifyScreen} />
      <AuthStack.Screen name="Privacy" component={PrivacyScreen} />
      <AuthStack.Screen name="Terms" component={TermsScreen} />
      <AuthStack.Screen name="CookiePolicy" component={CookiePolicyScreen} />
      <AuthStack.Screen name="AcceptableUsePolicy" component={AcceptableUseScreen} />
      <AuthStack.Screen name="SignIn" component={SignInScreen} />
      <AuthStack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <AuthStack.Screen name="CreateAccount" component={CreateAccountScreen} />
      <AuthStack.Screen name="UpcomingEvents" component={BottomTabNavigator} />
      <AuthStack.Screen name="EventDetails" component={EventDetailsScreen} />
      <AuthStack.Screen name="WinebarDetails" component={CustomerDetailsScreen} />
      <AuthStack.Screen name="RestaurantDetails" component={CustomerDetailsScreen} />
    </AuthStack.Navigator>
  );
}
