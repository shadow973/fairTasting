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
import FTWebLayout from '@fair/components/custom/FTWebLayout/index.web';
import FullWidthImage from 'react-native-fullwidth-image';


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
        const data = await useApi('customer/' + id)
        setCustomerData(data.data)
    }
    

    useEffect(() => {
        (async () => {
            await getCustomer(params.id)
        })();
        
    }, [params])
    return (
        <FTWebLayout>
                 
            <View style={styles.container}>
                {customerData !== undefined ? <>

                    <ScrollView contentContainerStyle={{ paddingHorizontal: 0 }}>
                        <View style={styles.heroContainer}>
                            <View
                                style={styles.linearGradient}
                            />
                            <FullWidthImage
                                source={{ uri: basePath + (customerData.image_path ? customerData.image_path : "images/no-image.png") }}
                                style={{ maxHeight: 500 }}
                            />


                            <View style={styles.heroHeaderContainer}>
                                <View style={styles.heroHeaderTextContainer}>
                                    <Text style={styles.heroHeaderText}>{customerData.name}</Text>

                                    <View style={styles.iconRow} row>
                                        <View style={styles.icon}>
                                            <FontAwesome name="map-marker" size={brandFontSize.h3} color={color.white} />
                                        </View>
                                        <View style={styles.iconText}>
                                            <FTLocation id={customerData.location_id} long white />
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>

                        <View style={styles.mainContent} row>
                            <View style={{flex: 0.8}}>
                                <Text style={styles.descriptionHeader}>
                                    {i18n.t('about')} {customerData.name}
                                </Text>
                                <CustomerPresentation id={customerData.id} />

                                <View style={styles.lineStyleSlim} />
                                <Text style={styles.descriptionHeader}>
                                    {i18n.t('winelist')}
                                </Text>
                                <WineList id={customerData.id} />

                            </View>
                       
                        <View style={{flex: 0.2, marginLeft: 30}}>
                            {customerData.phone ? <>
                                <Pressable onPress={() => Linking.openURL('tel://' + customerData.phone)}>
                                    <View style={{alignItems: 'center', marginVertical: 25}} row>
                                        <View style={{flex: 0.05}}>
                                            <FontAwesome name="phone" size={brandFontSize.h3} color={color.brand} />
                                        </View>
                                        <View style={{fontSize: brandFontSize.h3}}>
                                            <Text style={{fontSize: brandFontSize.h3}}>{customerData.phone}</Text>
                                        </View>
                                    </View>
                                </Pressable>
                            </> : <></>}
                            
                        </View>
                        </View>
                    </ScrollView>

                </> : <></>}
            </View>
        </FTWebLayout>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#FFFFFF'
    },
    mainContent: {
        marginHorizontal: 100
    },
    title: {
        fontSize: brandFontSize.h1,
        paddingLeft: 20,
        paddingTop: 20,
        paddingBottom: 5,
        fontFamily: brandFontFamily.h1,
        color: color.text,
    },
    iconRow: {
        marginBottom: 10,
        alignItems: 'center'
    },
    icon: {
        //paddingLeft: 20,
        flex: 0.1,
    },
    iconText: {
        justifyContent: 'center',
        flex: 0.9
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
        fontFamily: brandFontFamily.h1,
        fontSize: brandFontSize.h2,
        lineHeight: 35,
        paddingBottom: 5,
        color: "#000000",
        marginVertical: 30
    },
    descriptiontext: {
        fontFamily: brandFontFamily.h1,
        fontSize: brandFontSize.h2,
       
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
    },
    heroContainer: {
        position: "relative"
    },
    heroHeaderTextContainer: {
        marginBottom: 25
    },
    heroHeaderContainer: {
        left: 0,
        top: 0,
        right: 0,
        bottom: "25%",
        position: "absolute",
        alignItems: "flex-start",
        justifyContent: "center",
        marginLeft: 150,
        zIndex: 20
    },
    heroHeaderText: {
        fontSize: 50,
        fontFamily: brandFontFamily.h1,
        color: "white",
    },
    heroHeaderSubText: {
        fontSize: brandFontSize.h1,
        fontFamily: brandFontFamily.base,
        color: "white",
    },
    heroDateText: {
        fontSize: brandFontSize.h1,
        fontFamily: brandFontFamily.base,
        color: "white",
        marginBottom: 30
    },
    linearGradient: {
        position: "absolute",
        zIndex: 1,
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'black',
        opacity: 0.55
    },
});
