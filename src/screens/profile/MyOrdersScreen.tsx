import Button from '@fair/components/common/Button';
import Card from '@fair/components/common/Card';
import Text from '@fair/components/common/Text';
import View from '@fair/components/common/View';
import { useAuthContext } from '@fair/context/AuthContextProvider';
import { ColorPropType, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import * as React from 'react';
import { NavigationHelpersContext, useNavigation, useRoute } from '@react-navigation/core';
import i18n from 'i18n-js';
import { color } from '@fair/constants/Colors';
import { brandFontFamily, brandFontSize } from '@fair/constants/Fonts';
import { AntDesign, Ionicons, Entypo } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { useApi } from '@fair/hooks/useApi';
import FTOrder from '@fair/components/custom/FTOrder';
import FTNoOrders from '@fair/components/defaults/FTNoOrders';


export default function MyOrdersScreen() {
  const { user, logout } = useAuthContext()
  const { navigate, goBack } = useNavigation();
  const [orders, setOrders] = useState([]);
  const getMyOrders = async () => {
    const { data } = await useApi('user/my/orders');
    setOrders(data);
};
useEffect(()=>{
    getMyOrders();
},[]);
  return (
    <View style={styles.container}>
      <View style={styles.header} safeArea>
        <Text style={styles.title}>{i18n.t('my_orders')}</Text>
      </View>
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContainerContent}>
      {orders === null || orders == undefined ? <>
          <FTNoOrders />
        </> : <>
          {orders.map((e, id) => <FTOrder key={id} {...e} />)}
        </>}
        
      </ScrollView>
      <TouchableOpacity onPress={() => goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={25} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF'
  },
  header: {
    alignItems: 'center',
    backgroundColor: color.brand,
    paddingVertical: 10
  },
  title: {
    fontSize: brandFontSize.h2,
    fontFamily: brandFontFamily.h3,
    color: color.white,
    paddingBottom: 10
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContainerContent: {
    paddingHorizontal: 20,
    paddingTop: 20
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    height: 40,
    width: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
});
