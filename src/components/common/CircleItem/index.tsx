import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { brandFontFamily, brandFontSize } from '@fair/constants/Fonts';

interface CircleItemProps {
  imageSource: any
  fruitName: string
  number: string
  color: string
  style?: any
}

const CircleItem = ({imageSource, fruitName, number, style, color}: CircleItemProps) => {
  return(
    <View style={{...styles.center, ...style}}>
      <View style={{
        ...styles.circle,
        backgroundColor: color,
      }}>
        <Image source={imageSource} />
      </View>
      <Text style={styles.circleTextBlack}>{fruitName}</Text>
      <Text style={styles.circleTextBrown}>{`(${number})`}</Text>
    </View>
  )
}

export default CircleItem

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
    marginTop: 12
  },
  circle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center'
  },
  circleTextBrown: {
    color: '#91868A',
    fontFamily: brandFontFamily.base,
    fontWeight: '500',
    fontSize: brandFontSize.base,
    lineHeight: 13,
  },
  circleTextBlack: {
    color: '#414141',
    fontFamily: brandFontFamily.base,
    fontWeight: '500',
    fontSize: brandFontSize.base,
    lineHeight: 14,
    marginTop: 12
  }
})