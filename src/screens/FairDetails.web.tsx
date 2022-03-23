import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Animated, TouchableOpacity, FlatList, Modal, ImageBackground } from 'react-native';
import Button from '@fair/components/common/Button';
import View from '@fair/components/common/View';
import Text from '@fair/components/common/Text';
import i18n from 'i18n-js';
import { MaterialIcons, Entypo, AntDesign, MaterialCommunityIcons, Feather, FontAwesome } from '@expo/vector-icons';
import { color } from '@fair/constants/Colors';
import { brandFontFamily, brandFontSize } from '@fair/constants/Fonts';
import FullWidthImage from "react-native-fullwidth-image";
import FTWebLayout from '@fair/components/custom/FTWebLayout/index.web';
import { useMediaQuery } from 'react-responsive';
import { useApi } from '@fair/hooks/useApi';
import Divider from '@fair/components/common/Divider/index.web';
import RegisterModal from '@fair/components/custom/RegisterModal';
import LoginModal from '@fair/components/custom/LoginModal';

const people_going = [
  { id: 1, image: require('../../assets/images/people_going_1.png') },
  { id: 2, image: require('../../assets/images/people_going_2.png') },
  { id: 3, image: require('../../assets/images/people_going_3.png') },
  { id: 4, image: require('../../assets/images/people_going_4.png') },
];

const wine_catalog = [
  { id: 1, caption: 'San Marzano', title: '60 Sessantanni OLD VInes Pri ...', location: 'Primitivo di Manduria, Italy', rating: 3.8, wine_stain: require('../../assets/images/wine_stain.png'), wine_bottle: require('../../assets/images/wine_bottle.png'), country: require('../../assets/images/italy_flag.png') },
  { id: 2, caption: 'San Marzano', title: '60 Sessantanni OLD VInes Pri ...', location: 'Primitivo di Manduria, Italy', rating: 3.8, wine_stain: require('../../assets/images/wine_stain.png'), wine_bottle: require('../../assets/images/wine_bottle.png'), country: require('../../assets/images/italy_flag.png') },
  { id: 3, caption: 'San Marzano', title: '60 Sessantanni OLD VInes Pri ...', location: 'Primitivo di Manduria, Italy', rating: 3.8, wine_stain: require('../../assets/images/wine_stain.png'), wine_bottle: require('../../assets/images/wine_bottle.png'), country: require('../../assets/images/italy_flag.png') },
  { id: 4, caption: 'San Marzano', title: '60 Sessantanni OLD VInes Pri ...', location: 'Primitivo di Manduria, Italy', rating: 3.8, wine_stain: require('../../assets/images/wine_stain.png'), wine_bottle: require('../../assets/images/wine_bottle.png'), country: require('../../assets/images/italy_flag.png') },
  { id: 5, caption: 'San Marzano', title: '60 Sessantanni OLD VInes Pri ...', location: 'Primitivo di Manduria, Italy', rating: 3.8, wine_stain: require('../../assets/images/wine_stain.png'), wine_bottle: require('../../assets/images/wine_bottle.png'), country: require('../../assets/images/italy_flag.png') },
  { id: 6, caption: 'San Marzano', title: '60 Sessantanni OLD VInes Pri ...', location: 'Primitivo di Manduria, Italy', rating: 3.8, wine_stain: require('../../assets/images/wine_stain.png'), wine_bottle: require('../../assets/images/wine_bottle.png'), country: require('../../assets/images/italy_flag.png') },
];

export default function FairDetailsScreen() {
  const md = useMediaQuery({ maxWidth: 1500 });
  const feature_cards_break = useMediaQuery({ maxWidth: 1350 });
  const image_size = useMediaQuery({ maxWidth: 1350 });
  const is_searchbar_column = useMediaQuery({ maxWidth: 900 });
  const sm = useMediaQuery({ maxWidth: 1000 });
  const modal_xs = useMediaQuery({ maxWidth: 800 });
  const modal_xxs = useMediaQuery({ maxWidth: 650 });
  const xs = useMediaQuery({ maxWidth: 600 });
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [winebars, setWinebars] = useState([])
  const [remeberMe, setRememberMe] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [restaurants, setRestaurants] = useState([])
  const [becomeTester, setBecomeTester] = useState({
    full_name: '',
    email: '',
    operating_system: '',
  })
  const [formLogin, setFormLogin] = useState({
    email: '',
    password: '',
  })
  const [formRegister, setFormRegister] = useState({
    username: '',
    email: '',
    password: '',
  })
  const indicator = new Animated.Value(0);
  const [visibleWidth, setVisibleWidth] = useState(0);
  const [wholeWidth, setWholeWidth] = useState(1);

  const indicatorSize = wholeWidth > visibleWidth ?
    visibleWidth * visibleWidth / wholeWidth :
    visibleWidth

  const difference = visibleWidth > indicatorSize ? visibleWidth - indicatorSize : 1;

  const getWineBarsClose = async () => {
    const { data } = await useApi('featured/winebars')
    setWinebars(data)
  }
  const getRestaurantsClose = async () => {
    const { data } = await useApi('featured/restaurants')
    setRestaurants(data)
  }
  useEffect(() => {

    getWineBarsClose()
    getRestaurantsClose()

  }, [])

  const onFormValueChange = (field: any, value: any) => {
    setBecomeTester(d => ({ ...d, [field]: value }))
  }

  const onLoginFormValueChange = (field: any, value: any) => {
    setFormLogin(d => ({ ...d, [field]: value }))
  }

  const onRegisterFormValueChange = (field: any, value: any) => {
    setFormRegister(d => ({ ...d, [field]: value }))
  }

  return (
    <FTWebLayout setShowSignInModal={setShowSignInModal}>
      <View>
        <View style={styles.heroContainer}>
          <View
            style={styles.linearGradient}
          />
          <Image
            source={require('../../assets/images/fair_details.png')}
            style={{ width: '100%', height: 281 }}
          />
          <View style={[styles.heroHeaderContainer, { marginLeft: xs ? 20 : sm ? 80 : md ? 100 : 150, marginTop: 20 }]}>
            <View style={styles.heroHeaderTextContainer}>
              <View style={styles.breadcrumbs}>
                <View style={styles.breadcrumbs}>
                  <Text style={styles.breadcrumbsText} type='text'>Home</Text>
                  <MaterialCommunityIcons name="slash-forward" size={20} color="#FFFFFF" style={{ opacity: 0.7 }} />
                  <Text style={styles.breadcrumbsText} type='text'>Fairs</Text>
                  <MaterialCommunityIcons name="slash-forward" size={20} color="#FFFFFF" style={{ opacity: 0.7 }} />
                  <Text style={[styles.breadcrumbsText, { opacity: 1 }]}>Sed ut perspiciatis unde omnis iste natus error</Text>
                </View>
              </View>
              <View style={styles.headerDateContainer}>
                <MaterialIcons name="date-range" size={30} color="#FFFFFF" />
                <Text style={styles.headerDateText} type='heading'>07 - 09 August, 2021</Text>
                <View style={styles.headerDateSubContainer}>
                  <Feather name="clock" size={30} color="#FFFFFF" />
                  <Text style={styles.headerDateText} type='heading'>3pm - 11pm</Text>
                </View>
                <View style={styles.headerDateSubContainer}>
                  <Text style={styles.headerDateText} type='heading'>By Blanditiis</Text>
                </View>
              </View>
              <Text style={styles.heroHeaderText} type='hero'>
                {/* {i18n.t('home.teaser')} */}
                Sed ut perspiciatis unde
                omnis iste natus error
              </Text>
              <View style={styles.locationContainer}>
                <Entypo name="location-pin" size={30} color="#FFFFFF" />
                <Text style={styles.locationText} type='heading'>Et harum quidem, Paseo de la Castellana 18, 7ª, ES-28046 Madrid, Spain</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.content}>
          <View style={[styles.searchBar, { flexDirection: is_searchbar_column ? 'column' : 'row' }]}>
            <View style={[styles.searchBarItemContainer, { width: is_searchbar_column ? '60%' : '15%' }]}>
              <Text style={styles.searchBarText} type="text">Number of Tickets</Text>
              <Text style={styles.searchBarTextInput} type="text">1</Text>
            </View>
            <View style={[styles.searchBarItemContainer, { width: is_searchbar_column ? '60%' : '15%', marginTop: is_searchbar_column ? 30 : 0 }]}>
              <Text style={styles.searchBarText} type="text">Ticket Price</Text>
              <Text style={[styles.searchBarTextInput, { borderWidth: 0 }]} type="text">€20</Text>
            </View>
            <View style={[styles.searchBarItemContainer, { width: is_searchbar_column ? '60%' : '15%', marginTop: is_searchbar_column ? 30 : 0 }]}>
              <Text style={[styles.searchBarText, { fontSize: 16 }]} type="text">Total: €20</Text>
              <View style={styles.subscribeButton}>
                <Button label={i18n.t('home.subscribe')} />
              </View>
            </View>
            <View style={[styles.searchBarItemContainer, { justifyContent: 'flex-end', marginTop: 30, width: is_searchbar_column ? '60%' : '15%' }]}>
              <View style={styles.sharingOptions}>
                <TouchableOpacity style={styles.option1}>
                  <Feather name="bookmark" size={20} color="#FFFFFF" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.option2}>
                  <Entypo name="share" size={20} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={[styles.lightContainer, { flexDirection: is_searchbar_column ? 'column' : 'row' }]}>
            <View style={[styles.leftContainer, { width: is_searchbar_column ? '100%' : '65%' }]}>
              <Text style={styles.header} type='heading'>Neque porro quisquam</Text>
              <Text style={styles.text} type='text'>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur
              </Text>
              <View style={{ marginTop: 40 }}>
                <Text style={styles.header} type='heading'>Neque porro quisquam</Text>
                <View style={styles.bulletsContainer}>
                  <View style={styles.bullet}>
                    <Entypo name="dot-single" size={25} color="#C4C4C4" />
                    <Text style={styles.bulletText} type='text'>Nam libero tempore</Text>
                  </View>
                  <View style={styles.bullet}>
                    <Entypo name="dot-single" size={25} color="#C4C4C4" />
                    <Text style={styles.bulletText} type='text'>Cum soluta nobis est eligendi optio cumque nihil</Text>
                  </View>
                  <View style={styles.bullet}>
                    <Entypo name="dot-single" size={25} color="#C4C4C4" />
                    <Text style={styles.bulletText} type='text'>Impedit quo minus id quod maxime placeat</Text>
                  </View>
                  <View style={styles.bullet}>
                    <Entypo name="dot-single" size={25} color="#C4C4C4" />
                    <Text style={styles.bulletText} type='text'>Facere possimus, omnis voluptas assumenda est, omnis dolor repellendus</Text>
                  </View>
                  <View style={styles.bullet}>
                    <Entypo name="dot-single" size={25} color="#C4C4C4" />
                    <Text style={styles.bulletText} type='text'>Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={[styles.rightContainer, { width: is_searchbar_column ? '100%' : '30%', marginTop: is_searchbar_column ? 30 : 0 }]}>
              <Text style={styles.rightHeader} type='heading'>Date:</Text>
              <Text style={styles.rightText} type='text'>7. - .9 August, 2021. (Fri - Sat)</Text>
              <Text style={[styles.rightHeader, { marginTop: 7 }]} type='heading'>Time:</Text>
              <Text style={styles.rightText} type='text'>3pm - 11pm</Text>
              <Text style={[styles.rightHeader, { marginTop: 7 }]} type='heading'>Venue:</Text>
              <View style={[styles.mapContainer, { width: is_searchbar_column ? '90%' : 290 }]}>
                <Image source={require('../../assets/images/map.png')} style={[styles.map, { width: is_searchbar_column ? '100%' : 284 }]} />
              </View>
              <Text style={[styles.mapCaption, { marginTop: 5, width: is_searchbar_column ? '90%' : 290 }]} type='text'>
                Et harum quidem Paseo de la Castellana
                18, 7ª, ES-28046, Madrid, Spain
              </Text>
              <Text style={[styles.rightHeader, { marginTop: 11 }]} type='heading'>Refund Policy:</Text>
              <Text style={[styles.rightText, { marginTop: 12 }]} type='text'>Quis autem vel eum iure reprehenderit</Text>
              <Text style={[styles.rightHeader, { marginTop: 26 }]} type='heading'>122 people are going</Text>
              <View style={[styles.peopleGoingContainer, { width: is_searchbar_column ? '90%' : 290 }]}>
                {people_going && people_going.map(item => (
                  <Image
                    key={item.id}
                    source={item.image}
                    style={[styles.peopleGoingImage, { marginLeft: item.id !== 1 ? 10 : 0 }]}
                  />
                ))}
              </View>
              <View style={{ width: 120, marginTop: 14 }}><Button label="RSPV" gold /></View>
            </View>
          </View>
          <View style={styles.lightContainerColumn}>
            <Text style={styles.header} type='heading'>Wine Catalog</Text>
            <View style={styles.scroller}>
              <View style={{ margin: 20 }}>
                <AntDesign name="left" size={20} color="#821D39" />
              </View>
              <View style={{ width: xs ? '80%' : '90%' }}>
                <View style={{ width: '100%', borderWidth: 1, height: 0, borderColor: '#E5E5E5' }} />
                <Animated.View style={[
                  { height: 3, backgroundColor: '#821D39', marginTop: -2.5, zIndex: 0 }, {
                    width: indicatorSize,
                    transform: [{
                      translateX: Animated.multiply(indicator, visibleWidth / wholeWidth).interpolate({
                        inputRange: [0, difference],
                        outputRange: [0, difference],
                        extrapolate: 'clamp'
                      })
                    }]
                  }]} />
                <View style={{ width: '8%', marginRight: -100, alignSelf: 'flex-end', height: 7, backgroundColor: '#FFFFFF', marginTop: -5 }} />
              </View>
              <View style={{ margin: 20 }}>
                <AntDesign name="right" size={20} color="#821D39" />
              </View>
            </View>
            <FlatList
              data={wine_catalog}
              horizontal
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              onContentSizeChange={(width, height) => {
                setWholeWidth(width)
              }}
              onLayout={({ nativeEvent: { layout: { x, y, width, height } } }) => setVisibleWidth(width)}
              scrollEventThrottle={16}
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { x: indicator } } }]
              )}
              style={{ width: '95%' }}
              renderItem={({ item }) => (
                <View style={styles.wineCatalogCard}>
                  <FontAwesome name="bookmark" color="#F7E546" size={20} style={styles.bookmarkIcon} />
                  <View style={styles.bottleContainer}>
                    <Image
                      style={styles.wineBottle}
                      source={item.wine_bottle}
                    />
                    <ImageBackground source={item.wine_stain} style={styles.wineStain} resizeMode='contain'>
                      <Text style={styles.wineRating} type='heading'>{item.rating}</Text>
                      <View style={styles.wineRatingContainer}>
                        <Entypo name="star" size={8} color={item.rating >= 0.5 ? "#71142D" : '#FFFFFF'} />
                        <Entypo name="star" size={8} color={item.rating >= 1.5 ? "#71142D" : '#FFFFFF'} />
                        <Entypo name="star" size={8} color={item.rating >= 2.5 ? "#71142D" : '#FFFFFF'} />
                        <Entypo name="star" size={8} color={item.rating >= 3.5 ? "#71142D" : '#FFFFFF'} />
                        <Entypo name="star" size={8} color={item.rating >= 4.5 ? "#71142D" : '#FFFFFF'} />
                      </View>
                    </ImageBackground>
                  </View>
                  <View style={styles.detailsContainer}>
                    <Text style={styles.caption} type='text'>{item.caption}</Text>
                    <Text style={styles.title} type='heading'>{item.title}</Text>
                    <Divider width={40} marginTop={10} />
                    <View style={styles.addressContainer}>
                      <Image
                        source={item.country}
                        style={styles.countryFlag}
                      />
                      <Text style={styles.address} type='text'>{item.location}</Text>
                    </View>
                  </View>
                </View>
              )}
            />
          </View>
        </View>
      </View>
      {showSignInModal &&
        <View style={[styles.centeredView, { left: modal_xxs ? '5%' : modal_xs ? '10%' : sm ? '20%' : feature_cards_break ? '25%' : md ? '30%' : '35%' }]}>
          <Modal
            animationType="slide"
            visible={showSignInModal}
            onRequestClose={() => {
            }}
          >
            <View style={styles.centeredView}>
              {showRegisterForm ? (
                <RegisterModal
                  onRegisterFormValueChange={onRegisterFormValueChange}
                  formRegister={formRegister}
                  agreeTerms={agreeTerms}
                  setAgreeTerms={setAgreeTerms}
                  setShowRegisterForm={setShowRegisterForm}
                  setShowSignInModal={setShowSignInModal}
                />
              ) : (
                <LoginModal
                  onLoginFormValueChange={onLoginFormValueChange}
                  formLogin={formLogin}
                  remeberMe={remeberMe}
                  setRememberMe={setRememberMe}
                  setShowRegisterForm={setShowRegisterForm}
                  setShowSignInModal={setShowSignInModal}
                />
              )}
            </View>
          </Modal>
        </View>}
    </FTWebLayout>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: color.white,
  },
  searchBar: {
    margin: 0,
    padding: 32,
    paddingHorizontal: '8%',
    width: '100%',
    backgroundColor: '#821D39',
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  searchBarItemContainer: {
    flexDirection: 'column',
    width: '15%',
  },
  searchBarText: {
    fontSize: 15,
    color: '#FFFFFF',
  },
  searchBarTextInput: {
    marginTop: 15,
    padding: 12,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    fontSize: 15,
    color: '#FFFFFF',
  },
  subscribeButton: {
    marginTop: 10,
    width: 150,
  },
  sharingOptions: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  option1: {
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    backgroundColor: '#71142D',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  option2: {
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    backgroundColor: '#71142D',
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginLeft: 1,
  },
  lightContainer: {
    backgroundColor: color.white,
    paddingVertical: 40,
    height: 'auto',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginTop: 130,
    flexDirection: 'row',
    paddingHorizontal: '8%',
    width: '100%',
  },
  lightContainerColumn: {
    backgroundColor: color.white,
    paddingVertical: 40,
    height: 'auto',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: '8%',
    width: '100%',
    overflow: 'scroll',

  },
  leftContainer: {
    width: '65%',
  },
  rightContainer: {
    width: '30%',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
    marginTop: 20,
    lineHeight: 26,
  },
  bulletsContainer: {
    marginTop: 16,
  },
  bullet: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  bulletText: {
    fontSize: 16,
    marginLeft: 10,
  },
  rightHeader: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  rightText: {
    fontSize: 16,
    marginTop: 5,
  },
  mapContainer: {
    padding: 2,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    marginTop: 14,
    borderRadius: 5,
  },
  map: {
    width: 284,
    height: 160,
    borderRadius: 5,
  },
  mapCaption: {
    fontSize: 16,
    lineHeight: 21,
    color: '#821D39',
    width: 290,
  },
  peopleGoingContainer: {
    width: 290,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 11,
  },
  peopleGoingImage: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: '#C4C4C4',
  },
  scroller: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  wineCatalogCard: {
    width: 230,
    height: 350,
    marginVertical: 36,
    marginHorizontal: 30,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    shadowColor: '#E5E5E5',
    shadowOffset: {
      height: 25,
      width: 5,
    },
    shadowRadius: 5,
    shadowOpacity: 0.25,
  },
  bookmarkIcon: {
    position: 'absolute',
    top: 16,
    right: 19,
  },
  bottleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 25,
  },
  wineBottle: {
    width: 119,
    height: 215,
  },
  wineStain: {
    width: 107,
    height: 132,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 10,
    paddingBottom: 10,
  },
  wineRating: {
    fontSize: 28,
    lineHeight: 33,
    color: '#71142D',
    fontWeight: 'bold'
  },
  wineRatingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scrollContainer: {
    //flex: 1,
    height: 'auto'
  },
  scrollContainerContent: {
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    height: 'auto'
  },
  detailsContainer: {
    marginTop: 15,
  },
  caption: {
    fontSize: 14,
    color: '#777777',
  },
  title: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: '900',
    lineHeight: 20,
    color: '#414141',
  },
  addressContainer: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  countryFlag: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
  },
  address: {
    marginLeft: 5,
    fontSize: 14,
    lineHeight: 16,
    color: '#414141',
  },
  darkContainer: {
    backgroundColor: color.lightGrey,
    paddingHorizontal: 40,
    paddingVertical: 40,
    height: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectorView: {
    backgroundColor: color.white,
    height: 110,
    minWidth: 1110,
    marginTop: -55,
    padding: 20,
    borderRadius: 5,
  },
  selectorContainer: {
    alignItems: 'center'
  },
  background: {

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowOpacity: 0.15,
    shadowRadius: 50,

    elevation: 5,
    marginBottom: 30,
    borderRadius: 5
  },
  container: {
    // flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 30
  },
  featuredHeader: {
    color: color.black,
    fontFamily: brandFontFamily.h1,
    // fontSize: brandFontSize.h1,
    paddingVertical: 10
  },
  sectionHeader: {
    alignItems: 'center'
  },
  heroContainer: {
    position: "relative",
  },
  heroHeaderTextContainer: {
    marginTop: 100,
    marginBottom: 25,
    width: '60%',
  },
  heroHeaderContainer: {
    left: 0,
    top: 0,
    right: 0,
    bottom: "25%",
    position: "absolute",
    alignItems: "flex-start",
    justifyContent: "center",
    marginLeft: 150,
    zIndex: 20
  },
  heroHeaderText: {
    fontSize: brandFontSize.hero,
    fontFamily: brandFontFamily.h1,
    color: "white",
    width: '100%',
  },
  heroHeaderSubText: {
    // fontSize: brandFontSize.h1,
    fontFamily: brandFontFamily.base,
    color: "white",
  },
  breadcrumbs: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  breadcrumbsText: {
    fontSize: 14,
    fontStyle: 'italic',
    opacity: 0.7,
    color: '#FFFFFF',
  },
  heroDateText: {
    fontSize: brandFontSize.h1,
    fontFamily: brandFontFamily.base,
    color: "white",
    marginBottom: 30
  },
  linearGradient: {
    position: "absolute",
    zIndex: 1,
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'black',
    opacity: 0.55
  },
  gold: {
    color: color.gold
  },
  betaText: {
    color: color.text,
    fontSize: brandFontSize.h3,
    marginBottom: 40
  },
  introText: {
    color: color.text,
    fontSize: brandFontSize.h3,
    marginVertical: 5

  },
  column: {
    flex: 1,
    maxWidth: '25vh',
    marginHorizontal: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  datePickerStyle: {
    width: '100%',
  },
  content: {
    //flexGrow: 1,
    //minHeight: '75vh'
  },
  mobileContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 1,
    backgroundColor: color.light_gray
  },
  mobileHeader: {
    fontFamily: brandFontFamily.h1,
    fontSize: brandFontSize.h1
  },
  mobileText: {
    fontFamily: brandFontFamily.base,
    fontSize: brandFontSize.h2,
    justifyContent: 'center'
  },
  becomeTesterContainer: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    shadowRadius: 5,
    shadowColor: '#E5E5E5',
    shadowOffset: {
      height: 10,
      width: 10,
    },
    shadowOpacity: 0.5,
    padding: 30,
    alignItems: 'center',
  },
  fieldsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  becomeTesterInput: {
    width: '30%',
    flexDirection: 'row',
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#F0F0F0',
    marginHorizontal: '2%',
  },
  locationField: {
    marginBottom: '10px',
    borderRadius: 5,
    paddingTop: '10px',
    paddingBottom: '10px',
    paddingLeft: '20px',
    paddingRight: '20px',
    fontSize: 18,
    borderWidth: 0,
    borderColor: '#E5E5E5'
  },
  centeredView: {
    position: 'absolute',
    top: 30,
    left: '35%',
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  headerDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 35,
  },
  headerDateText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginLeft: 10,
  },
  headerDateSubContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 35,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 25,
  },
  locationText: {
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft: 5,
  }
});
