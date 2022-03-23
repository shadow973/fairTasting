import React from 'react'
import { Image, ImageStyle, ImageProps, StyleProp } from 'react-native'
import logoBase64 from '@assets/images/logo-h-color.svg';

interface LogoProps  {
  style?: StyleProp<ImageStyle>
  fill?: string
}
export default function Logo ({style={}}:LogoProps) {
  return <Image source={logoBase64} resizeMode="contain" style={[{height: 100, width: 300},style]} />
}
