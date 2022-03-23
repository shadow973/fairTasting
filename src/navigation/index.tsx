import React, { useEffect, useState, useRef } from 'react';
import { useAuthContext } from '@fair/context/AuthContextProvider';
import WelcomeScreen from '@fair/screens/WelcomeScreen';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
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
import TicketSelectionScreen from '@fair/screens/ticketshop/TicketSelectionScreen';
import CardPaymentScreen from '@fair/screens/payment/PaymentScreen';
import PaymentSuccessScreen from '@fair/screens/payment/PaymentSuccess';
import CartContextProvider from '@fair/context/CartContextProvider';
import UserDataContextProvider from '@fair/context/UserDataContextProvider';
import MyOrdersScreen from '@fair/screens/profile/MyOrdersScreen';
import MyTicketsScreen from '@fair/screens/profile/MyTicketsScreen';
import MyEventTicketsScreen from '@fair/screens/profile/MyEventTickets';
import CustomerDetailsScreen from '@fair/screens/customers/CustomerDetailsScreen';
import { StripeProvider } from '@stripe/stripe-react-native';
import { useApi } from '@fair/hooks/useApi';
import * as Analytics from 'expo-firebase-analytics';
import LocationContextProvider from '@fair/context/LocationContext';
import CompleteProfileScreen from '@fair/screens/profile/CompleteProfileScreen';
import WineReviewContextProvider from '@fair/context/WineReviewContextProvider';
import WineDetail from '@fair/screens/wine/WineDetail';
import SplashScreen from '@fair/components/custom/SplashScreen';
import WineDetailContextProvider from '@fair/context/WineDetailContextProvider';
import WineCollectReview from '@fair/screens/review/WineCollectReview';


export default function Navigation() {
  const navigationRef = useRef();
  const routeNameRef = useRef();
  const { loading } = useAuthContext();
  if (loading) {
    return null
  }
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      ref={navigationRef}
      onReady={() =>
        (routeNameRef.current = navigationRef.current.getCurrentRoute()?.name)
      }
      onStateChange={async () => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = navigationRef.current.getCurrentRoute().name;

        if (previousRouteName !== currentRouteName) {
          // The line below uses the expo-firebase-analytics tracker
          // https://docs.expo.io/versions/latest/sdk/firebase-analytics/
          // Change this line to use another Mobile analytics SDK
          await Analytics.setCurrentScreen(currentRouteName);
        }
        // Save the current route name for later comparison
        routeNameRef.current = currentRouteName;
      }}>
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createStackNavigator<RootStackParamList>();
const AuthStack = createStackNavigator<AuthStackParamList>();
const WineReview = createStackNavigator();
const WineReviewReviewNavigation = () => {
  return (
    <WineReviewContextProvider>
      <WineReview.Navigator initialRouteName={"WineReviewHome"} screenOptions={{ headerShown: false }}>
        <WineReview.Screen name="WineReviewHome" component={WineCollectReview} />
      </WineReview.Navigator>
    </WineReviewContextProvider>
  )
}


function RootNavigator() {
  const { user, isTokenValid, loading } = useAuthContext()
  const [pKey, setPKey] = useState('');
  const getpKey = async () => {
    const { data } = await useApi('stripe/keys/publishable')
    setPKey(data)
  }

  useEffect(() => {
    if (!loading) {
      (async () => await getpKey())();
    }
  }, [user, isTokenValid, loading])

  if (loading || pKey == undefined) {
    return <SplashScreen />
  }

  return isTokenValid && user ? (
    <StripeProvider publishableKey={pKey} merchantIdentifier="merchant.com.fairtasting.app">
      <LocationContextProvider>
        <UserDataContextProvider>
          <CartContextProvider>
            <WineDetailContextProvider>
              <Stack.Navigator screenOptions={{ headerShown: false }}>
                {user?.firstname == "UPDATE" || user.lastname == "UPDATE" || !user.dob || !user.gender ? <>
                  <Stack.Screen name="CompleteProfile" component={CompleteProfileScreen} />
                </> : <>
                  <Stack.Screen name="UpcomingEvents" component={BottomTabNavigator} />
                  <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
                  <Stack.Screen name="EventDetails" component={EventDetailsScreen} />
                  <Stack.Screen name="TicketSelection" component={TicketSelectionScreen} />
                  <Stack.Screen name="Payment" component={CardPaymentScreen} />
                  <Stack.Screen name="PaymentSuccess" component={PaymentSuccessScreen} />

                  <Stack.Screen name="MyOrders" component={MyOrdersScreen} />
                  <Stack.Screen name="MyTickets" component={MyTicketsScreen} />
                  <Stack.Screen name="MyEventTickets" component={MyEventTicketsScreen} />
                  <Stack.Screen name="CustomerDetails" component={CustomerDetailsScreen} />

                  <Stack.Screen name="WineReview" component={WineReviewReviewNavigation} />
                  <Stack.Screen name="WineDetail" component={WineDetail} />

                </>}
              </Stack.Navigator>
            </WineDetailContextProvider>
          </CartContextProvider>
        </UserDataContextProvider>
      </LocationContextProvider>
    </StripeProvider>
  ) : (
    <LocationContextProvider>
      <AuthStack.Navigator screenOptions={{
        headerShown: false
      }}>
        <AuthStack.Screen name="Welcome" component={WelcomeScreen} />
        <AuthStack.Screen name="SignIn" component={SignInScreen} />
        <AuthStack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <AuthStack.Screen name="CreateAccount" component={CreateAccountScreen} />
        <AuthStack.Screen name="UpcomingEvents" component={BottomTabNavigator} />
        <AuthStack.Screen name="EventDetails" component={EventDetailsScreen} />
        <AuthStack.Screen name="CustomerDetails" component={CustomerDetailsScreen} />
      </AuthStack.Navigator>
    </LocationContextProvider>
  );
}
