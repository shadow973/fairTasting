import Text from '@fair/components/common/Text';
import * as React from 'react';
import View from '@fair/components/common/View';
import { ActivityIndicator, Image, ScrollView, StyleSheet, TouchableHighlight } from 'react-native';
import { color } from '@fair/constants/Colors';
import { brandFontFamily, brandFontSize } from '@fair/constants/Fonts';
import i18n from 'i18n-js';

const SearchingRestaurants = () => {
    return (
        <View style={styles.eventCard}>
            <View style={{ overflow: 'hidden', backgroundColor: color.lightGrey, borderTopLeftRadius: 10, borderTopRightRadius: 10, height: 117, alignItems:'center', justifyContent:'center' }}>
            <ActivityIndicator size="large" color={color.brand} />
            </View>
            <View style={{alignItems:'center', justifyContent: 'center' }}>
                <Text style={styles.eventName}>{i18n.t('searching_restaurants')}</Text>
            </View>

        </View>
    );
}

export default SearchingRestaurants

const styles = StyleSheet.create({
    eventCard: {
        backgroundColor: color.white,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        height: 222,
        elevation: 5,
        marginHorizontal: 20
    },
    eventName: {
        fontSize: brandFontSize.h2,
        fontFamily: brandFontFamily.h1,
        marginVertical: 30
    },
})