import Text from '@fair/components/common/Text';
import * as React from 'react';
import View from '@fair/components/common/View';
import { Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { color } from '@fair/constants/Colors';
import { brandFontFamily, brandFontSize } from '@fair/constants/Fonts';
import { useNavigation } from '@react-navigation/core';
import FTEventDate from '../FTEventDate';
import moment from 'moment'

interface OrderProps {
    id: number
    currency: string
    customer_id: string
    event_id: string
    created_at: string
    completed_at: string
    order_total: number
    payment_reference: string

}

const FTOrder = ({ id, currency, customer_id, event_id, created_at, completed_at, order_total, payment_reference }: OrderProps) => {
    const { navigate } = useNavigation();
    return (
        <TouchableOpacity>
            <View style={styles.eventCard}>
                <View row>
                    <View style={styles.date}>
                    <Text style={styles.ordertext}>{moment(created_at).format('DD MMMM YY - HH:mm')}</Text>
                    </View>
                    <View style={styles.amount}>
                    <Text style={styles.ordertext}>{currency} {order_total}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}

export default FTOrder

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
        paddingHorizontal: 5,
        paddingVertical: 10
    },
    ordertext: {
        fontSize: 20,
        fontFamily: brandFontFamily.base,
    },
    date: {
        flex:1,
    },
    amount: {
        flex: 1,
        alignItems: 'flex-end'
    }
})