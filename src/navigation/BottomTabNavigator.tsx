import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { AnimatedTabBarNavigator } from "react-native-animated-nav-tab-bar";
import * as React from 'react';

import Colors, { color } from '@fair/constants/Colors';
import useColorScheme from '@fair/hooks/useColorScheme';
import UpcomingEvents from '@fair/screens/events/UpcomingEventsScreen';
import MainScreen from '@fair/screens/main/MainScreen';
import ProfileScreen from '@fair/screens/ProfileScreen';
import ReviewImageScreen from '@fair/screens/wine/ReviewImageScreen';
import { BottomTabParamList, TabOneParamList, UpcomingEventsParamList } from '@fair/types';
import View from '@fair/components/common/View';
import Text from '@fair/components/common/Text';
import { Animated, Image, Platform, Pressable, StyleSheet } from 'react-native';
import WineReviewContextProvider from '@fair/context/WineReviewContextProvider';
import MyWineScreen from '@fair/screens/mywine/MyWineScreen';
import MainSearchScreen from '@fair/screens/search/MainSearchScreen';
import { TouchableOpacity } from 'react-native-gesture-handler';


const BottomTab = createBottomTabNavigator<BottomTabParamList>();

const WineReviewButton = ({children, onPress}) =>(

  <Pressable style={styles.wineReviewButton} onPress={onPress}>
    <View>
      {children}
    </View>
  </Pressable>
);

export default function BottomTabNavigator() {

  return (
    <WineReviewContextProvider>
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: color.brand,
        //activeBackgroundColor: color.white,
        inactiveTintColor: color.brandContrast,
        //inactiveBackgroundColor: color.white,
        showLabel: false,
        style: {
          backgroundColor: color.white,
          position: 'absolute',
          height: 60,
          ...styles.shadow

        },
      }}
    >

      <BottomTab.Screen
        name="Home"
        component={MainScreen}
        options={{
          tabBarIcon: ({ color }) => (<TabBarIcon name="ios-home-sharp" color={color} />),
        }}
      />
      <BottomTab.Screen
        name="Search"
        component={MainSearchScreen}
        options={{
          tabBarIcon: ({ color }) => (<TabBarIcon name="search" color={color} />),
        }}
      />
      {Platform.OS === "ios"?<>
      <BottomTab.Screen
        name="Review"
        component={ReviewImageScreen}
        options={{
          tabBarIcon: ({ color }) => (<Image source={require('../../assets/images/add_wine.png')} />),
          //tabBarButton: (props) => (<WineReviewButton {...props} />),
          //tabBarVisible: true

        }}
      />
      </>:<>
      <BottomTab.Screen
        name="Review"
        component={ReviewImageScreen}
        options={{
          tabBarIcon: ({ color }) => (<Image source={require('../../assets/images/add_wine.png')} />),

        }}
      /></>}
      <BottomTab.Screen
        name="MyWine"
        component={MyWineScreen}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="wine" color={color}/>,
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="person-sharp" color={color}/>,
        }}
      />
    </BottomTab.Navigator>
    </WineReviewContextProvider>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: React.ComponentProps<typeof Ionicons>['name']; color: string }) {
  return (
    <View style={styles.tabIcon}>
      <Ionicons size={25} style={{ margin: 0 }} {...props} />
    </View>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: color.slate,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5
  },
  tabIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    top: Platform.OS === 'ios' ? 10 : 0,
  },
  wineReviewButton:{
    top: -30,
    marginBottom: -20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: color.slate,
    marginLeft: 25,
    marginRight: 25,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,    
  }
})

