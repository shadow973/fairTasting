import React from 'react';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useMediaQuery } from 'react-responsive';
import Text from '@fair/components/common/Text';
import View from '@fair/components/common/View';
import { brandFontFamily } from '@fair/constants/Fonts';
import Divider from '@fair/components/common/Divider/index.web';
import WineBanner from '../../../../assets/images/SVG/winez-banner.svg';

interface FeatureFairCardProps {
    date: string;
    title: string;
    by: string;
    image: string;
    navigation: object;
}

const FTFeatureFairCard = ({ date, title, by, image, navigation }: FeatureFairCardProps) => {
    const md = useMediaQuery({ maxWidth: 1350 });
    const sm = useMediaQuery({ maxWidth: 870 });

    return (
        <TouchableOpacity onPress={() => navigation.navigate('FairDetails')} style={[styles.featuredFairCard, { width: sm ? '90%' : md ? '96%' : '47%' }]}>
            <View style={styles.featuredFairDetails}>
                <Text style={[styles.itemDate, { fontSize: sm ? 12 : md ? 14 : 16 }]}>{date}</Text>
                <Text style={[styles.itemTitle, , { fontSize: sm ? 14 : md ? 16 : 18 }]}>{title}</Text>
                <View style={{ paddingBottom: 12, width: 50 }}>
                    <Divider />
                </View>
                <Text style={[styles.itemBy, { fontSize: sm ? 12 : md ? 14 : 16 }]}>{by}</Text>
            </View>
            <Image style={[styles.featuredFairImage, { width: sm ? 80 : md ? 120 : 140 }]} source={image} />
            <Image source={WineBanner} style={[styles.bannerSignUp, { width: sm ? 70 : md ? 100 : 120, height: sm ? 70 : md ? 100 : 120 }]} />
            <MaterialIcons name="bookmark-border" style={[styles.icon, { top: sm ? 5 : 10, right: sm ? 10 : 20 }]} size={20} color="#FFFFFF" />
        </TouchableOpacity>
    )
}


export default FTFeatureFairCard

const styles = StyleSheet.create({
    featuredFairCard: {
        width: '47%',
        margin: 20,
        backgroundColor: '#FFFFFF',
        borderRadius: 5,
        shadowColor: '#E5E5E5',
        shadowOpacity: 0.3,
        shadowOffset: {
            height: 15,
            width: 10
        },
        shadowRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
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
    featuredFairImage: {
        width: 140,
        height: '100%',
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        position: 'absolute',
        right: 0,
        top: 0,
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