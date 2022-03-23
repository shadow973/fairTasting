import Button from '@fair/components/common/Button';
import { useAuthContext } from '@fair/context/AuthContextProvider';
import { useApi } from '@fair/hooks/useApi';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, TouchableHighlight } from 'react-native';
import { useNavigation } from '@react-navigation/core';

import EditScreenInfo from '../../components/EditScreenInfo';
import Text from '@fair/components/common/Text';
import View from '@fair/components/common/View';
import { color } from '@fair/constants/Colors';
import moment from 'moment';
import i18n from 'i18n-js';
import { Constants } from 'expo-constants';
import FTEventCard from '@fair/components/custom/FTEventCard';
import FTNoEvent from '@fair/components/defaults/FTNoEvent';

export default function UpcomingEventsScreen() {
  const [events, setEvents] = useState([])

  useEffect(() => {
    getEvents()
  }, [])

  const getEvents = async () => {
    const { data } = await useApi('event')
    setEvents(data)
  }

  return (
    <View style={styles.container}>
      <View style={styles.header} safeArea>
        <Text style={styles.title}>{i18n.t('upcoming_tastings')}</Text>
      </View>
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContainerContent}>
        {events === null || events == undefined ? <>
          <FTNoEvent />
        </> : <>
          {events.map((e, id) => <FTEventCard key={id} {...e} />)}
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
    paddingTop: 20
  },
  header: {
    justifyContent: 'center',
    backgroundColor: color.brand
  },
  title: {
    fontSize: 30,
    paddingLeft: 20,
    paddingBottom: 20,
    color: '#E9E1DD',
    fontFamily: 'Sentient-Regular',
  },
});
