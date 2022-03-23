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


export default function MainSearchScreen() {
  const { user, logout } = useAuthContext()
  const { navigate } = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header} safeArea>
        <Text style={styles.title}>Search</Text>
      </View>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 0 }}>
          <View style={styles.center}>
          <Text><Text>{i18n.t('coming_soon')}</Text></Text>
          </View>
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
  center:{
    alignItems: 'center',
    justifyContent: 'center'
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
