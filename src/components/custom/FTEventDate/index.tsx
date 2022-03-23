import Text from '@fair/components/common/Text';
import * as React from 'react';
import { StyleSheet } from 'react-native'
import { color } from '@fair/constants/Colors';
import { brandFontFamily, brandFontSize } from '@fair/constants/Fonts';
import moment from 'moment';


const isSameDate = (from, to) => moment(from).format('DD MM YY') === moment(to).format('DD MM YY')

const FTEventDate = ({ from, to }) => {
  return(
  <Text style={styles.dateStyle}>{
    (isSameDate(from, to) ? '' : `${moment(from).format('DD')} - `) +
    `${moment(to).format('DD MMMM')} ${moment(from).format('HH:mm')} - ${moment(to).format('HH:mm')}`
  }
  </Text>
  )
}


export default FTEventDate

const styles = StyleSheet.create({
  dateStyle: {
    color: color.brand
  }
})