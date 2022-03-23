import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useMediaQuery } from 'react-responsive';
import View from '@fair/components/common/View';
import Text from '@fair/components/common/Text';
import { brandFontFamily } from '@fair/constants/Fonts';
import Divider from '@fair/components/common/Divider/index.web';
import WineBanner from '../../../../assets/images/SVG/winez-banner.svg';

interface FTFeatureRestaurantProps {
    location: string;
    title: string;
    image: string;
}

const FTFeatureRestaurantCard = ({ location, title, image }: FTFeatureRestaurantProps) => {
    const md = useMediaQuery({ maxWidth: 1350 });
    const sm = useMediaQuery({ maxWidth: 870 });

    return (
        <View style={[styles.featuredRestaurantCard, { width: sm ? '90%' : md ? '96%' : '30%' }]}>
            <Image style={styles.featuredRestaurantImage} source={image} />
            <Image source={WineBanner} style={styles.bannerSignUp} />
            <MaterialIcons name="bookmark-border" style={styles.icon} size={20} color="#FFFFFF" />
            <View style={styles.featuredFairDetails}>
                <Text style={[styles.itemTitle, { fontSize: sm ? 14 : md ? 16 : 18 }]}>{title}</Text>
                <View style={{ paddingBottom: 12, width: 50 }}>
                    <Divider />
                </View>
                <Text style={[styles.itemBy, { fontSize: sm ? 12 : md ? 14 : 16 }]}>{location}</Text>
            </View>
        </View>
    )
}


export default FTFeatureRestaurantCard;

const styles = StyleSheet.create({
    featuredRestaurantCard: {
        width: '30%',
        margin: 20,
        backgroundColor: '#FFFFFF',
        borderRadius: 5,
        shadowRadius: 5,
        shadowColor: '#E5E5E5',
        shadowOffset: {
            height: 15,
            width: 10,
        },
        shadowOpacity: 0.3,
    },
    featuredFairDetails: {
        flexDirection: 'column',
        padding: 20,
        width: '90%',
    },
    itemDate: {
        fontFamily: brandFontFamily.base,
        fontWeight: 'bold',
        color: '#947D50',
        fontSize: 16,
    },
    itemTitle: {
        fontWeight: 'bold',
        color: '#000000',
        marginTop: 14,
        fontSize: 18,
        width: '70%'
    },
    itemBy: {
        fontFamily: brandFontFamily.base,
        color: '#000000',
        fontSize: 16,
    },
    featuredRestaurantImage: {
        width: '100%',
        height: 200,
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5,
    },
    icon: {
        width: 14,
        height: 18,
        position: 'absolute',
        top: 10,
        right: 20
    },
    bannerSignUp: {
        width: 100,
        height: 120,
        position: 'absolute',
        top: 0,
        right: 0,
        borderTopRightRadius: 5
    },
})