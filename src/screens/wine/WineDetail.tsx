import React, { useState, useEffect } from 'react'
import SelectDropdown from 'react-native-select-dropdown'
import View from '@fair/components/common/View'
import { Dimensions, Image, ImageBackground, Pressable, ScrollView, StyleSheet, Text, TextInput } from 'react-native'
import { color } from '@fair/constants/Colors';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Pie from '@fair/components/common/PieChart';
import CircleItem from '@fair/components/common/CircleItem';
import { AntDesign, Feather, Ionicons } from '@expo/vector-icons'; 
import FTWineDetailReviewCard from '@fair/components/custom/FTWineDetailReviewCard'
import { useLocationContext } from '@fair/context/LocationContext'
import NoWineBar from '@fair/components/defaults/NoWineBar'
import SearchingWinebar from '@fair/components/defaults/SearchingWinebar'
import FTWinebarCardHorizontal from '@fair/components/custom/FTWinebarCardHorizontal'
import { useNavigation, useRoute } from '@react-navigation/core'
import { useWineDetailContext } from '@fair/context/WineDetailContextProvider'
import CountryFlag from 'react-native-country-flag'
import countries from '@fair/constants/CountriesList.json'
import { brandFontFamily, brandFontSize } from '@fair/constants/Fonts'
import { border, general, text } from '@fair/constants/Styles';
import Button from '@fair/components/common/Button';

export default function WineDetail() {

  const sortData = ['Date', 'Rate']
  const widthAndHeight = 70
  const series = [10, 10]
  const sweetnessColor = '#AE316D'
  const acidityColor = '#E1D629'
  const tanninColor = '#E52D3A'
  const bodyColor = '#28768F'
  const alcoholColor = '#6FC9B9'
  const avatar = false
  const image_path = ''
  const { currentLocation, permissionStatus, launchLocationSettings, refreshLocation } = useLocationContext();
  const { wineDetail, getWineDetail, wineTasteProfile } = useWineDetailContext();
  const [winebars, setWinebars] = useState([])
  const { goBack } = useNavigation()
  const route = useRoute()
  const chartConfigData = [{ 
    backgroundGradientFromOpacity: 0,
    backgroundGradientToOpacity: 0, 
    color: (opacity = 1) => `rgba(174, 49, 109, ${opacity})`
  },{ 
    backgroundGradientFromOpacity: 0,
    backgroundGradientToOpacity: 0, 
    color: (opacity = 1) => `rgba(225, 214, 41, ${opacity})`
  },{ 
    backgroundGradientFromOpacity: 0,
    backgroundGradientToOpacity: 0, 
    color: (opacity = 1) => `rgba(229, 45, 58, ${opacity})`
  },{ 
    backgroundGradientFromOpacity: 0,
    backgroundGradientToOpacity: 0, 
    color: (opacity = 1) => `rgba(40, 118, 143, ${opacity})`
  },{ 
    backgroundGradientFromOpacity: 0,
    backgroundGradientToOpacity: 0, 
    color: (opacity = 1) => `rgba(111, 201, 185, ${opacity})`
  },]
  const data = route.params as any
  const wine_id = data.wine_id

  useEffect(() => {
    getWineDetail(wine_id)
  }, [])
  return (
    <View style={styles.outContainer} safeArea>
      {wineDetail ?
        <KeyboardAwareScrollView>
          <View>
            <View style={{height: 365}}>
              <Image source={{uri: `https://cdn.fairtasting.com/${ wineDetail.images[0].image_path }`}} resizeMethod='resize' style={{width: Dimensions.get('window').width, aspectRatio: 1, height: 365, position: 'absolute', zIndex: -1}} />
              <View style={styles.header}>
                <Ionicons name="arrow-back" size={24} color="white" onPress={() => goBack()} />
                <View style={{flexDirection: 'row'}}>
                  <Feather name="shopping-cart" size={24} color="white" />
                  <Ionicons style={{marginLeft: 30}} name="notifications" size={24} color="white" />
                </View>
              </View>
              <View style={{flex: 1}}></View>
              <Pressable style={[styles.shareBox, general.center, { marginHorizontal: 10 }]} onPress={() => null} >
                <AntDesign name="sharealt" size={24} color={color.white} />
              </Pressable>
              <Pressable style={[styles.shareBox, general.center, { margin: 10 }]} onPress={() => null}>
                <Feather name="bookmark" size={24} color="white" />
              </Pressable>
            </View>
          </View>
          <View style={[border.bottomGreyLight, {flexDirection: 'row', justifyContent: 'space-between', backgroundColor: color.white, height: 68}]}>
            <View style={[styles.scoreBox, general.center]}>
              <Text style={[text.smallSizeH9Family, {color: color.white}]}>POINTS:</Text>
              <Text style={[text.titleH9Family, {color: color.white}]}>{wineDetail.score}/100</Text>
            </View>
            <View style={{flexDirection: 'row', marginRight: 20, alignSelf: 'center'}}>
              {/* <Image resizeMethod='resize' style={{height: 24, width: 50}} source={require('@assets/images/price_image/price_medium_medium.png')} />
              <Text style={{fontFamily: brandFontFamily.base, fontSize: brandFontSize.base, lineHeight: 24, color: color.gold}}>~€15</Text> */}
            </View>
          </View>
          <View style={{paddingLeft: 30, backgroundColor: color.white, marginBottom: 20}}>
            <Text style={styles.wineProducerNameText}>{wineDetail.wine.producer_name}</Text>
            <View style={{marginTop: 5, width: 285, marginBottom: 10}}>
              <Text style={styles.wineNameText}>{wineDetail.wine.name}</Text>
            </View>
            <View style={{borderBottomColor: '#E5E5E5', width: 40, borderBottomWidth: 1}}></View>
            <View style={styles.flagBox}>
              <CountryFlag isoCode={wineDetail.wine.country_code || ''} size={16} style={{borderRadius: 8}} />
              <Text style={styles.countryText}>{`  ${wineDetail.wine.country_name}`}</Text>
            </View>
            <View style={{...styles.wineGlassBox, alignItems: 'center'}}>
              {/* <View style={{...styles.center, width: 20}}>
                <Image source={require('@assets/images/wine_detail/glass.png')} style={{width: 10, height: 20}}/>
              </View>
              <Text style={styles.countryText}>  Medium red - Full red wine</Text> */}
            </View>
          </View>
          <View style={styles.wineBox}>
            <View style={styles.tasteProfileView}>
              <Text style={styles.tasteProfileText}>Taste Profile </Text>
              {/* <Text >(based on 174 reviews)</Text> */}
            </View>
            <View style={styles.pieChart}>
              <Pie

                widthAndHeight={68}
                series={[wineTasteProfile.sweetness/5]}
                chartConfig={chartConfigData[0]}
                imageSource={require('@assets/images/wine_detail/sweet.png')}
                textBig='SWEETNESS'
                //textSmall='Off-dry'
                style={{marginRight: 25}}
              />
              <Pie
                widthAndHeight={68}
                series={[wineTasteProfile.acidity/3]}
                chartConfig={chartConfigData[1]}
                imageSource={require('@assets/images/wine_detail/acidity.png')}
                textBig='ACIDITY'
                //textSmall='Off-dry'
                style={{marginRight: 25}}
              />
              <Pie
                widthAndHeight={68}
                series={[wineTasteProfile.tannin/3]}
                chartConfig={chartConfigData[2]}

                imageSource={require('@assets/images/wine_detail/tannin.png')}
                textBig='TANNIN'
                //textSmall='Off-dry'
              />
            </View>
            <View style={styles.pieChartDown}>
              <Pie

                widthAndHeight={68}
                series={[wineTasteProfile.body/3]}
                chartConfig={chartConfigData[3]}
                imageSource={require('@assets/images/wine_detail/body.png')}
                textBig='BODY'
                //textSmall='Off-dry'
                style={{marginRight: 25}}
              />
              <Pie
                widthAndHeight={68}
                series={[wineTasteProfile.alcohol/5]}
                chartConfig={chartConfigData[4]}

                imageSource={require('@assets/images/wine_detail/alcohol.png')}
                textBig='ALCOHOL'
                //textSmall='Off-dry'
              />
            </View>
            {/* <View style={styles.fruitContainer}>
              <Text style={styles.pieChartText}>FRUIT</Text>
              <Text style={{marginTop: 15, fontSize: 12, lineHeight: 14}}>Black fruit</Text>
              <View style={{flexDirection: 'row', marginBottom: 20, paddingLeft: 5}}>
                <CircleItem 
                  style={{marginRight: 15}}
                  color='#AE316D'
                  imageSource={require('@assets/images/wine_detail/boysenberry.png')}
                  fruitName='Boysenberry'
                  number='65'
                />
                <CircleItem
                  style={{marginRight: 15}}
                  color='#4C3C67'
                  imageSource={require('@assets/images/wine_detail/blackberry.png')}
                  fruitName='Blackberry'
                  number='52'
                />
                <CircleItem
                  color='#2E183B'
                  imageSource={require('@assets/images/wine_detail/blackcurrant.png')}
                  fruitName='Black currant'
                  number='3'
                />
              </View>
            </View> */}
            {/* <View style={styles.fruitContainer}>
              <Text style={{...styles.pieChartText, marginBottom: 8}}>FLORAL</Text>
              <View style={{flexDirection: 'row', marginBottom: 20, paddingLeft: 13}}>
                <CircleItem
                  style={{marginRight: 25}}
                  color='#E52D3A'
                  imageSource={require('@assets/images/wine_detail/geranium.png')}
                  fruitName='Geranium'
                  number='17'
                />
                <CircleItem
                  color='#8162B5'
                  imageSource={require('@assets/images/wine_detail/lavander.png')}
                  fruitName='Lavander'
                  number='9'
                />
              </View>
            </View> */}
            {/* <View style={styles.fruitContainer}>
              <Text style={{...styles.pieChartText, marginBottom: 8}}>HERBS & SPICES</Text>
              <View style={{flexDirection: 'row', marginBottom: 30, paddingLeft: 15}}>
                <CircleItem
                  style={{marginRight: 25}}
                  color='#756952'
                  imageSource={require('@assets/images/wine_detail/black_tea.png')}
                  fruitName='Black tea'
                  number='42'
                />
                <CircleItem
                  style={{marginRight: 25}}
                  color='#91885F'
                  imageSource={require('@assets/images/wine_detail/dried_herbs.png')}
                  fruitName='Dried herbs'
                  number='33'
                />
                <CircleItem
                  style={{marginRight: 25}}
                  color='#3D9970'
                  imageSource={require('@assets/images/wine_detail/eucalyptus.png')}
                  fruitName='Eucalyptus'
                  number='5'
                />
                <CircleItem
                  color='#C1BE4E'
                  imageSource={require('@assets/images/wine_detail/fennel.png')}
                  fruitName='Fennel'
                  number='2'
                />
              </View>
            </View> */}
          </View>
          <View style={styles.reviewBox}>
            <Text style={{fontSize: 18, lineHeight: 21, marginBottom: 20}}>Reviews<Text style={styles.tasteProfileTextSmall}>({wineDetail.reviews.length})</Text></Text>
            
            {/* <SelectDropdown
              data={sortData}
              onSelect={(selectedItem, index) => null}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem
              }}
              rowTextForSelection={(item, index) => {
                return item
              }}
              buttonStyle={styles.sortButton}
              buttonTextStyle={styles.pieChartTextSmall}
              dropdownIconPosition='right'
              renderDropdownIcon={() => {
                return <AntDesign name="down" size={8} color="black" />
              }}
              defaultButtonText='Sort'
            /> */}
            {(wineDetail.reviews !== undefined && wineDetail.reviews !== null)&&
            wineDetail.reviews.map((e, id)=> 
            <FTWineDetailReviewCard
              avatar={require('@assets/images/user_avatar.png')}
              username='A winelover'
              score={e.score}
              date={e.created_at}
              description={e.wine_review?.conclusion.notes}
              recommend_number={14}
              />
              )
            }
            {/* <Pressable style={styles.moreButton}>
              <Text style={{color: '#414141'}}>{`${17} more reviews`}</Text>
            </Pressable> */}
          </View>
          {/* <View style={styles.wineBox}>
            <View style={{marginHorizontal: 20, marginVertical: 30}}>
              <Text style={text.largeSizeDefaultFamily}>Where to buy</Text>
              <View style={[border.bottomGreyLight, {paddingVertical: 16}]}>
                <Text style={[text.extraSizeDefaultFamily, {color: color.brandDark}]}>International Wine and Spirit Shop</Text>
                <View style={[{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10}]}>
                  <Text style={text.extraSizeBoldFamily}>€23.99</Text>
                  <Pressable style={[general.center, border.greySmallRadius, {backgroundColor: color.brand, paddingVertical: 8, width: 160}]} onPress={() => null} >
                    <Text style={[text.extraSizeBoldFamily, {color: color.white}]}>Add to Cart</Text>
                  </Pressable>
                </View>
              </View>
              <Pressable style={[border.greySmallRadius, general.center, {marginTop: 16, paddingVertical: 14}]}>
                <Text style={text.mediumSizeDefaultFamily}>See all buying options</Text>
              </Pressable>
            </View>
          </View> */}
          {/* <View style={styles.wineBarBox}>
            <Text style={{...styles.tasteProfileText, marginBottom: 15}}>Places near you</Text>
            {currentLocation || winebars ? <>
              {winebars == null || winebars.length == 0 || winebars == undefined ? <>
                <NoWineBar />
              </> : <>
                <ScrollView style={{flex: 1}} contentContainerStyle={{paddingHorizontal: 20}} horizontal>
                  {winebars.map((e, id) => <FTWinebarCardHorizontal key={id} {...e} />)}

                </ScrollView>
              </>}
            </> : <>
              <SearchingWinebar />
            </>}
          </View> */}
        </KeyboardAwareScrollView> : 
        <></>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  outContainer: {
    flex: 1,
    backgroundColor: '#E5E5E5'
  },
  header: {
    opacity: 0.35,
    justifyContent: 'space-between',
    backgroundColor: color.black,
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: 'row'
  },
  shareBox: {
    alignSelf: 'flex-end',
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: color.black,
    opacity: 0.45,
  },
  scoreBox: {
    backgroundColor: color.gold,
    borderBottomRightRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20
  },
  imageBox: {
    marginLeft: 30,
    marginTop: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bigScoreText: {
    fontSize: 40,
    lineHeight: 47,
    color: '#947D50',
    fontWeight: '700'
  },
  smallScoreText: {
    fontSize: 12,
    color: '#947D50',
    fontWeight: '500'
  },
  wineProducerNameText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#777777'
  },
  wineNameText: {
    fontFamily: brandFontFamily.base,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: 'bold',
    color: '#414141'
  },
  flagBox: {
    marginTop: 10,
    flexDirection: 'row'
  },
  countryText: {
    fontSize: 14,
    lineHeight: 16,
    color: '#414141'
  },
  wineGlassBox: {
    flexDirection: 'row',
    marginBottom: 38,
    marginTop: 16
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  wineBox: {
    shadowOpacity: 0.05,
    shadowColor: color.black,
    marginBottom: 20,
    backgroundColor: color.white,
  },
  wineBarBox: {
    shadowOpacity: 0.05,
    shadowColor: color.black,
    marginBottom: 20,
    backgroundColor: color.white,
    paddingHorizontal: 25,
    paddingTop: 20,
    paddingBottom: 30
  },
  reviewBox: {
    shadowOpacity: 0.05,
    shadowColor: color.black,
    marginBottom: 20,
    backgroundColor: color.white,
    paddingLeft: 25,
    paddingTop: 17,
    paddingRight: 20
  },
  avatarBox: {
    flexDirection: 'row',
    marginTop: 25,
    alignItems: 'center',
    borderBottomColor: '#E5E5E5',
    borderBottomWidth: 1,
    borderStyle: 'solid',
    paddingBottom: 20
  },
  avatarImage: {
    width: 44,
    height: 44,
    borderRadius: 22
  },
  tasteProfileView: {
    marginLeft: 24,
    marginTop: 17,
    marginBottom: 40,
    flexDirection: 'row'
  },
  tasteProfileText: {
    fontSize: 18,
    lineHeight: 21,
    color: '#414141'
  },
  tasteProfileTextSmall: {
    fontSize: 12,
    lineHeight: 21,
    color: '#91868A'
  },
  pieChart: {
    flexDirection: 'row',
    alignSelf: 'center'
  },
  pieChartItem: {
    alignItems: 'center',
    marginRight: 40
  },
  pieChartText: {
    color: '#91868A',
    fontFamily: brandFontFamily.base,
    fontWeight: '500',
    fontSize: 11,
    lineHeight: 13
  },
  pieChartTextSmall: {
    color: '#414141',
    fontFamily: brandFontFamily.base,
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 14
  },
  pieChartDown: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginVertical: 30
  },
  fruitContainer: {
    borderTopColor: '#E5E5E5',
    borderTopWidth: 1,
    borderStyle: 'solid',
    paddingTop: 18,
    marginHorizontal: 24
  },
  sortButton: {
    marginVertical: 20,
    borderRadius: 20,
    width: 70,
    height: 35,
    alignSelf: 'flex-end',
    backgroundColor: color.white,
    borderWidth: 1
  },
  moreButton: {
    borderRadius: 5,
    width: 310,
    height: 45,
    borderColor: '#414141',
    borderWidth: 1,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20
  }

})