import Button from '@fair/components/common/Button';
import Card from '@fair/components/common/Card';
import Text from '@fair/components/common/Text';
import View from '@fair/components/common/View';
import { useAuthContext } from '@fair/context/AuthContextProvider';
import { ColorPropType, Dimensions, Image, Pressable, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import * as React from 'react';
import { NavigationHelpersContext, useNavigation, useRoute } from '@react-navigation/core';
import i18n from 'i18n-js';
import { color } from '@fair/constants/Colors';
import { brandFontFamily, brandFontSize } from '@fair/constants/Fonts';
import { AntDesign, Ionicons, Entypo, Feather, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { border, general, text } from '@fair/constants/Styles';


export default function ProfileScreen() {
  const { user, logout } = useAuthContext()
  const { navigate } = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header} safeArea>
        <Text color='white' style={text.titleBaseFamily}>Profile</Text>
      </View>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 0 }}>
        <View style={{height: 210}}>
          <Image source={require('@assets/images/profile_page/profile_background.png')} resizeMethod='resize' style={{width: Dimensions.get('window').width, aspectRatio: 1, height: 210, position: 'absolute', zIndex: -1}} />
          <View style={{padding: 15}}>
            <View style={{flexDirection: 'row', alignSelf: 'flex-end'}}>
              <Pressable>
                <Ionicons name="md-person-add" size={24} color="white" style= {{marginRight: 20}}/>
              </Pressable>
              <Pressable onPress={() => null}>
                <Feather name="more-vertical" size={24} color="white" />
              </Pressable>
            </View>
          </View>
          <View style={{alignItems: 'center'}}>
            <View style={[general.center, {backgroundColor: color.brandLight, width: 64, height: 64, borderRadius: 32, marginBottom: 10}]}>
              <Text color={color.brandDark} style={{fontFamily: brandFontFamily.base, fontSize: 48, lineHeight: 56}}>{user?.firstname.charAt(0)}</Text>
            </View>
            <Text color='white' style={[text.largeSizeH5Family, {marginBottom: 24}]}>{`${user?.firstname} ${user?.lastname}`}</Text>
            <Text color='white' style={text.mediumSizeDefaultFamily}>{`28 followers  36 following`}</Text>
          </View>
        </View>
        <View style={{marginHorizontal: 26, marginTop: 26}}>
          <View style={[border.bottomGreyLight, {paddingBottom: 12}]} row justify>
            <View row>
              <MaterialCommunityIcons name="bottle-wine" size={18} color="#C4C4C4" />
              <Text color={color.grey} style={[text.mediumSizeDefaultFamily, {alignSelf: 'center'}]}>{'  Wine Collection'}</Text>
            </View>
            <Text color='#C4C4C4'>23</Text>
          </View>
          <View style={[border.bottomGreyLight, {paddingBottom: 12, marginTop: 14}]} row justify>
            <View row>
              <MaterialIcons name="event-available" size={18} color="#C4C4C4" />
              <Text color={color.grey} style={[text.mediumSizeDefaultFamily, {alignSelf: 'center'}]}>{'  Saved Events'}</Text>
            </View>
            <Text color='#C4C4C4'>6</Text>
          </View>
          <View style={[border.bottomGreyLight, {paddingBottom: 12, marginTop: 14}]} row justify>
            <View row>
              <Image source={require('@assets/images/profile_page/favourite_producers.png')} />
              <Text color={color.grey} style={[text.mediumSizeDefaultFamily, {alignSelf: 'center'}]}>{'  Favourite Producers'}</Text>
            </View>
            <Text color='#C4C4C4'>2</Text>
          </View>
          <View style={[border.bottomGreyLight, {paddingBottom: 12, marginTop: 14}]} row justify>
            <View row>
              <MaterialIcons name="rate-review" size={18} color="#C4C4C4" />
              <Text color={color.grey} style={[text.mediumSizeDefaultFamily, {alignSelf: 'center'}]}>{'  Wine Collection'}</Text>
            </View>
            <Text color='#C4C4C4'>56</Text>
          </View>
        </View>
        {/* {user ? <>
          <View row>
            <View style={styles.picContainer}>
              <Ionicons name="person-circle-outline" size={60} color={color.brand} />
            </View>
            <View style={styles.nameContainer}>
              <Text style={styles.name}>{`${user?.firstname} ${user?.lastname}`}</Text>
              <Text>{`${user?.email}`}</Text>
            </View>
          </View>
          <View style={styles.lineStyleSlim} />
          <TouchableOpacity onPress={()=>navigate('MyTickets')}>
            <View style={styles.menuItem} row> 
              <Text>{i18n.t('my_tickets')}</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.lineStyleSlim} />
          <TouchableOpacity onPress={()=>navigate('MyOrders')}>
            <View style={styles.menuItem} row>
              <Text>{i18n.t('my_orders')}</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.lineStyleMedium} />
          <TouchableOpacity onPress={()=>logout()}>
            <View style={styles.menuItem} row> 
              <Text>{i18n.t('logout')}</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.lineStyleSlim} />
        </> : <>
        <View row>
            <View style={styles.picContainer}>
              <Ionicons name="person-circle-outline" size={60} color={color.brand} />
            </View>
            <View style={styles.nameContainer}>
              
            </View>
          </View>
          <View style={styles.lineStyleSlim} />
        <TouchableOpacity onPress={() => navigate('Welcome')}>
            <View style={styles.menuItem} row> 
              <Text>{i18n.t('login')}</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.lineStyleSlim} />
        </>} */}
      </ScrollView>
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
  name: {
    fontSize: brandFontSize.base,
    fontFamily: brandFontFamily.base,
    color: color.grey,
    paddingBottom: 10
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  nameContainer: {
    flex: 2,
    paddingVertical: 20,
    justifyContent: 'center'
  },
  picContainer: {
    flex: 1,
    paddingVertical: 20,
    alignItems:'center',
    justifyContent: 'center'
  },
  lineStyleSlim: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
    marginTop: 5,
    marginBottom: 5,
  },
  lineStyleMedium: {
    borderWidth: 3,
    borderColor: '#E5E5E5',
    marginTop: 5,
    marginBottom: 5,
  },
  menuItem: {
    paddingHorizontal: 20,
    paddingVertical: 10
  }
});
