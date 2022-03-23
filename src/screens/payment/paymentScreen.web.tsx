import React, { useEffect, useState } from 'react';
import { ColorPropType, Image, ScrollView, StyleSheet, TouchableOpacity, Alert, Platform, ActivityIndicator } from 'react-native';
import Text from '@fair/components/common/Text';
import View from '@fair/components/common/View';
import { color } from '@fair/constants/Colors';

import i18n, { currentLocale } from 'i18n-js';


export default function CardPaymentScreen() {
    

    return (
        <View style={styles.container}>
            <View style={styles.header} safeArea>
                <Text style={styles.title}>{i18n.t('checkout')}</Text>
            </View>
           

                
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
    },
    header: {
        alignItems: 'center',
        backgroundColor: color.brand
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        zIndex: 1,
        paddingTop: 20
    },
    title: {
        fontSize: 30,
        paddingBottom: 20,
        color: '#E9E1DD',
        fontFamily: 'Sentient-Regular',
    },
    byText: {
        fontSize: 19,
        paddingLeft: 20,
        lineHeight: 35,
        fontWeight: "900",
        paddingBottom: 5,
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
    ticketDescription: {
        fontSize: 20,
        lineHeight: 35,
        paddingLeft: 20,
        color: "#000000",
    },
    ticketPrice: {
        fontSize: 20,
        lineHeight: 35,
        color: "#000000",
    },
    billingHeader: {
        fontSize: 25,
        lineHeight: 35,
        padding: 20,
        color: color.brand
    },
    billingText: {
        fontSize: 18,
        paddingLeft: 20,
        color: "#000000",
        fontFamily: 'Roboto_100Thin'
    },
    billingEmail: {
        fontSize: 18,
        lineHeight: 35,
        paddingLeft: 20,
        paddingTop: 10,
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
    },
    paymentSelectorActive: {
        borderWidth: 2,
        borderColor: color.brand,
        borderRadius: 5,
        paddingVertical: 20,
        paddingHorizontal: 55,
        marginBottom: 20,
        zIndex: 1
    },
    paymentSelector: {
        backgroundColor: '#F0F0F0',
        borderRadius: 5,
        marginLeft: 20,
        paddingVertical: 20,
        paddingHorizontal: 55,
        marginBottom: 20,
    },
    addressContainer: {
        textAlign: 'right',
        textAlignVertical: 'center',
        flex: 2
    },
    addressInputContainer: {
        textAlign: 'right',
        textAlignVertical: 'center',
        flex: 1,
        paddingHorizontal: 20
    },
    changeContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    changeLink: {
        textAlign: 'right',
        color: color.brand,
        fontSize: 20,
    }
});
