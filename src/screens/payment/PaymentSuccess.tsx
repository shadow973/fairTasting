import Button from '@fair/components/common/Button';
import { useAuthContext } from '@fair/context/AuthContextProvider';
import { useApi } from '@fair/hooks/useApi';
import React, { useEffect, useState } from 'react';
import { ColorPropType, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

import EditScreenInfo from '../../components/EditScreenInfo';
import Text from '@fair/components/common/Text';
import View from '@fair/components/common/View';
import { color } from '@fair/constants/Colors';
import moment from 'moment';
import { NavigationHelpersContext, useNavigation, useRoute } from '@react-navigation/core';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import i18n, { currentLocale } from 'i18n-js';

export default function PaymentSuccessScreen() {
    const { navigate } = useNavigation()
    const { user } = useAuthContext()
return (
    <View style={styles.container} safeArea>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 0 }}>
        <View style={styles.icon}>
            <Ionicons name="checkmark-circle-outline" size={230} color={color.brandLight} />
          </View>
          <Text style={styles.title}>{i18n.t('payment_success_header')}</Text>
          <Text style={styles.descriptiontext}>{i18n.t('payment_success_text')}</Text>
          <Text style={styles.descriptiontext}>{user?.email}</Text>
        <Button label={i18n.t('move_on')} onPress={() => navigate('UpcomingEvents')} dark></Button>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF'
  },
  title: {
    fontSize: 30,
    paddingBottom: 5,
    fontFamily: 'Sentient-Regular',
    color: color.brand,
    textAlign: 'center'
  },
  byText: {
    paddingLeft: 20,
    paddingBottom: 5,
    color: "#000000"
  },
  icon: {
    alignContent: 'center',
    alignItems: 'center'
  },
  dateText: {
    fontSize: 19,
    lineHeight: 35,
    fontWeight: "900",
    paddingBottom: 5,
    color: "#000000",
  },
  attendingText: {
    fontSize: 15,
    lineHeight: 35,
    paddingBottom: 5,
    color: "#000000",
  },
  descriptionHeader: {
    fontSize: 25,
    lineHeight: 35,
    paddingLeft: 20,
    paddingBottom: 5,
    color: "#000000"
  },
  descriptiontext: {
    fontSize: 18,
    lineHeight: 35,
    padding: 20,
    color: "#000000",
    textAlign: 'center'
  },
  eventCard: {
    backgroundColor: color.white,
    marginBottom: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  eventName: {
    fontSize: 20,
    fontFamily: 'Sentient-Regular',
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
  infoIcon: {
    paddingLeft: 20,
  },
  bottomIcon: {
    paddingLeft: 20,
    paddingTop: 5,
    lineHeight: 50,
  },
  bottomText: {
    fontSize: 25,
    paddingTop: 5,
    lineHeight: 50,
    textAlignVertical: "center",
    textAlign: "center"
  },
  buttonRight: {
    paddingRight: 20,

  },
  lineStyle: {
    borderWidth: 3,
    borderColor: '#E5E5E5',
    marginTop: 10,
    marginBottom: 10,
  },
  lineStyleSlim: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
    marginTop: 10,
    marginBottom: 10,
  }
});