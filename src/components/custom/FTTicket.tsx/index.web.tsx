import Text from '@fair/components/common/Text';
import * as React from 'react';
import View from '@fair/components/common/View';
import { Image, ScrollView, StyleSheet, TouchableHighlight } from 'react-native';
import { color } from '@fair/constants/Colors';
import { brandFontFamily, brandFontSize } from '@fair/constants/Fonts';

import moment from 'moment';
import i18n from 'i18n-js';

interface TicketProps {
    id: number
    ticket_key: string
    user_id: number
    event_id: number
    ticket_product_id: number
    created: string
    valid_from: string
    valid_to: string
    multi_use: boolean
    first_used: string
    last_used: string
    product_name: string
    mylink?: boolean

}

const FTTicket = ({ id, ticket_key, user_id, ticket_product_id, created, valid_from, valid_to, multi_use, first_used, last_used, product_name, mylink }: TicketProps) => {
    return (
        <View style={styles.eventCard}>
       <Text>Something</Text>
        </View>
    );
}

export default FTTicket

const styles = StyleSheet.create({
    eventCard: {
        backgroundColor: color.white,
        marginBottom: 15,
        borderRadius: 10,
        shadowColor: "#000",
        paddingHorizontal: 20,
        marginHorizontal: 5,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    ticketName: {
        fontSize: brandFontSize.h1,
        fontFamily: brandFontFamily.h1,
    },
    ticketTextRow: {
        paddingVertical: 5,
    },
    ticketText: {
        fontSize: brandFontSize.base,
        fontFamily: brandFontFamily.base,
    },
    ticketLabel: {
        paddingRight: 10,
        fontFamily: brandFontFamily.h1,
    },
    qrcode: {
        backgroundColor: color.lightGrey,
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginVertical: 10,
        borderRadius: 10,
        height: 300,
        alignItems: 'center',
        justifyContent: 'center'
    },
    infoFlex: {
        flex: 1
    },
    bottomFlex: {
        flex: 5
    }
})