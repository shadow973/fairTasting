import Text from '@fair/components/common/Text';
import * as React from 'react';
import { StyleSheet } from 'react-native'
import { color } from '@fair/constants/Colors';
import { brandFontFamily, brandFontSize } from '@fair/constants/Fonts';
import moment from 'moment';


const isSameDate = (from, to) => moment(from).format('DD MM YY') === moment(to).format('DD MM YY')

const FTEventDateShort = ({ from, to }) => {
  return(
  <Text style={styles.dateStyle}>{
    (isSameDate(from, to) ? '' : `${moment(from).format('DD')} - `) + `${moment(to).format('DD MMMM')}`
  }
  </Text>
  )
}


export default FTEventDateShort

const styles = StyleSheet.create({
  dateStyle: {
    color: color.gold,
    fontFamily: brandFontFamily.h1
  }
})