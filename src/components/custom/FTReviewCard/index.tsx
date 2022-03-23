import Text from '@fair/components/common/Text';
import * as React from 'react';
import View from '@fair/components/common/View';
import { Alert, Image, ScrollView, StyleSheet, TouchableHighlight } from 'react-native';
import { color } from '@fair/constants/Colors';
import { brandFontFamily, brandFontSize } from '@fair/constants/Fonts';
import { useNavigation } from '@react-navigation/core';
import CountryFlag from "react-native-country-flag";
import FTEventDate from '../FTEventDate';
import { AutoFocus } from 'expo-camera/build/Camera.types';
import moment from 'moment';
import i18n from 'i18n-js';
import { MaterialCommunityIcons, Entypo, FontAwesome } from '@expo/vector-icons';
import { WineReviewRecord } from '@fair/constants/WineReview';

const FTReviewCard = (myReview: WineReviewRecord) => {
  const navigation = useNavigation();
  const days = moment(myReview.created_at).fromNow();
  const wine_id = myReview.wine_id
  return (
    <TouchableHighlight onPress={() => navigation.navigate('WineDetail', {wine_id})} underlayColor="white">
      <View style={styles.eventCard}>
        <View style={{flexDirection: 'row', margin: 20}}>
          <Image source={{ uri: 'https://cdn.fairtasting.com/'+myReview.image_path }} resizeMethod='resize' style={styles.imgStyle} />
          <View>
            <View style={styles.eventText}>
              <Text style={styles.producerName}>{myReview.producer_name}</Text>
              <Text style={styles.wineName}>{myReview.wine_name}</Text>
            </View>
            <View style={styles.viewStyle}>
              <CountryFlag isoCode={myReview.country_code || ''} size={12} style={styles.flagStyle} />
              <Text style={styles.producerName}>{myReview.country_name}</Text>
              <Entypo name='star' size={12} style={{paddingLeft: 10}}></Entypo>
              {myReview.ft_score > 0 ?<>
              <Text style={styles.producerName}>{myReview.ft_score}/100</Text>
              </>:<>
              <Text style={styles.producerName}>{i18n.t('myreview.calc_points')}</Text>
              </>}
            </View>
            { myReview.vintage > 0 && 
              <View style={styles.viewStyle}>
                <Image source={require('@assets/images/vintage.png')} style={styles.vintageStyle} />
                <Text style={styles.producerName}>{`${myReview.vintage}`}</Text>
              </View>
            }
          </View>
        </View>
        <View style={styles.reviewStyle}>
          <Text color='#71142D' style={{marginTop: 10}}>{days}</Text>
          <View style={{flexDirection: 'row'}}>
            <Entypo name='star' color='#71142D' size={20} style={{marginRight: 10}}></Entypo>
            <Text color='#71142D' style={styles.reviewTextStyle}>{myReview.score}/100</Text>
          </View>
        </View>
        {/* <View style={styles.editReviewStyle}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <MaterialCommunityIcons name="file-edit" size={16} color="#71142D" />
            <Text color='#71142D' style={{fontSize: 14, fontWeight: '500'}}>Edit View</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Entypo name="thumbs-up" size={16} color="grey" />
            <Text color='grey' style={styles.wineName}>3</Text>
            <FontAwesome name="comment" size={16} color="grey" style={{paddingLeft: 12}} />
            <Text color='grey' style={styles.wineName}>7</Text>
          </View>
        </View> */}
      </View>
    </TouchableHighlight>
  );
}

export default FTReviewCard

const styles = StyleSheet.create({
    eventCard: {
        backgroundColor: color.white,
        marginBottom: 15,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        elevation: 5,
      },
      eventText: {
        marginLeft: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5E5',
      },
      flagStyle: {
        marginRight: 3,
        borderRadius: 5,
      },
      producerName: {
        fontSize: 12,
        lineHeight: 14,
        fontWeight: '400',
        opacity: 0.8,
        fontFamily: brandFontFamily.base,
      },
      wineName: {
        fontSize: 16,
        lineHeight: 18,
        fontWeight: '400',
        fontFamily: brandFontFamily.base
      },
      imgStyle: {
        borderRadius: 10,
        height: 90,
        width: 75
      },
      vintageStyle: {
        height: 14,
        width: 13,
        marginRight: 3,
      },
      viewStyle: {
        flexDirection: 'row',
        marginLeft: 15,
        paddingTop: 10
      },
      reviewStyle: {
        backgroundColor: '#EBDEDE',
        height: 60,
        alignItems: 'center'
      },
      reviewTextStyle: {
        fontSize: 20,
        lineHeight: 22,
        fontWeight: '700'
      },
      editReviewStyle: {
        paddingHorizontal: 15,
        height: 40,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
      },
})