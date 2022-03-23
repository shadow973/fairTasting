import { color } from '@fair/constants/Colors';
import * as React from 'react';
import { StyleProp, StyleSheet, Text as RnText, ViewStyle, ViewProps as RnViewProps } from 'react-native';
import View from '../View';

interface CardProps extends React.PropsWithChildren<RnViewProps>{
  children: React.ReactNode
  color?: string | undefined,
}

const Card = ({children, style}:CardProps) => {
  return (
    <View style={[styles.base, (style && style)]}>
      {children}
    </View>
  )
}

export default Card

const styles = StyleSheet.create({
  base: {
    backgroundColor: color.white,
    marginBottom: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
})