import Button from '@fair/components/common/Button';
import { useAuthContext } from '@fair/context/AuthContextProvider';
import { useApi } from '@fair/hooks/useApi';
import React, { useCallback, useEffect, useState } from 'react';
import { RefreshControl, Image, ScrollView, StyleSheet, TouchableHighlight, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { brandFontFamily, brandFontSize } from '@fair/constants/Fonts';
import Text from '@fair/components/common/Text';
import View from '@fair/components/common/View';
import { color } from '@fair/constants/Colors';
import i18n from 'i18n-js';
import FTEventCardHorizontal from '@fair/components/custom/FTEventCardHorizontal';
import FTNoEvent from '@fair/components/defaults/FTNoEvent';
import LogoHorizontal from '@fair/components/common/LogoHorizontal';
import FTWinebarCardHorizontal from '@fair/components/custom/FTWinebarCardHorizontal';
import SearchingWinebar from '@fair/components/defaults/SearchingWinebar';
import NoWineBar from '@fair/components/defaults/NoWineBar';
import SearchingRestaurants from '@fair/components/defaults/SearchingRestaurants';
import NoRestaurant from '@fair/components/defaults/NoRestaurant';
import { useLocationContext } from '@fair/context/LocationContext';


export default function MainScreen() {
  const [events, setEvents] = useState([])
  const [winebars, setWinebars] = useState([])
  const [restaurants, setRestaurants] = useState([])
  const [refreshing, setRefreshing] = React.useState(false);
  const { currentLocation, permissionStatus, launchLocationSettings, refreshLocation } = useLocationContext();

  const onRefresh = useCallback(async () => {
    await setRefreshing(true);
    await refreshLocation();
    await setRefreshing(false);
  }, []);
  const getEvents = async () => {
    const { data } = await useApi('event')
    setEvents(data)
  }
  const getWineBarsClose = async ({ latitude, longitude }) => {
    const { data } = await useApi('winebars/' + latitude + '/' + longitude)
    setWinebars(data)
  }
  const getRestaurantsClose = async ({ latitude, longitude }) => {
    const { data } = await useApi('restaurants/' + latitude + '/' + longitude)
    setRestaurants(data)
  }
  useEffect(() => {
    if (currentLocation) {
      getEvents();
      getWineBarsClose(currentLocation.coords)
      getRestaurantsClose(currentLocation.coords)
    }
  }, [currentLocation])

  return (
    <View style={styles.container}>
      <View style={styles.header} safeArea>

        <LogoHorizontal height={40} width={200} />

      </View>
      <ScrollView refreshControl={<RefreshControl
        refreshing={refreshing}
        onRefresh={onRefresh}
        tintColor={color.brand}
        title="Refreshing"
      />} style={styles.scrollContainerOuter} 
        contentContainerStyle={styles.scrollContainerContentOuter}>
        {/* {permissionStatus == 'granted'?<>
        <View style={styles.locationContainer}>
          <Text>We need your location</Text>
          <Text>Current Status: {permissionStatus}</Text>
          {currentLocation?<>
            <Text>Current Location: {currentLocation.coords.latitude} {currentLocation.coords.longitude}</Text>
          </>:<></>}
          <Button onPress={() => launchLocationSettings()} label="Set Location" dark/>
          </View></>:<></>} */}
        <View style={styles.sectionHeader} row>
          <View style={{ flex: 1, justifyContent: 'flex-start' }}>
            <Text style={styles.title}>{i18n.t('upcoming_tastings')}</Text>
          </View>
          <View style={{ flex: 1, alignItems: 'flex-end' }}>
            <Text style={styles.title}>{i18n.t('see_all')}</Text>
          </View>
        </View>
        {events == null || events.length == 0 || events == undefined ? <>
          <FTNoEvent />
        </> : <>
          <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContainerContent} horizontal>

            {events.map((e, id) => <FTEventCardHorizontal key={id} {...e} />)}

          </ScrollView>
        </>}

        <View style={styles.sectionHeader} row>
          <View style={{ flex: 1, justifyContent: 'flex-start' }}>
            <Text style={styles.title}>{i18n.t('winebars_near')}</Text>
          </View>
          <View style={{ flex: 1, alignItems: 'flex-end' }}>
            <Text style={styles.title}>{i18n.t('see_all')}</Text>
          </View>
        </View>
        {currentLocation || winebars ? <>
          {winebars == null || winebars.length == 0 || winebars == undefined ? <>
            <NoWineBar />
          </> : <>
            <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContainerContent} horizontal>


              {winebars.map((e, id) => <FTWinebarCardHorizontal key={id} {...e} />)}

            </ScrollView>
          </>}
        </> : <>
          <SearchingWinebar />
        </>}

        <View style={styles.sectionHeader} row>
          <View style={{ flex: 1, justifyContent: 'flex-start' }}>
            <Text style={styles.title}>{i18n.t('restaurants_near')}</Text>
          </View>
          <View style={{ flex: 1, alignItems: 'flex-end' }}>
            <Text style={styles.title}>{i18n.t('see_all')}</Text>
          </View>
        </View>

        {currentLocation || restaurants ? <>
          {restaurants == null || restaurants.length == 0 || restaurants == undefined ? <>
            <NoRestaurant />
          </> : <>
            <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContainerContent} horizontal>


              {restaurants.map((e, id) => <FTWinebarCardHorizontal key={id} {...e} />)}

            </ScrollView>
          </>}
        </> : <>
          <SearchingRestaurants />
        </>}

      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#E9E1DD'
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContainerContent: {
    paddingHorizontal: 20,
  },
  scrollContainerOuter: {
    flex: 1,
  },
  scrollContainerContentOuter: {
    //paddingHorizontal: 20,
    height: 'auto',
    paddingBottom: Platform.OS === 'ios' ? 120 : 100,
  },
  sectionHeader: {
    marginHorizontal: 20,
    marginVertical: 10,
    alignItems: 'center',

  },
  header: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: color.brand,
    marginBottom: 5,
    paddingHorizontal: 20,
    paddingBottom: 5
  },
  title: {
    fontSize: brandFontSize.h2,

    color: color.text,
    fontFamily: brandFontFamily.h3,
  },
  locationContainer: {
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 10,
    flex: 1
  }
});
