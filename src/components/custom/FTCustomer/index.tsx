import Text from '@fair/components/common/Text';
import * as React from 'react';
import { StyleSheet } from 'react-native'
import { color } from '@fair/constants/Colors';
import { brandFontFamily, brandFontSize } from '@fair/constants/Fonts';
import { useEffect, useState } from 'react';
import { useApi } from '@fair/hooks/useApi';

const FTCustomer = ({id}) => {
    const [customer, setCustomer] = useState({})

  useEffect(() => {
    getEvents()
  }, [id])

  const getEvents = async () => {
    const { data } = await useApi('customer/'+id)
    setCustomer(data)
  }
  return(
     
  <Text style={styles.customer}>{customer?<>{customer.name}</>:<></>}
  </Text>
  )
}


export default FTCustomer

const styles = StyleSheet.create({
  customer: {
    color: color.brand,
    fontFamily: brandFontFamily.h1
  }
})