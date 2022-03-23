import Text from '@fair/components/common/Text';
import * as React from 'react';
import View from '@fair/components/common/View';
import { Image, ScrollView, StyleSheet, TouchableHighlight } from 'react-native';
import { color } from '@fair/constants/Colors';
import { brandFontFamily, brandFontSize } from '@fair/constants/Fonts';
import i18n from 'i18n-js';

const nowine = 'https://images.unsplash.com/photo-1583692560956-f29bbbe23e90?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'

const FTNoOrders = () => {
    return (
        <View style={styles.eventCard}>
            <View style={{ overflow: 'hidden', backgroundColor: color.lightGrey, borderTopLeftRadius: 10, borderTopRightRadius: 10, height: 250 }}>
                <Image source={{ uri: nowine }} style={[StyleSheet.absoluteFill, { borderTopLeftRadius: 10, borderTopRightRadius: 10 }]} />
            </View>
            <View style={{ padding: 20 }}>
                <Text>{i18n.t('no_orders_found')}</Text>
            </View>

        </View>
    );
}

export default FTNoOrders

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