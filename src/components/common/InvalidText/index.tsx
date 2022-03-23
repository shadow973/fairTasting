import { AntDesign } from '@expo/vector-icons'
import { View } from '@fair/components/Themed'
import React from 'react'
import { StyleSheet, Text, TextProps } from 'react-native'

interface InvalidTextProps extends React.PropsWithChildren<TextProps>{
  children: React.ReactNode
}
const InvalidText = ({children}:InvalidTextProps) => {
  return(
    <View style={styles.invalidTextContainer}>
      <AntDesign name="warning" size={16} color='red' />
      <Text style={styles.invalidText}>{children}</Text>
    </View>
  )
}

export default InvalidText

const styles = StyleSheet.create({
  invalidText: {
    lineHeight: 16,
    fontSize: 14,
    color: 'red',
    marginLeft: 3
  },
  invalidTextContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    backgroundColor: 'transparent'
  }
})