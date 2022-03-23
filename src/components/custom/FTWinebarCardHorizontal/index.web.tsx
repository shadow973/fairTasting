import Text from '@fair/components/common/Text';
import * as React from 'react';
import View from '@fair/components/common/View';
import { Image, Pressable, ScrollView, StyleSheet, TouchableHighlight } from 'react-native';
import { color } from '@fair/constants/Colors';
import { brandFontFamily, brandFontSize } from '@fair/constants/Fonts';
import { useNavigation } from '@react-navigation/core';
import FTEventDateShort from '../FTEventDateShort';
import FTEventDate from '../FTEventDate';
import FTLocation from '../FTLocation';
import FTDistance from '../FTDistance';


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

const FTWinebarCardHorizontal = ({ id, name, short_description, event_start_time, event_end_time, image_path, location_id, distance, mylink }: CardProps) => {
    const { navigate } = useNavigation();
    return (
        <Pressable style={{cursor: 'pointer'}} onPress={() => navigate('WinebarDetails', { id })} underlayColor="white">
            <View style={styles.eventCard}>
                <View style={styles.imageContainer}>
                    <Image source={{ uri: basePath + (image_path?image_path:"images/no-image.png") }} style={[StyleSheet.absoluteFill, { borderTopLeftRadius: 10, borderTopRightRadius: 10 }]} />
                </View>
                <View style={styles.informationContainer}>
                    <Text style={styles.eventName}>{name}</Text>
                    
                    <View style={styles.eventLocation}>
                        <FTLocation id={location_id} />
                    </View>
                    
                </View>

            </View>
        </Pressable>
    );
}

export default FTWinebarCardHorizontal

const styles = StyleSheet.create({
    eventCard: {
        backgroundColor: color.white,
        width: 357,
        height: 355,
        marginVertical: 10,
        marginHorizontal: 20,
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
        height: 237
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