import Text from '@fair/components/common/Text';
import * as React from 'react';
import View from '@fair/components/common/View';
import { Image, ScrollView, StyleSheet, TouchableHighlight } from 'react-native';
import { color } from '@fair/constants/Colors';
import { brandFontFamily, brandFontSize } from '@fair/constants/Fonts';
import { useNavigation } from '@react-navigation/core';
import FTEventDate from '../FTEventDate';

interface CardProps {
    id: number
    name: string
    short_description: string
    event_start_time: string
    event_end_time: string
    mylink?: boolean

  }

const dummyImages = [
  'https://images.unsplash.com/photo-1568213816046-0ee1c42bd559?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8d2luZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8d2luZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1561461056-77634126673a?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8d2luZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8d2luZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
]
const FTEventCard = ({ id, name, short_description, event_start_time, event_end_time, mylink }:CardProps) => {
  const { navigate } = useNavigation();
  return (
    <TouchableHighlight onPress={() => mylink ? navigate('MyEventTickets', { id }): navigate('EventDetails', { id })} underlayColor="white">
      <View style={styles.eventCard}>
        <View style={{ overflow: 'hidden', backgroundColor: color.lightGrey, borderTopLeftRadius: 10, borderTopRightRadius: 10, height: 150 }}>
          <Image source={{ uri: dummyImages[id - 1] }} style={[StyleSheet.absoluteFill, { borderTopLeftRadius: 10, borderTopRightRadius: 10 }]} />
        </View>
        <View style={{ padding: 20 }}>
          <Text style={styles.eventName}>{name}</Text>
          <Text color={color.grey}>{short_description}</Text>
          <View row>
            <FTEventDate from={event_start_time} to={event_end_time} />
          </View>
        </View>

      </View>
    </TouchableHighlight>
  );
}

export default FTEventCard

const styles = StyleSheet.create({
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
        fontFamily: brandFontFamily.base,
      },
})