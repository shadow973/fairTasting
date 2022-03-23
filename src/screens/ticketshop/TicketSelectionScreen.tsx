import Button from '@fair/components/common/Button';
import { useApi } from '@fair/hooks/useApi';
import React, { useEffect, useState } from 'react';
import { ColorPropType, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import Text from '@fair/components/common/Text';
import View from '@fair/components/common/View';
import TastingTicketSelector from '@fair/components/custom/TastingTicketSelector'
import { color } from '@fair/constants/Colors';
import moment from 'moment';
import { NavigationHelpersContext, useNavigation, useRoute } from '@react-navigation/core';
import { AntDesign, Ionicons, Entypo } from '@expo/vector-icons';
import i18n from 'i18n-js';
import { useCartContext } from '@fair/context/CartContextProvider';

const isSameDate = (from, to) => moment(from).format('DD MM YY') === moment(to).format('DD MM YY')

const EventDateTime = ({ from, to }) => (
  <Text style={styles.dateText} color={color.brand}>{
    (isSameDate(from, to) ? '' : `${moment(from).format('DD')} - `) +
    `${moment(to).format('DD MMMM')} ${moment(from).format('HH:mm')} - ${moment(to).format('HH:mm')}`
  }
  </Text>
)

export default function EventDetailsScreen() {
  const { params } = useRoute()
  const { items } = useCartContext()
  const { goBack } = useNavigation()
  const { navigate } = useNavigation();
  const [virtual, setVirtual] = React.useState(false)
  const [tickets, setTickets] = useState([])
  useEffect(() => {
    setVirtual(params.is_virtual)
    getEventTickets(params.id)
  }, [])

  const getEventTickets = async (id) => {
    const { data } = await useApi('event/' + id + '/tickets')
    setTickets(data)
  }
  const cartTotal = parseFloat(items.reduce(function (prev, cur) {
    const total = prev + (cur.unit_price * cur.quantity)
    return total
  }, 0.00)).toFixed(2);
  return (
    <View style={styles.container}>
      <View style={styles.header} safeArea>
        <Text style={styles.title}>{params.name}</Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 0 }}>
        <Text style={styles.descriptionHeader}>
          {i18n.t('time_and_place')}
        </Text>
        <View row>
          <View style={styles.icon}>
            <AntDesign name="calendar" size={30} color={color.brand} />
          </View>
          <EventDateTime from={params.event_start_time} to={params.event_end_time} />
        </View>
        {!virtual ? <>
          <View row>
            <View style={styles.icon}>
              <Ionicons name="ios-map-sharp" size={30} color={color.brand} />
            </View>
            <Text style={styles.dateText}>Bella Center</Text>
          </View>
        </> : <>
          <View row>
            <View style={styles.icon}>
              <Entypo name="network" size={30} color={color.brand} />
            </View>
            <Text style={styles.dateText}>{i18n.t('event_is_virtual')}</Text>
          </View>
        </>}
        <View style={styles.lineStyleSlim} />
        <Text style={styles.descriptionHeader}>
          {i18n.t('tickets')}
        </Text>
        {tickets === null ? <>
          <View style={styles.eventCard}>
            <View style={{ padding: 20 }}>
              <Text>{i18n.t('no_tasting')}</Text>
            </View>

          </View>

        </> : <>
          {tickets.map((e, id) => <TastingTicketSelector key={id} {...e} />)}
        </>}

      </ScrollView>
      <View footer>
        <View style={styles.lineStyleSlim} />
        <View row justify>
          
            <View style={styles.bottomIcon}>
              <AntDesign name="tag" size={30} color={color.brand} />
            </View>
            <Text style={styles.bottomText}>
            {cartTotal > 0 ? <>
              {i18n.t('total')} {cartTotal}
              </> : <></>}
              </Text>
         
          <View style={styles.buttonRight}>
            <Button label={i18n.t('checkout')} onPress={() => navigate('Payment')} dark />
          </View>
        </View>
      </View>
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
    backgroundColor: '#FFFFFF'
  },
  border: {
    marginHorizontal: 20,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 15,
    paddingVertical: 10
  },
  title: {
    fontSize: 30,
    paddingBottom: 20,
    color: '#E9E1DD',
    fontFamily: 'Sentient-Regular',
  },
  totalAmount: {
    fontSize: 25,
    textAlignVertical: "center",
    textAlign: "center",
    paddingTop: 15,
    lineHeight: 35,
    color: "#000000",
  },
  icon: {
    paddingLeft: 20,
    paddingRight: 10
  },
  dateText: {
    fontSize: 19,
    paddingLeft: 20,
    lineHeight: 35,
    fontWeight: "900",
    paddingBottom: 5,
    color: "#000000",
  },
  descriptionHeader: {
    fontSize: 25,
    lineHeight: 35,
    paddingLeft: 20,
    paddingTop: 10,
    paddingBottom: 5,
    color: "#000000"
  },
  descriptiontext: {
    fontSize: 18,
    lineHeight: 35,
    paddingLeft: 20,
    paddingBottom: 5,
    color: "#000000"
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
    paddingTop: 15,
  },
  bottomText: {
    fontSize: 25,
    paddingTop: 15,
    textAlignVertical: "center",
    textAlign: "center"
  },
  buttonRight: {
    paddingRight: 20,

  },
  lineStyleSlim: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
    marginTop: 10,
    marginBottom: 10,
  },
  header: {
    alignItems: 'center',
    backgroundColor: color.brand
  },
});
