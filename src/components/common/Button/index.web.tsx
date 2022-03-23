import { color } from '@fair/constants/Colors';
import * as React from 'react';
import { StyleSheet, View, StyleProp } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Text from '../Text';
import { brandFontFamily, brandFontSize } from '@fair/constants/Fonts';

interface ButtonProps {
  label: string
  onPress: () => void
  secondary?: boolean 
  dark?: boolean 
  gold?: boolean 
  pro?: boolean 
  underline?: boolean 
  signin?: boolean 
  signinText?: boolean
  style?: StyleProp<any>
}

const Button = ({label, onPress, secondary, dark, underline, signin, signinText, gold, pro, style}:ButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.base, (secondary && styles.secondary), ((dark && !secondary) && styles.dark), ((gold && !secondary) && styles.gold), ((pro && !secondary) && styles.pro), (signin && styles.signin), style]}>
        <View style={[(underline && (dark ? styles.underlineDark : styles.underline))]}>
          <Text color={((secondary ? (dark ? color.brand : color.white) : (dark ? color.white : color.grey)))} style={[((gold && !secondary) && styles.gold), ((pro && !secondary) && styles.proText), ((signinText && styles.signinText)), dark && styles.dark, style]}>{label}</Text>
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
    fontSize: brandFontSize.base,
    fontFamily: brandFontFamily.h1,
    
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
    backgroundColor: color.brandContrast,
    fontSize: brandFontSize.base,
    fontFamily: brandFontFamily.h1,
  },
  gold: {
    backgroundColor: color.gold,
    color: color.white,
    fontSize: brandFontSize.base,
    fontFamily: brandFontFamily.h1,
    textTransform: 'uppercase'
  },
  pro: {
    backgroundColor: color.white,
    color: color.black,
    fontSize: brandFontSize.base,
    fontFamily: brandFontFamily.h1,
    textTransform: 'uppercase',
    borderWidth: 1
  },
  proText: {
    
    color: color.black,
    fontSize: brandFontSize.base,
    fontFamily: brandFontFamily.base,
    textTransform: 'uppercase',
    
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
})