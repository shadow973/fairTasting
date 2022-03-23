import React, { useEffect, useState } from 'react';
import { Image, TextInput, StyleSheet, FlatList, Modal } from 'react-native';
import Button from '@fair/components/common/Button';
import View from '@fair/components/common/View';
import Text from '@fair/components/common/Text';
import { useNavigation, useRoute } from '@react-navigation/core';
import { useAuthContext } from '@fair/context/AuthContextProvider';
import i18n from 'i18n-js';
import { MaterialIcons, Entypo } from '@expo/vector-icons';
import { color } from '@fair/constants/Colors';
import { Picker } from '@react-native-picker/picker';
import { brandFontFamily, brandFontSize } from '@fair/constants/Fonts';
import FullWidthImage from "react-native-fullwidth-image";
import FTWebLayout from '@fair/components/custom/FTWebLayout/index.web';
import { useMediaQuery } from 'react-responsive';
import Autocomplete from "react-google-autocomplete";
import { GoogleAddressParser } from '@fair/components/custom/GoogleAddressParser';
import { useApi } from '@fair/hooks/useApi';
import Divider from '@fair/components/common/Divider/index.web';
import DatePicker from 'react-native-datepicker';
import FTFeatureFairCard from '@fair/components/custom/FTFeatureFairCard/index.web';
import FTFTFeatureWineCard from '@fair/components/custom/FTFeatureWineCard/index.web';
import FTFeatureRestaurantCard from '@fair/components/custom/FTFeatureRestaurantCard/index.web';
import FTFeatureWineShopCard from '@fair/components/custom/FTFeatureWineShopCard/index.web';
import FTFeatureWineProducerCard from '@fair/components/custom/FTFeatureWineProducerCard/index.web';
import RegisterModal from '@fair/components/custom/RegisterModal';
import LoginModal from '@fair/components/custom/LoginModal';

const featured_fairs = [
  { id: 1, date: '12. -15. May ', title: 'Sed ut perspiciatis unde omnis iste natus error ', by: 'By UAB', image: require('../../assets/images/featured_fairs_1.png') },
  { id: 2, date: '02. - 06. June ', title: 'Lorem Ipsum ', by: 'By Blanditiis ', image: require('../../assets/images/featured_fairs_2.png') },
  { id: 3, date: '27. - 29. July ', title: 'Nemo enim ipsam voluptatem quia  sit  aut odit aut fugit, sed quia  ', by: 'By Praesentium ', image: require('../../assets/images/featured_fairs_3.png') },
  { id: 4, date: '03. - 04. September ', title: 'Nam libero tempore ', by: 'By UAB', image: require('../../assets/images/featured_fairs_4.png') },
];

const featured_winebars = [
  { id: 1, title: 'Lorem Ipsum Bar', location: 'Zagreb, Croatia', image: require('../../assets/images/featured_wine_1.png') },
  { id: 2, title: 'Doloremque  Bar', location: 'Zagreb, Croatia', image: require('../../assets/images/featured_wine_2.png') },
  { id: 3, title: 'Rem Aperiam', location: 'Zagreb, Croatia', image: require('../../assets/images/featured_wine_1.png') },
];

const featured_wineshops = [
  { id: 1, title: 'Lorem Ipsum Bar', location: 'Zagreb, Croatia', image: require('../../assets/images/featured_wine_1.png') },
  { id: 2, title: 'Doloremque  Bar', location: 'Zagreb, Croatia', image: require('../../assets/images/featured_wine_2.png') },
  { id: 3, title: 'Rem Aperiam', location: 'Zagreb, Croatia', image: require('../../assets/images/featured_wine_1.png') },
];

const featured_restaurants = [
  { id: 1, title: 'Ratione Voluptatem', location: 'Zagreb, Croatia', image: require('../../assets/images/featured_restaurant_1.png') },
  { id: 2, title: 'Magni Dolores', location: 'Zagreb, Croatia', image: require('../../assets/images/featured_restaurant_2.png') },
  { id: 3, title: 'Reprehenderit', location: 'Zagreb, Croatia', image: require('../../assets/images/featured_restaurant_3.png') },
];

const featured_wine_producers = [
  { id: 1, title: 'Ratione Voluptatem', location: 'Zagreb, Croatia', image: require('../../assets/images/featured_restaurant_1.png') },
  { id: 2, title: 'Magni Dolores', location: 'Zagreb, Croatia', image: require('../../assets/images/featured_restaurant_2.png') },
  { id: 3, title: 'Reprehenderit', location: 'Zagreb, Croatia', image: require('../../assets/images/featured_restaurant_3.png') },
];

export default function WelcomeScreen({ navigation }) {
  const [badcredentials, setBadcredentials] = React.useState(false)
  const { login, signup, verifySignup } = useAuthContext()
  const lg = useMediaQuery({ maxWidth: 1800 });
  const md = useMediaQuery({ maxWidth: 1500 });
  const feature_cards_break = useMediaQuery({ maxWidth: 1350 });
  const is_searchbar_column = useMediaQuery({ maxWidth: 1100 });
  const sm = useMediaQuery({ maxWidth: 1000 });
  const modal_xs = useMediaQuery({ maxWidth: 800 });
  const modal_xxs = useMediaQuery({ maxWidth: 650 });
  const xs = useMediaQuery({ maxWidth: 600 });
  const { params } = useRoute()
  const { navigate } = useNavigation()
  const { isTokenValid, handleAppleSignIn } = useAuthContext()
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [winebars, setWinebars] = useState([])
  const [remeberMe, setRememberMe] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [verify, setVerify] = useState(false);
  const [securityCodeValid, setSecurityCodeValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [emailValid, setEmailValid] = useState(true);
  const [email, setEmail] = useState('');
  const [restaurants, setRestaurants] = useState([])
  const [locationValues, setLocationValues] = useState({
    location_name: '',
    street_number: '',
    street_name: '',
    city: '',
    postal_code: '',
    state: '',
    country: ''
  })
  const [geometryValues, setGeometryValues] = useState({
    lat: '',
    lon: ''
  })
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
  const [verifyValues, setVerifyFormvalues] = useState({
    email: undefined,
    code: undefined,
    password: undefined,
    firstname: undefined,
    lastname: undefined
  })

  const validateEmail = (email: any) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    return reg.test(email);
  }
  const validateSecurityCode = (code: any) => {
    let reg = /^[0-9]{6}$/
    return reg.test(code);
  }
  const validatePassword = (password: any) => {
    let reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    return reg.test(password);
  }



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

  const handleSubmit = async () => {
    try {
      setBadcredentials(false)
      await login(formLogin)
    } catch (error) {
      setBadcredentials(true)
    }
  }

  const onLoginFormValueChange = (field: any, value: any) => {
    setFormLogin(d => ({ ...d, [field]: value }))
  }

  const handleRegisterSubmit = async () => {
    if(validateEmail(formRegister.email)) {
      setEmailValid(true)
      await signup(formRegister)
      setEmail(formRegister.email)
      setVerify(true)
    } else {
      setEmailValid(false)
    }
  }
  const handleVerifySubmit = async () => {
    
    const values = { ...verifyValues, email: email }
    if(validateSecurityCode(verifyValues.code) && validatePassword(verifyValues.password)) {
      setPasswordValid(false)
      setSecurityCodeValid(false)
      try {
        await verifySignup(values)
        await login(formRegister)
      } catch {
        //alert('Sign up is failed')
      }
    } else {
      setPasswordValid(validatePassword(verifyValues.password) == false);
      setSecurityCodeValid(validateSecurityCode(verifyValues.code) == false);
    }
  }

  const onRegisterFormValueChange = (field: any, value: any) => {
    if (field == "email") {
      setFormRegister(d => ({ ...d, [field]: value.toLowerCase().trim() }))
      setVerifyFormvalues(d => ({ ...d, [field]: value.toLowerCase().trim() }))
    } else {
      setFormRegister(d => ({ ...d, [field]: value }))
      setVerifyFormvalues(d => ({ ...d, [field]: value }))
    }
  }
  const onVerifyFormValueChange = (field: any, value: any) => {
    setVerifyFormvalues(d => ({ ...d, [field]: value }))
  }

  return (
    <FTWebLayout setShowSignInModal={setShowSignInModal}>
      {/* {isTabletOrMobile ? <>
        <View style={styles.mobileContainer}>
          <Text style={styles.mobileHeader}>{i18n.t('landing.launching_soon')}</Text>
          <Text style={styles.mobileText}>{i18n.t('landing.launching_soon_text')}</Text>
          <View style={{marginVertical: 10}}>
                    <a href='https://apps.apple.com/us/app/fairtasting/id1562711645#?platform=iphone' target='_blank'>
                    <Image source={{ uri: "https://cdn.fairtasting.com/images/appstore_en.png" }} style={{ height: 50, width: 350, resizeMode: 'contain' }} />
                    </a>
                    </View>
          <View style={{marginVertical: 10}}>
          <a href='https://play.google.com/store/apps/details?id=com.fairtasting.app' target='_blank'>
                    <Image source={{ uri: "https://cdn.fairtasting.com/images/google_play_en.png" }} style={{ height: 50, width: 350, resizeMode: 'contain' }} />
                    </a>
                    </View>
                    
        </View>

      </> : } */}
      <View>
        <View style={styles.heroContainer}>
          <View
            style={styles.linearGradient}
          />
          <FullWidthImage
            source={require('../../assets/images/landing-page-banner.png')}
            style={{ maxHeight: 657 }}
          />
          <View style={[styles.heroHeaderContainer, { marginLeft: xs ? 20 : sm ? 80 : md ? 100 : 150, marginTop: 20 }]}>
            <View style={styles.heroHeaderTextContainer}>
              <Text style={styles.heroHeaderSubText} type='heading'>07 - 09 August, 2021</Text>
              <Text style={styles.heroHeaderText} type='hero'>
                {/* {i18n.t('home.teaser')} */}
                Sed ut perspiciatis unde
                omnis iste natus error
              </Text>
              <Text style={styles.heroHeaderSubText} type='heading'>
                {/* {i18n.t('home.sub_teaser')} */}
                By Blanditiis
              </Text>
              <View style={{ width: 250, marginTop: xs || sm ? 0 : md ? 20 : 35 }}>
                <Button dark onPress={() => { }} label="Purchase Tickets" />
              </View>
            </View>
            <View>
            </View>
          </View>
        </View>
        <View style={styles.content}>
          <View style={[styles.searchBar, { width: feature_cards_break ? '80%' : '60%', flexDirection: is_searchbar_column ? 'column' : 'row', marginTop: xs ? -5 : sm ? -40 : -55 }]}>
            <View style={{ flexDirection: 'row', alignItems: 'center', width: is_searchbar_column ? '100%' : '30%' }}>
              <Entypo name="location-pin" color="#5C5A5B" size={30} />
              <Autocomplete
                apiKey={'AIzaSyA2wJOlG2yHLJuzM3I1MLtoYJuKVautrgs'}
                placeholder="Location"
                style={{
                  borderRadius: 5,
                  paddingLeft: '20px',
                  fontSize: 18,
                  borderWidth: 0,
                  borderColor: '#E5E5E5'
                }}
                onPlaceSelected={(place) => {
                  const address = new GoogleAddressParser(place?.address_components).result();
                  const geo = { lat: place?.geometry.location.lat(), lon: place?.geometry.location.lng() };
                  setLocationValues(address)
                  setGeometryValues(geo)
                }}
                options={{
                  types: ["address"],
                }}
              />
            </View>
            {!is_searchbar_column && (<View style={{ width: 0, height: 72, borderWidth: 1, borderColor: '#E5E5E5' }} />)}
            <View style={{ flexDirection: 'row', alignItems: 'center', width: is_searchbar_column ? '90%' : '30%', marginLeft: is_searchbar_column ? '-10%' : 30, marginTop: is_searchbar_column ? 20 : 0 }}>
              <MaterialIcons name="date-range" color="#5C5A5B" size={30} />
              <DatePicker
                style={styles.datePickerStyle}
                // date={date} //initial date from state
                mode="date" //The enum of date, datetime and time
                placeholder="This month"
                format="DD-MM-YYYY"
                minDate="01-01-2016"
                maxDate="01-01-2019"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    width: 0,
                    height: 0,
                  },
                  dateInput: {
                    marginLeft: 20,
                    borderWidth: 0,
                    alignItems: 'flex-start',
                  },
                  placeholderText: {
                    color: '#5C5A5B'
                  },
                  dateText: {
                    color: '#5C5A5B',
                  },
                }}
              // onDateChange={(date) => {
              //   setDate(date);
              // }}
              />
              <Entypo name="chevron-down" color="#5C5A5B" size={30} />
            </View>
            <View style={{ width: is_searchbar_column ? '90%' : '38%', justifyContent: 'flex-end', alignItems: 'flex-end', marginTop: is_searchbar_column ? 20 : 0 }}>
              <View style={{ width: is_searchbar_column ? '100%' : 155, }}>
                <Button label="Search Fairs" gold />
              </View>
            </View>
          </View>
          <View style={styles.lightContainer}>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Text style={styles.featuredHeader} type='heading'>
                {/* {i18n.t('home.featured_events')} */}
                Featured Fairs
              </Text>
            </View>
            <Text style={{ fontFamily: brandFontFamily.h2, marginTop: 35, fontSize: 16 }} type='text'>
              {/* {i18n.t('no_tasting')} */}
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
            </Text>
            <View style={{ marginTop: 30 }}>
              <Divider width={100} />
            </View>

            <View style={{ width: modal_xxs ? '100%' : feature_cards_break ? '70%' : '60%', marginTop: 40 }}>
              {feature_cards_break ? (
                <FlatList
                  key="_"
                  data={featured_fairs}
                  renderItem={({ item }) => (
                    <FTFeatureFairCard
                      date={item.date}
                      title={item.title}
                      by={item.by}
                      image={item.image}
                      navigation={navigation}
                    />
                  )}
                />
              ) : (
                <FlatList
                  key="#"
                  data={featured_fairs}
                  numColumns={2}
                  renderItem={({ item }) => (
                    <FTFeatureFairCard
                      date={item.date}
                      title={item.title}
                      by={item.by}
                      image={item.image}
                      navigation={navigation}
                    />
                  )}
                />
              )}
            </View>
            <View style={{ marginTop: 20 }}>
              <Button label="ALL FAIRS" pro />
            </View>
          </View>
          <View style={styles.darkContainer}>
            <View style={{ alignItems: 'center', justifyContent: 'center' }} row>
              <Text style={styles.featuredHeader} type='heading'>{i18n.t('home.featured_winebars')}</Text>
            </View>
            <Text style={{ fontFamily: brandFontFamily.h2, marginTop: 35, fontSize: 16 }} type='text'>
              {/* {i18n.t('no_tasting')} */}
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
            </Text>
            <View style={{ marginTop: 30 }}>
              <Divider width={100} />
            </View>
            <View style={{ width: modal_xxs ? '100%' : '60%', marginTop: 40 }}>
              {feature_cards_break ? (
                <FlatList
                  key="_"
                  data={featured_winebars}
                  renderItem={({ item }) => (
                    <FTFTFeatureWineCard
                      location={item.location}
                      title={item.title}
                      image={item.image}
                      navigation={navigation}
                    />
                  )}
                />
              ) : (
                <FlatList
                  key="#"
                  data={featured_winebars}
                  numColumns={3}
                  renderItem={({ item }) => (
                    <FTFTFeatureWineCard
                      location={item.location}
                      title={item.title}
                      image={item.image}
                      navigation={navigation}
                    />
                  )}
                />
              )}
            </View>
            <View style={{ marginTop: 20 }}>
              <Button label="ALL WINEBARS" pro style={{ backgroundColor: 'transparent' }} />
            </View>
            {/* {winebars == null || winebars.length == 0 || winebars == undefined ? <>
              <NoWineBar />
            </> : <>
              <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContainerContent} horizontal>
                <View style={{ alignItems: 'center', justifyContent: 'center' }} row>

                  {winebars.map((e, id) => <FTWinebarCardHorizontal key={id} {...e} />)}
                </View>

              </ScrollView>
            </>} */}
          </View>
          <View style={styles.lightContainer}>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Text style={styles.featuredHeader} type='heading'>{i18n.t('home.featured_restaurants')}</Text>
            </View>
            <Text style={{ fontFamily: brandFontFamily.h2, marginTop: 35, fontSize: 16 }} type='text'>
              Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam
            </Text>
            <View style={{ marginTop: 30 }}>
              <Divider width={100} />
            </View>
            <View style={{ width: modal_xxs ? '100%' : '60%', marginTop: 40 }}>
              {feature_cards_break ? (
                <FlatList
                  key="_"
                  data={featured_restaurants}
                  renderItem={({ item }) => (
                    <FTFeatureRestaurantCard
                      title={item.title}
                      location={item.location}
                      image={item.image}
                    />
                  )}
                />
              ) : (
                <FlatList
                  key="#"
                  data={featured_restaurants}
                  numColumns={3}
                  renderItem={({ item }) => (
                    <FTFeatureRestaurantCard
                      title={item.title}
                      location={item.location}
                      image={item.image}
                    />
                  )}
                />
              )}
            </View>
            <View style={{ marginTop: 20 }}>
              <Button label="ALL RESTAURANTS" pro />
            </View>
            {/* {winebars == null || winebars.length == 0 || winebars == undefined ? <>
              <NoWineBar />
            </> : <>
              <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContainerContent} horizontal>
                <View style={{ alignItems: 'center', justifyContent: 'center' }} row>
                  {restaurants.map((e, id) => <FTWinebarCardHorizontal key={id} {...e} />)}
                </View>
              </ScrollView>
            </>} */}
          </View>
          <View style={styles.darkContainer}>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Text style={styles.featuredHeader} type='heading'>
                Featured Wineshops
              </Text>
            </View>
            <Text style={{ fontFamily: brandFontFamily.h2, marginTop: 35, fontSize: 16 }}>
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
            </Text>
            <View style={{ marginTop: 30 }}>
              <Divider width={100} />
            </View>
            <View style={{ width: modal_xxs ? '100%' : '60%', marginTop: 40 }}>
              {feature_cards_break ? (
                <FlatList
                  key="_"
                  data={featured_wineshops}
                  renderItem={({ item }) => (
                    <FTFeatureWineShopCard
                      title={item.title}
                      image={item.image}
                      location={item.location}
                      navigation={navigation}
                    />
                  )}
                />
              ) : (
                <FlatList
                  key="#"
                  data={featured_wineshops}
                  numColumns={3}
                  renderItem={({ item }) => (
                    <FTFeatureWineShopCard
                      title={item.title}
                      image={item.image}
                      location={item.location}
                      navigation={navigation}
                    />
                  )}
                />
              )}
            </View>
            <View style={{ marginTop: 20 }}>
              <Button label="ALL WINESHOPS" pro style={{ backgroundColor: 'transparent' }} />
            </View>
          </View>
          <View style={styles.lightContainer}>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Text style={styles.featuredHeader} type='heading'>Featured Wine Producers</Text>
            </View>
            <Text style={{ fontFamily: brandFontFamily.h2, marginTop: 35, fontSize: 16 }}>
              Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam
            </Text>
            <View style={{ marginTop: 30 }}>
              <Divider width={100} />
            </View>
            <View style={{ width: modal_xxs ? '100%' : '60%', marginTop: 40 }}>
              {feature_cards_break ? (
                <FlatList
                  key="_"
                  data={featured_wine_producers}
                  renderItem={({ item }) => (
                    <FTFeatureWineProducerCard
                      title={item.title}
                      location={item.location}
                      image={item.image}
                    />
                  )}
                />) : (
                <FlatList
                  key="#"
                  data={featured_wine_producers}
                  numColumns={3}
                  renderItem={({ item }) => (
                    <FTFeatureWineProducerCard
                      title={item.title}
                      location={item.location}
                      image={item.image}
                    />
                  )}
                />
              )}
            </View>
            <View style={{ marginTop: 20 }}>
              <Button label="ALL WINE PRODUCERS" pro />
            </View>
          </View>
          <View style={styles.lightContainer}>
            <View style={{ alignItems: 'center', justifyContent: 'center' }} row>
              <Text style={styles.featuredHeader} type='heading'>{i18n.t('what_is')}</Text>
            </View>
            <Divider width={100} />
            <View style={{ flexDirection: md ? 'column' : 'row', alignItems: 'flex-start', justifyContent: 'center', paddingHorizontal: xs || sm ? '5%' : '10%', marginTop: 30 }}>
              <View style={{ width: xs || sm ? '90%' : md ? '80%' : '35%', alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
                <Text style={{ fontFamily: brandFontFamily.h2, marginBottom: 50, textAlign: 'justify', fontSize: 16, lineHeight: 26 }}>
                  {/* {i18n.t('what_is_text')} */}
                  At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. {'\n\n'}
                  Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', width: '100%' }}>
                  <a href='https://play.google.com/store/apps/details?id=com.fairtasting.app' target='_blank'>
                    <Image source={require('../../assets/images/google_play.png')} style={{ height: 50, width: 215, resizeMode: 'contain' }} />
                  </a>
                  <a href='https://apps.apple.com/us/app/fairtasting/id1562711645#?platform=iphone' target='_blank'>
                    <Image source={require('../../assets/images/app_store.png')} style={{ height: 50, width: 215, resizeMode: 'contain' }} />
                  </a>
                </View>
              </View>
              <View style={{ width: xs || sm ? '90%' : md ? '70%' : '50%', alignItems: 'center', justifyContent: 'center' }}>
                <Image source={require('../../assets/images/what_is_fairtasting.png')} style={{ height: md ? 350 : lg ? 400 : 500, width: '100%' }} resizeMode='contain' />
              </View>
            </View>
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
                  onRegisterFormValueChange={onVerifyFormValueChange}
                  formRegister={formRegister}
                  agreeTerms={agreeTerms}
                  setAgreeTerms={setAgreeTerms}
                  setShowRegisterForm={setShowRegisterForm}
                  setShowSignInModal={setShowSignInModal}
                  handleSubmit={handleVerifySubmit}
                />
              ) : (
                <LoginModal
                  onLoginFormValueChange={onLoginFormValueChange}
                  formLogin={formLogin}
                  remeberMe={remeberMe}
                  setRememberMe={setRememberMe}
                  setShowRegisterForm={setShowRegisterForm}
                  setShowSignInModal={setShowSignInModal}
                  handleSubmit={handleSubmit}
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
    padding: 32,
    width: '60%',
    backgroundColor: '#FFFFFF',
    marginTop: -55,
    alignSelf: 'center',
    borderRadius: 5,
    shadowOpacity: 0.5,
    shadowColor: '#E5E5E5',
    shadowOffset: {
      height: 5,
      width: -2
    },
    shadowRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
  lightContainer: {
    backgroundColor: color.white,
    paddingHorizontal: 40,
    paddingVertical: 40,
    height: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
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
    // fontSize: brandFontSize.hero,
    fontFamily: brandFontFamily.h1,
    color: "white",
  },
  heroHeaderSubText: {
    // fontSize: brandFontSize.h1,
    fontFamily: brandFontFamily.base,
    color: "white",
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
});
