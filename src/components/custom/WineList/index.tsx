import Text from '@fair/components/common/Text';
import * as React from 'react';
import { StyleSheet } from 'react-native'
import { color } from '@fair/constants/Colors';
import { brandFontFamily, brandFontSize } from '@fair/constants/Fonts';
import { useEffect, useState } from 'react';
import { useApi } from '@fair/hooks/useApi';
import i18n from 'i18n-js';

const WineList = () => {
    

  
  return(
    
  <Text style={styles.customer}>
      
     {i18n.t('waiting_for_winelist')}
  </Text>
  )
}


export default WineList

const styles = StyleSheet.create({
  customer: {
    color: color.text,
    fontFamily: brandFontFamily.base,
    marginHorizontal: 20
  }
})