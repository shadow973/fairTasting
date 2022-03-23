import Button from '@fair/components/common/Button';
import Card from '@fair/components/common/Card';
import Text from '@fair/components/common/Text';
import View from '@fair/components/common/View';
import { useAuthContext } from '@fair/context/AuthContextProvider';
import { ColorPropType, Image, TextInput, ScrollView, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import * as React from 'react';
import { NavigationHelpersContext, useNavigation, useRoute } from '@react-navigation/core';
import i18n from 'i18n-js';
import { color } from '@fair/constants/Colors';
import { brandFontFamily, brandFontSize } from '@fair/constants/Fonts';
import { AntDesign, Ionicons, Entypo, MaterialCommunityIcons, FontAwesome, EvilIcons } from '@expo/vector-icons';
import { useWineReviewContext } from '@fair/context/WineReviewContextProvider';
import { useEffect } from 'react';
import FTReviewCard from '@fair/components/custom/FTReviewCard';
import FTNoReview from '@fair/components/defaults/FTNoReview';
import { TouchableHighlight } from 'react-native-gesture-handler';


export default function MyWineScreen() {
  const { user, logout } = useAuthContext()
  const { myReviews } = useWineReviewContext()
  const { navigate } = useNavigation();
  

  return (
    <View style={styles.container}>
      <View style={styles.header} safeArea>
        <Pressable onPress={() => navigate("UpcomingEvents", { screen: 'Home' })} >
          <MaterialCommunityIcons size={25} style={{paddingLeft: 10}} color={'white'} onPress={() => navigate("UpcomingEvents", { screen: 'Home' })} name='keyboard-backspace' />
        
        </Pressable>
        <Text style={styles.title}>My Wines</Text>
      </View>
      {/* <View style={styles.searchInputStyle}>
        <View style={styles.searchStyle}>
          <EvilIcons name="search" size={20} style={{marginTop: 10, marginLeft: 8}} color="grey" />
          <TextInput placeholder='Search reviewed wines'></TextInput>
        </View>
        <FontAwesome name="filter" size={24} color={color.brand} />
      </View> */}
      <ScrollView contentContainerStyle={{ paddingHorizontal: 10, paddingVertical: 10 }}>
        {myReviews === null || myReviews == undefined ? <>
        <FTNoReview />
        </>:<>
        {myReviews.map((e, id)=> <FTReviewCard key={id} {...e} />)}
        </>}
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
    backgroundColor: color.brand,
    paddingVertical: 10,
    paddingLeft: 10,
    flexDirection: 'row'
  },
  title: {
    fontSize: brandFontSize.h2,
    fontFamily: brandFontFamily.h3,
    color: color.white,
    paddingBottom: 10,
    paddingLeft: 10
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
  },
  searchStyle: {
    borderWidth: 1,
    width: 250,
    height: 40,
    borderRadius: 5,
    borderColor: '#C4C4C4',
    textAlignVertical: 'center',
    flexDirection: 'row'
  },
  searchInputStyle: {
    padding: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row'
  }
});
