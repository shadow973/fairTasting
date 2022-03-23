import * as React from 'react';
import { StyleSheet, View } from 'react-native';

interface DividerProps {
  width?: number | 50;
  marginTop?: number | 30
}

const Divider = ({width, marginTop}: DividerProps) => {
  return (
    <View style={[styles.base, {width, marginTop}]} />
  )
}

export default Divider

const styles = StyleSheet.create({
  base: {
    width: 100,
    height: 0,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    marginTop: 30,
  },
})