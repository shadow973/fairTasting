import React from 'react';

// import { View } from '@fair/components/Themed';
import { Image, StyleSheet, Text, View } from 'react-native';
import { ProgressChart } from 'react-native-chart-kit';

import { brandFontFamily, brandFontSize } from '@fair/constants/Fonts';

interface PieChartProps {
  widthAndHeight: number
  series: number[]
  chartConfig?: any

  imageSource: any
  textBig: string
  textSmall: string
  style?: any
}


const Pie = ({widthAndHeight, series, chartConfig, imageSource, textBig, textSmall, style}: PieChartProps) => {

  return(
    <View style={{ ...style}}>
      <View style={styles.center}>
        <ProgressChart
          data={series}
          width={widthAndHeight}
          height={widthAndHeight}
          strokeWidth={8} 
          radius={30}
          chartConfig={chartConfig}
          hideLegend={true}
        />
        <View style={{position: 'absolute'}}>
          <Image source={imageSource} style={{}}></Image>
        </View>
      </View>
      <View style={{...styles.center, marginTop: 10}}>
        <Text style={styles.pieChartText}>{textBig}</Text>
        <Text style={styles.pieChartTextSmall}>{textSmall}</Text>
      </View>
    </View>
  )
}

export default Pie

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  pieChartText: {
    color: '#91868A',
    fontFamily: brandFontFamily.base,
    fontWeight: '500',
    fontSize: brandFontSize.base,
    lineHeight: 18
  },
  pieChartTextSmall: {
    color: '#414141',
    fontFamily: brandFontFamily.base,
    fontWeight: '500',
    fontSize: brandFontSize.base,
    lineHeight: 14,
    paddingVertical: 5
  }
})