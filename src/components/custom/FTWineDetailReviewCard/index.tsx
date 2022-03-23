import React, { useCallback, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { FontAwesome, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons'; 
import { TouchableOpacity } from 'react-native-gesture-handler';
import { brandFontFamily, brandFontSize } from '@fair/constants/Fonts';
import moment from 'moment';


interface ReviewProps {
  avatar: any
  username: string
  date?: Date
  score: number
  description: string
  recommend_number: number
}

const FTWineDetailReviewCard = (review: ReviewProps) => {
  const [more, setMore] = useState(false);
  const [lengthMore,setLengthMore] = useState(false);
  const toggleNumberOfLines = () => { //To toggle the show text or hide it
    setMore(!more);
  }

  const onTextLayout = useCallback(e =>{
    setLengthMore(e.nativeEvent.lines.length >=2);
  },[]);

  return(
    <View style={styles.container}>
      <View style={{justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row'}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image source={review.avatar} style={styles.avatar}></Image>
          <View style={{marginLeft: 10}}>
            <Text style={styles.userName}>{review.username}</Text>
            {/* <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <FontAwesome5 name="user-friends" size={15} color="#91868A" />
              <Text style={styles.numberStyle}> 33</Text>
              <FontAwesome name="comment" size={15} color="#91868A"></FontAwesome>
              <Text style={styles.numberStyle}> 14</Text>
            </View> */}
          </View>
        </View>
        <View style={{flexDirection: 'row'}}>
          <MaterialCommunityIcons name="calendar-range-outline" size={13} color="#91868A" />
          <Text style={styles.dateStyle}>{moment(review.date).fromNow()}</Text>
        </View>
      </View>
      <View style={{flexDirection: 'row', marginTop: 13, marginBottom: 10, alignItems: 'center'}}>
        <Text style={styles.scoreTextStyle}>Wine Score: </Text>
        <Text style={styles.myScoreNumberStyle}>{review.score}</Text>
        <Text style={styles.scoreNumberStyle}>/100</Text>
      </View>
      <Text
        onTextLayout={onTextLayout}
        numberOfLines={more ? undefined : 2}
        style={styles.description}>{review.description}</Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        {
            lengthMore ? <Text
            onPress={toggleNumberOfLines}
            style={styles.fullReview}>{more ? 'Read less...' : 'Read more...'}</Text>
            :null
        }
          {/* <View style={{alignItems: 'flex-end', flexDirection: 'row', marginBottom: 15}}>
            <FontAwesome name="thumbs-o-up" size={20} color="#91868A" />
            <Text style={styles.thumbsNumberStyle}>(14)</Text>
          </View> */}
        </View>
    </View>
  )
}

export default FTWineDetailReviewCard

const styles = StyleSheet.create({
  container:{
    borderBottomColor: '#E5E5E5',
    paddingBottom: 10,
    borderBottomWidth: 1
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22
  },
  userName: {
    color: '#414141',
    fontFamily: brandFontFamily.base,
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 14,
    marginBottom: 5
  },
  numberStyle: {
    color: '#91868A',
    fontFamily: brandFontFamily.base,
    fontWeight: '500',
    fontSize: 11,
    lineHeight: 13,
    marginRight: 10
  },
  dateStyle: {    
    color: '#777777',
    fontFamily: brandFontFamily.base,
    fontSize: 11,
    lineHeight: 13,
  },
  scoreTextStyle: {
    color: '#414141',
    fontFamily: brandFontFamily.base,
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 16
  },
  myScoreNumberStyle: {
    color: '#947D50',
    fontFamily: brandFontFamily.base,
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 19
  },
  scoreNumberStyle: {
    color: '#414141',
    fontWeight: '300',
    fontFamily: brandFontFamily.base,
    fontSize: 12,
    lineHeight: 14
  },
  description: {
    color: '#414141',
    fontSize: 14,
    lineHeight: 20
  },
  fullReview: {
    color: '#71142D',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 20
  },
  thumbsNumberStyle: {
    color: '#91868A',
    fontFamily: brandFontFamily.base,
    fontSize: 12,
    lineHeight: 20,
    marginRight: 10,
    marginLeft: 9
  },

})