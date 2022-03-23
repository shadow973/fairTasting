import Text from '@fair/components/common/Text';
import * as React from 'react';
import { Platform, StyleSheet } from 'react-native'
import { color } from '@fair/constants/Colors';
import { brandFontFamily, brandFontSize } from '@fair/constants/Fonts';
import { useEffect, useState } from 'react';
import { useApi } from '@fair/hooks/useApi';
import i18n from 'i18n-js';

const CustomerPresentation = ({id}) => {
    const [presentation, setPresentation] = useState({})

  useEffect(() => {
    (async () => {
    await getPresentation(id)
  })();
  }, [id])

  const getPresentation = async (id) => {
    const { data } = await useApi('customer/'+id+'/presentation')
    setPresentation(data)
  }
  return(
    
  <Text style={styles.customer}>
      {presentation  ?<>
      {presentation[i18n.currentLocale().substr(0, 2)]?.length>1?
      presentation[i18n.currentLocale().substr(0, 2)]:presentation['en']?.length>1?presentation['en']:i18n.t('waiting_for_description')}
      </>:<>{i18n.t('waiting_for_description')}</>}
  </Text>
  )
}


export default CustomerPresentation

const styles = StyleSheet.create({
  customer: {
    color: color.text,
    fontFamily: brandFontFamily.h3,
    fontSize: brandFontSize.h3,
    marginVertical: 20
  }
})