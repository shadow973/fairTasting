import { color } from '@fair/constants/Colors';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Text from '../Text';
import { brandFontFamily, brandFontSize } from '@fair/constants/Fonts';

interface ButtonProps {
  label: string
  onPress: () => void
  secondary?: boolean 
  dark?: boolean 
  underline?: boolean 
  signin?: boolean 
  signinText?: boolean
  square?: boolean
  strong?: boolean
  brandtext?: boolean
  darkOutline?: boolean
  slim?: boolean
}

const Button = ({label, onPress, secondary, dark, underline, signin, signinText, square, strong, brandtext, slim, darkOutline}:ButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.base, (secondary && styles.secondary), ((dark && !secondary) && styles.dark), (signin && styles.signin), (square && styles.square),(slim && styles.slim), (darkOutline && styles.darkOutline)]}>
        <View style={[(underline && (dark ? styles.underlineDark : styles.underline))]}>
          <Text color={((secondary ? (dark ? color.brand : color.white) : (dark ? color.white : color.grey)))} style={[(signinText && styles.signinText), (brandtext && styles.brandtext), (strong && styles.strong)]}>{label}</Text>
        </View>
    </TouchableOpacity>
  )
}

export default Button

const styles = StyleSheet.create({
  base: {
    backgroundColor: color.white,
    borderRadius: 5,
    paddingVertical: 15,
    paddingHorizontal: 25,
    margin: 5,
    alignItems: 'center',
    
  },
  underline: {
    borderBottomColor: color.white,
    borderBottomWidth: 1
  },
  underlineDark: {
    borderBottomColor: color.brand,
    borderBottomWidth: 1
  },
  secondary: {
    paddingVertical: 0,
    paddingHorizontal: 0,
    backgroundColor: "transparent",
  },
  secondaryLabel: {
    color: color.white,
  },
  dark: {
    backgroundColor: color.brand,
  },
  darkOutline: {
    borderColor: color.brand,
    borderWidth: 1,
  },
  brandtext: {
    color: color.brand,
  },
  darkLabel: {
    color: color.white,
    
  },
  signin: {
    width: 250,
    paddingVertical: 10,
    borderWidth:1,
    borderColor: color.white
  },
  signinText: {
    fontSize: brandFontSize.base,
    fontFamily: brandFontFamily.h3
  },
  square:{
    borderRadius: 5
  },
  strong:{
    fontFamily: brandFontFamily.h1
  },
  slim:{
    paddingVertical: 10,
    paddingHorizontal: 25,
  }
})