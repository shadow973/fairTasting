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
            <View style={{ overflow: 'hidden', backgroundColor: color.lightGrey, borderTopLeftRadius: 10, borderTopRightRadius: 10, height: 117 }}>
                <Image source={{ uri: nowine }} style={[StyleSheet.absoluteFill, { borderTopLeftRadius: 10, borderTopRightRadius: 10 }]} />
            </View>
            <View style={{ padding: 20 }}>
                <Text>{i18n.t('no_winebar_near')}</Text>
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
        height:222,
        marginHorizontal: 20,
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    eventName: {
        fontSize: 20,
        fontFamily: brandFontFamily.base,
    },
})