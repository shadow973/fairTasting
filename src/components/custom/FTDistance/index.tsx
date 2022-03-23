import Text from '@fair/components/common/Text';
import * as React from 'react';
import { StyleSheet } from 'react-native'
import { color } from '@fair/constants/Colors';
import { brandFontFamily, brandFontSize } from '@fair/constants/Fonts';
import { useEffect, useState } from 'react';
import { useApi } from '@fair/hooks/useApi';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import View from '@fair/components/common/View';

const FTDistance = ({ distance }) => {
    const [dist, setDist] = useState(0)
    const [iskm, setIskm] = useState(false)

    useEffect(() => {
        getDistance()
    }, [distance])

    const getDistance = async () => {
        if (distance > 1000) {
            setDist((distance / 1000).toFixed(0))
            setIskm(true)
        } else {
            setDist(distance.toFixed(0))
            setIskm(false)
        }
    }
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
            <View style={styles.icon}>
                <MaterialCommunityIcons name="map-marker-distance" size={20} color={color.brand} />
            </View>
            <View style={styles.iconText}>
                <Text style={styles.customer}>{dist} {iskm ? "km" : "m"}
                </Text>
            </View>
        </View>
    )
}


export default FTDistance

const styles = StyleSheet.create({
    customer: {
        color: color.brand,
    },
    icon: {
        //paddingLeft: 20,
        paddingRight: 5
    },
    iconText: {
        alignItems: 'center',
        justifyContent: 'center'
    },
})