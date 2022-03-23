import Button from '@fair/components/common/Button';
import { useApi } from '@fair/hooks/useApi';
import React, { useEffect, useState } from 'react';
import { ColorPropType, Image, ScrollView, StyleSheet, TouchableOpacity, Linking, Pressable, Platform } from 'react-native';
import Text from '@fair/components/common/Text';
import View from '@fair/components/common/View';
import { color } from '@fair/constants/Colors';
import { brandFontFamily, brandFontSize } from '@fair/constants/Fonts';
import moment from 'moment';
import { NavigationHelpersContext, useNavigation, useRoute } from '@react-navigation/core';
import { AntDesign, Ionicons, Entypo, FontAwesome } from '@expo/vector-icons';
import i18n from 'i18n-js';
import { useAuthContext } from '@fair/context/AuthContextProvider';
import FTEventDate from '@fair/components/custom/FTEventDate';
import FTLocation from '@fair/components/custom/FTLocation';
import FTCustomer from '@fair/components/custom/FTCustomer';
import CustomerPresentation from '@fair/components/custom/CustomerPresentation';
import WineList from '@fair/components/custom/WineList';

const basePath = 'https://cdn.fairtasting.com/'



export default function CustomerDetailsScreen() {
    const { user } = useAuthContext()
    const { navigate } = useNavigation();
    const [customerData, setCustomerData] = useState([])
    const [ticketData, setTicketData] = useState([])
    const [tickets, setTickets] = useState([])
    const { params } = useRoute()
    const { goBack } = useNavigation()

    const getCustomer = async (id) => {
        const  data  = await useApi('customer/' + id)
        setCustomerData(data.data)
    }
    

    useEffect(() => {
        (async () => {
        await getCustomer(params.id)
    })();
    }, [])
    return (
        <View style={styles.container}>
            {customerData !== undefined ? <>

                <ScrollView contentContainerStyle={{ paddingHorizontal: 0 }}>
                    <View style={{ overflow: 'hidden', backgroundColor: color.lightGrey, height: 276 }}>
                        <Image source={{ uri: basePath + (customerData.image_path ? customerData.image_path : "images/no-image.png") }} style={StyleSheet.absoluteFill} />
                    </View>
                    <Text style={styles.title}>{customerData.name}</Text>
                    <View style={{width: 40, borderTopWidth: 2, marginLeft: 20, borderColor: '#E5E5E5', paddingBottom: 10}}></View>

                    <View style={styles.iconRow} row>
                        <View style={styles.icon}>
                            <FontAwesome name="map-marker" size={brandFontSize.base} color={color.brand} />
                        </View>
                        <View style={styles.iconText}>
                            <FTLocation id={customerData.location_id} long />
                        </View>
                    </View>
                    <View style={styles.iconRow} row>
                        <View style={styles.icon}>
                            <FontAwesome name="clock-o" size={brandFontSize.base} color={color.brand} />
                        </View>
                        <View style={styles.iconText}>
                            <Text>{i18n.t('coming_soon')}</Text>
                        </View>
                    </View>
                    {customerData.phone?<>
                    <Pressable onPress={()=>Linking.openURL('tel://'+customerData.phone)}>
                    <View style={styles.iconRow} row>
                        <View style={styles.icon}>
                            <FontAwesome name="phone" size={brandFontSize.base} color={color.brand} />
                        </View>
                        <View style={styles.iconText}>
                            <Text>{customerData.phone}</Text>
                        </View>
                    </View>
                    </Pressable>
                    </>:<></>}

                    <View style={styles.lineStyle} />
                    <Text style={styles.descriptionHeader}>
                        {i18n.t('about')} {customerData.name}
                    </Text>
                    <CustomerPresentation id={customerData.id} />

                    <View style={styles.lineStyle} />
                    <Text style={styles.descriptionHeader}>
                        {i18n.t('winelist')}
                    </Text>
                    <WineList id={customerData.id} />


                </ScrollView>
                {/* <View footer>
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
            <Button label={i18n.t('event_signup')} onPress={() => navigate('TicketSelection', customerData)} dark />
            </>:<>
            <Button label={i18n.t('event_signup')} onPress={() => navigate('Welcome', customerData)} dark />
            </>}
          </View>
        </View>
      </View> */}
            </> : <></>}
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
    iconRow:{
        marginBottom: 10,
    },
    icon: {
        paddingLeft: 20,
        flex: 0.05,
    },
    iconText: {
        justifyContent: 'center',
        flex: 1
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
