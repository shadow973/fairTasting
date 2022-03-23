import Button from '@fair/components/common/Button';
import Card from '@fair/components/common/Card';
import Text from '@fair/components/common/Text';
import View from '@fair/components/common/View';
import { useAuthContext } from '@fair/context/AuthContextProvider';
import { ColorPropType, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { NavigationHelpersContext, useNavigation, useRoute } from '@react-navigation/core';
import i18n from 'i18n-js';
import { color } from '@fair/constants/Colors';
import { brandFontFamily, brandFontSize } from '@fair/constants/Fonts';
import { AntDesign, Ionicons, Entypo } from '@expo/vector-icons';
import { useApi } from '@fair/hooks/useApi';
import FTEventCard from '@fair/components/custom/FTEventCard';
import FTNoEvent from '@fair/components/defaults/FTNoEvent';


export default function MyTicketsScreen() {
  const { user, logout } = useAuthContext()
  const { navigate, goBack } = useNavigation();
  const [events, setEvents] = useState([]);

  const getMyEvents = async () => {
    const { data } = await useApi('user/my/events');
    setEvents(data);
};
useEffect(()=>{
    getMyEvents();
},[]);
  return (
    <View style={styles.container}>
      <View style={styles.header} safeArea>
        <Text style={styles.title}>{i18n.t('my_events')}</Text>
      </View>
      <ScrollView style={styles.scrollContainerContent}>
      {events === null || events == undefined ? <>
          <FTNoEvent />
        </> : <>
          {events.map((e, id) => <FTEventCard key={id} {...e} mylink />)}
        </>}
      </ScrollView>
      <TouchableOpacity onPress={() => goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={25} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  scrollContainerContent: {
    paddingHorizontal: 20,
    paddingTop: 20
  },
  header: {
    alignItems: 'center',
    backgroundColor: color.brand,
    paddingVertical: 10
  },
  title: {
    fontSize: brandFontSize.h2,
    fontFamily: brandFontFamily.h3,
    color: color.white,
    paddingBottom: 10
  },
  name: {
    fontSize: brandFontSize.base,
    fontFamily: brandFontFamily.base,
    color: color.grey,
    paddingBottom: 10
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  nameContainer: {
    flex: 2,
    paddingVertical: 20,
    justifyContent: 'center'
  },
  picContainer: {
    flex: 1,
    paddingVertical: 20,
    alignItems:'center',
    justifyContent: 'center'
  },
  lineStyleSlim: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
    marginTop: 5,
    marginBottom: 5,
  },
  lineStyleMedium: {
    borderWidth: 3,
    borderColor: '#E5E5E5',
    marginTop: 5,
    marginBottom: 5,
  },
  menuItem: {
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    height: 40,
    width: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
});
