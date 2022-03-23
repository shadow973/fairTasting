import Text from '@fair/components/common/Text';
import * as React from 'react';
import View from '@fair/components/common/View';
import { Image, ScrollView, StyleSheet, TouchableHighlight } from 'react-native';
import { color } from '@fair/constants/Colors';
import { brandFontFamily, brandFontSize } from '@fair/constants/Fonts';
import { useNavigation } from '@react-navigation/core';
import FTEventDateShort from '../FTEventDateShort';
import FTEventDate from '../FTEventDate';
import FTLocation from '../FTLocation';


interface CardProps {
    id: number
    name: string
    short_description: string
    event_start_time: string
    event_end_time: string
    image_path: string
    event_location: number
    mylink?: boolean

}
const basePath = 'https://cdn.fairtasting.com/'

const FTEventCardHorizontal = ({ id, name, short_description, event_start_time, event_end_time, image_path, event_location, mylink }: CardProps) => {
    const { navigate } = useNavigation();
    return (
        <TouchableHighlight onPress={() => mylink ? navigate('MyEventTickets', { id }) : navigate('EventDetails', { id })} underlayColor="white">
            <View style={styles.eventCard}>
                <View style={styles.imageContainer}>
                    <Image source={{ uri: basePath + image_path }} style={[StyleSheet.absoluteFill, { borderTopLeftRadius: 10, borderTopRightRadius: 10 }]} />
                </View>
                <View style={styles.informationContainer}>
                    <Text style={styles.eventName}>{name}</Text>
                    <View style={styles.eventDate}>
                        <FTEventDateShort from={event_start_time} to={event_end_time} />
                    </View>
                    <View style={styles.eventLocation}>
                        <FTLocation id={event_location} />
                    </View>
                    
                </View>

            </View>
        </TouchableHighlight>
    );
}

export default FTEventCardHorizontal

const styles = StyleSheet.create({
    eventCard: {
        backgroundColor: color.white,
        width: 230,
        height: 222,
        marginBottom: 10,
        marginRight: 10,
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
    imageContainer: {
        overflow: 'hidden', 
        backgroundColor: color.lightGrey, 
        borderTopLeftRadius: 10, 
        borderTopRightRadius: 10, 
        height: 117
    },
    informationContainer: {
        padding: 10
    },
    eventName: {
        fontSize: 20,
        fontFamily: brandFontFamily.h1,
        marginVertical: 5
    },
    eventDate: {
        marginVertical: 5
    },
    eventLocation: {
        marginVertical: 5
    },
})