import Text from '@fair/components/common/Text';
import * as React from 'react';
import View from '@fair/components/common/View';
import { Image, ScrollView, StyleSheet, TouchableHighlight } from 'react-native';
import { color } from '@fair/constants/Colors';
import { brandFontFamily, brandFontSize } from '@fair/constants/Fonts';
import i18n from 'i18n-js';

const nowine = 'https://cdn.fairtasting.com/images/no-winebar.jpeg'

const NoWineBar = () => {
    return (
        <View style={styles.eventCard}>
            <View style={styles.textContainer}>
                <Text style={styles.text} type='text'>{i18n.t('no_winebar_near')}</Text>
            </View>

        </View>
    );
}

export default NoWineBar

const styles = StyleSheet.create({
    eventCard: {
        backgroundColor: color.white,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        height:'auto',
        marginHorizontal: 20,
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        width: 'auto',
        elevation: 5,
        marginVertical: 40,
    },
    eventName: {
        fontSize: 20,
        fontFamily: brandFontFamily.base,
    },
    imageContainer:{
        backgroundColor: color.lightGrey, 
        borderTopLeftRadius: 10, 
        borderTopRightRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image:{
        ...StyleSheet.absoluteFillObject,
        height: 400, 
        width: 400, 
        resizeMode: 'contain', 
        borderTopLeftRadius: 10, 
        borderTopRightRadius: 10
    },
    textContainer:{
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
    },
    text:{
        fontFamily: brandFontFamily.h1,
        // fontSize: brandFontSize.h2
    }
})