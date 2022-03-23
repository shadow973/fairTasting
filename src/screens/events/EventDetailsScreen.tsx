import Button from '@fair/components/common/Button';
import { useApi } from '@fair/hooks/useApi';
import React, { useEffect, useState } from 'react';
import { ColorPropType, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import Text from '@fair/components/common/Text';
import View from '@fair/components/common/View';
import { color } from '@fair/constants/Colors';
import { brandFontFamily, brandFontSize } from '@fair/constants/Fonts';
import moment from 'moment';
import { NavigationHelpersContext, useNavigation, useRoute } from '@react-navigation/core';
import { AntDesign, Ionicons, Entypo } from '@expo/vector-icons';
import i18n from 'i18n-js';
import { useAuthContext } from '@fair/context/AuthContextProvider';
import FTEventDate from '@fair/components/custom/FTEventDate';
import FTLocation from '@fair/components/custom/FTLocation';
import FTCustomer from '@fair/components/custom/FTCustomer';

const basePath = 'https://cdn.fairtasting.com/'



export default function EventDetailsScreen() {
  const { user } = useAuthContext()
  const { navigate } = useNavigation();
  const [data, setData] = useState([])
  const [ticketData, setTicketData] = useState([])
  const [tickets, setTickets] = useState([])
  const { params } = useRoute()
  const { goBack } = useNavigation()

  const getEvent = async (id) => {
    const [event_data, ticket_data, available_ticket_data] = await Promise.all([useApi('event/' + id), useApi('event/' + id + '/ticket/sums'), useApi('event/' + id + '/tickets')]);
    return [event_data.data, ticket_data.data, available_ticket_data.data]
  }

  useEffect(() => {
    getEvent(params.id).then(([event_data, ticket_data, available_tickets]) => {
      setData(event_data);
      setTicketData(ticket_data);
      setTickets(available_tickets.reduce(function (prev, cur) {
        return prev.unit_price < cur.unit_price ? prev : cur;
      })
      );
    }
    );
  }, [])
  return (
    <View style={styles.container}>


      <ScrollView contentContainerStyle={{ paddingHorizontal: 0 }}>
        <View style={{ overflow: 'hidden', backgroundColor: color.lightGrey, height: 276 }}>
          <Image source={{ uri: basePath + (data.image_path?data.image_path:"images/no-image.png") }} style={StyleSheet.absoluteFill} />
        </View>
        <Text style={styles.title}>{data.name}</Text>
        <View row>
        <Text style={styles.byText}>{i18n.t('arranged_by')}:</Text>
        <FTCustomer id={data.customer_id}/>
        </View>
        <View row>
          <View style={styles.icon}>
            <AntDesign name="calendar" size={30} color={color.brand} />
          </View>
          <View style={styles.iconText}>
          <FTEventDate from={data.event_start_time} to={data.event_end_time} />
          </View>
        </View>
        {!data.is_virtual ? <>
          <View row>
            <View style={styles.icon}>
              <Entypo name="network" size={30} color={color.brand} />
            </View>
            <Text style={styles.dateText}>{i18n.t('event_is_virtual')}</Text>
          </View>
        </> : <>
        <View row>
            <View style={styles.icon}>
              <Ionicons name="ios-map-sharp" size={30} color={color.brand} />
            </View>
            <View style={styles.iconText}>
            <FTLocation id={data.event_location} long/>
            </View>
          </View>
        </>}
        <View style={styles.lineStyleSlim} />
        <View row>
          <View style={styles.icon}>
            <Ionicons name="people-outline" size={30} color={color.brand} />
          </View>
          <Text style={styles.attendingText}>{ticketData.tickets_issued} {i18n.t('event_signed_up')}</Text>
        </View>
        <View style={styles.lineStyle} />
        <Text style={styles.descriptionHeader}>
          {i18n.t('event_about')}
        </Text>
        <Text style={styles.descriptiontext}>
          {data.long_description}
        </Text>

      </ScrollView>
      <View footer>
        <View style={styles.lineStyleSlim} />
        <View row justify>
          <View style={styles.bottomIcon}>
            <AntDesign name="tag" size={30} color={color.brand} />
          </View>
          <View>
            <Text style={styles.bottomText}>{i18n.t('from_price')} {tickets.unit_price}</Text>
          </View>
          <View style={styles.buttonRight}>
            {user ? <>
            <Button label={i18n.t('event_signup')} onPress={() => navigate('TicketSelection', data)} dark />
            </>:<>
            <Button label={i18n.t('event_signup')} onPress={() => navigate('Welcome', data)} dark />
            </>}
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
  title: {
    fontSize: brandFontSize.h1,
    paddingLeft: 20,
    paddingTop: 20,
    paddingBottom: 5,
    fontFamily: brandFontFamily.h1,
    color: color.text,
  },
  byText: {
    paddingLeft: 20,
    marginRight: 5,
    paddingBottom: 5,
    color: "#000000"
  },
  icon: {
    paddingLeft: 20,
    paddingRight: 10
  },
  iconText: {
    alignItems: 'center',
    justifyContent: 'center'
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
    paddingLeft: 20,
    paddingBottom: 5,
    color: "#000000"
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
