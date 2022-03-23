import * as React from 'react';
import { StyleProp, ViewProps as RnViewProps, StyleSheet, View as RnView, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface ViewProps extends React.PropsWithChildren<RnViewProps>{
  children?: React.ReactNode
  style?: StyleProp<ViewStyle>
  row?: boolean
  justify?: boolean
  footer?: boolean
  safeArea?: boolean
}

const View = ({children, row, justify, footer, style, safeArea, ...props}:ViewProps) => {
  const insets = useSafeAreaInsets();
  return (
    <RnView style={[(style && style), (row && styles.row), (justify && styles.justify),(footer && styles.footer), (safeArea && {paddingTop: insets.top})]} {...props}>
      {children}
    </RnView>
  )
}

export default View

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flex: 1
  },
  justify: {
    justifyContent: 'space-between'
  },
  footer: {
    height: 100
  }
})