import Text from "@fair/components/common/Text"
import View from "@fair/components/common/View"
import { color } from "@fair/constants/Colors"
import React, { useContext, useEffect, useRef, useState } from "react"
import { Dimensions, Image, Pressable, ScrollView, StyleSheet, TextInput, KeyboardAvoidingView, Platform } from "react-native"
import { border, general, text } from "@fair/constants/Styles"
import { AntDesign, Entypo } from '@expo/vector-icons';
import CountryFlag from "react-native-country-flag"
import SelectDropdown from "react-native-select-dropdown"
import Input from "@fair/components/common/Input"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import FTPillsSelector from "@fair/components/custom/FTPillsSelector"
import SwitchButton from "@fair/components/common/SwitchButton"
import Slider from '@react-native-community/slider';
import Button from "@fair/components/common/Button"
import { useWineReviewContext } from "@fair/context/WineReviewContextProvider"
import { useWineDetailContext } from "@fair/context/WineDetailContextProvider"
import { useNavigation } from "@react-navigation/core"
import i18n from 'i18n-js';
import { Picker } from '@react-native-picker/picker';
import { addListener } from "expo-updates"
export default function WineCollectReview() {

  const matched = false
  let scroll = useRef();
  const [hasColor, setHasColor] = useState(false)
  const [sliderValue, setSliderValue] = useState(1)
  const { wineReviewRecord, wineCountries, setWineState, setReviewWine, setSweetnessLevel, setQualityLevel, setScoreLevel, setDrinkabilityLevel, completeReview } = useWineReviewContext();
  const { vintageList, wineDetail, smellPills, tastePills, wineType, wineColor, wineStates, wineSweetnesss, wineQuality, wineDrinkability, setWineVintage, setWineName, setWineCountry, setWineCategory, setWineCategoryColor,getWineDetail, getSmellPills, getTastePills } = useWineDetailContext();
  const { navigate } = useNavigation();

  const [wineNameForm, setWineNameForm] = useState({
    wine_name: '',
  })
  const [wineNotesForm, setWineNotesForm] = useState({
    notes: '',
  })
  const onWineFormValueChange = (field: any, value: any) => {
    setWineNameForm(d => ({ ...d, [field]: value }))
  }
  const onWineNoteFormValueChange = (field: any, value: any) => {
    setWineNotesForm(d => ({ ...d, [field]: value }))
  }
  const saveWineName = async () => {
    setWineName(wineDetail, wineNameForm['wine_name'])
  }
  const endReview = async () => {
    completeReview(wineReviewRecord, wineNotesForm['notes'])
    navigate("UpcomingEvents", {screen:"MyWine"});
  }

  useEffect(() => {
    if (wineReviewRecord !== undefined) {
      getWineDetail(wineReviewRecord.wine_id)
    }
  }, [wineReviewRecord])
  useEffect(() => {
    if (wineDetail !== undefined && wineDetail !== null) {
        if (wineDetail.id !== wineReviewRecord.wine_id) {
          setReviewWine(wineReviewRecord, wineDetail.id)
        }
    }
  }, [wineDetail])

  return (
    <View>
      <KeyboardAwareScrollView innerRef={ref => {
    scroll.current = ref
  }}>
        <View style={{ ...general.header, justifyContent: 'space-between' }} safeArea>
          <Pressable onPress={() => navigate("UpcomingEvents", { screen: 'Home' })}>
            <Text color={color.white} style={text.titleH3Family}>Cancel</Text>
          </Pressable>
          <Text color={color.white} style={text.titleH3Family}>Review Wine</Text>
          <Text color={color.white} onPress={() => null} style={text.titleH3Family}>Reset</Text>
        </View>
        {(wineReviewRecord && wineDetail) ? <>
          {matched ?
            <View>
              {/* <View style={{ ...general.center, flexDirection: 'row', backgroundColor: color.brandGray }}>
                <AntDesign name="checkcircleo" size={18} color="black" />
                <Text style={{ ...text.mediumSizeDefaultFamily, marginVertical: 20 }}>  We matched your wine!</Text>
              </View>
              <View style={{ backgroundColor: color.white }}>
                <View style={border.bottomGreyLight}>
                  <View style={{ flexDirection: 'row', margin: 20, }}>
                    <Image source={{ uri: `https://cdn.fairtasting.com/${wineReviewRecord.image_path}` }} resizeMethod='resize' style={styles.imgStyle} />
                    <View>
                      <View style={{ ...border.bottomGreyLight, marginLeft: 15 }}>
                        <Text style={{ ...text.smallSizeDefaultFamily, opacity: 0.8 }}>Amore Passo</Text>
                        <Text style={text.mediumSizeDefaultFamily}>Primitivo - Malvasia Nera</Text>
                      </View>
                      <View style={styles.viewStyle}>
                        <CountryFlag isoCode={'it'} size={12} style={styles.flagStyle} />
                        <Text style={{ ...text.smallSizeDefaultFamily, opacity: 0.8 }}>Puglia, Italy</Text>
                        <Entypo name='star' size={12} style={{ paddingLeft: 10 }}></Entypo>
                        <Text style={{ ...text.smallSizeDefaultFamily, opacity: 0.8 }}>88/100</Text>
                      </View>
                      {true &&
                        <View style={styles.viewStyle}>
                          <Image source={require('@assets/images/vintage.png')} style={styles.vintageStyle} />
                          <Text style={{ ...text.smallSizeDefaultFamily, opacity: 0.8 }}>{'Vintage'}</Text>
                        </View>
                      }
                    </View>
                  </View>
                </View>
                <View style={{ ...border.bottomGreyLight, marginHorizontal: 20, }}>
                  <View style={{ marginTop: 30, marginBottom: 20, }}>
                    <Text style={text.mediumSizeH5Family}>VINTAGE: </Text>
                  </View>
                  <SelectDropdown
                    data={vintage}
                    onSelect={(selectedItem, index) => null}
                    buttonTextAfterSelection={(selectedItem, index) => {
                      return selectedItem
                    }}
                    rowTextForSelection={(item, index) => {
                      return item
                    }}
                    buttonStyle={[border.greySmallRadius, styles.dropDownStyle]}
                    buttonTextStyle={text.mediumSizeDefaultFamily}
                    dropdownIconPosition='right'
                    renderDropdownIcon={() => {
                      return <AntDesign name="down" size={8} color="black" />
                    }}
                    defaultButtonText='Select Vintage'
                  />
                </View>
                <View style={{ marginHorizontal: 20, paddingBottom: 20 }}>
                  <View style={{ marginTop: 30, paddingBottom: 20 }}>
                    <Text style={text.mediumSizeH5Family}>VINTAGE: </Text>
                  </View>
                  <View>
                    <SelectDropdown
                      data={vintage}
                      onSelect={(selectedItem, index) => null}
                      buttonTextAfterSelection={(selectedItem, index) => {
                        return selectedItem
                      }}
                      rowTextForSelection={(item, index) => {
                        return item
                      }}
                      buttonStyle={[border.greySmallRadius, styles.dropDownStyle]}
                      buttonTextStyle={text.mediumSizeDefaultFamily}
                      dropdownIconPosition='right'
                      renderDropdownIcon={() => {
                        return <AntDesign name="down" size={8} color="black" />
                      }}
                      defaultButtonText='Select Vintage'
                    />
                  </View>
                </View>
              </View> */}
            </View>
            :
            <View>
              <View style={{ ...general.center, flexDirection: 'row', backgroundColor: color.brandGray }}>
                <Text style={{ ...text.mediumSizeDefaultFamily, marginVertical: 20 }}>No wine match. Add the wine info below!</Text>
              </View>
              <Image source={{ uri: `https://cdn.fairtasting.com/${wineReviewRecord.image_path}` }} resizeMethod='resize' style={{ width: Dimensions.get('screen').width, aspectRatio: 1, marginBottom: 10 }} />
              <Text style={{ ...text.titleBaseFamily, marginHorizontal: 20, marginVertical: 20 }}>Basic info</Text>
              <View style={{ backgroundColor: color.white, paddingTop: 10, paddingHorizontal: 20, marginBottom: 20 }}>
                <View style={{ ...border.bottomGreyLight, marginVertical: 20, paddingBottom: 10 }}>
                  <Text style={text.mediumSizeH5Family}>{i18n.t('review.wine_name')}:</Text>
                  {wineDetail.wine.name ? <>
                    <Text style={{ ...text.mediumSizeH5Family, marginVertical: 10 }}>{wineDetail.wine.name}</Text>
                  </> : <>
                    <Input
                      placeholder='Type the name of this wine'
                      placeholderColor='#91868A'
                      onChange={onWineFormValueChange.bind(null, 'wine_name')}
                      value={wineNameForm['wine_name']}
                      style={{ ...border.greySmallRadius, marginTop: 10 }}
                      inputStyle={{ ...text.mediumSizeDefaultFamily, margin: 8 }} />
                    <Button label="Save" onPress={() => saveWineName()} dark />
                  </>}
                </View>
                <View style={[border.bottomGreyLight, { paddingBottom: 10 }]}>
                  <Text style={text.mediumSizeH5Family}>{i18n.t('review.country')}:</Text>
                  <SelectDropdown
                    data={wineCountries}
                    onSelect={(selectedItem, index) =>
                      setWineCountry(wineDetail, selectedItem.id)
                    }
                    buttonTextAfterSelection={(selectedItem, index) => {
                      return selectedItem.country_name;
                    }}
                    rowTextForSelection={(item, index) => {
                      return item.country_name
                    }}
                    buttonStyle={[border.greySmallRadius, styles.dropDownStyle]}
                    buttonTextStyle={text.mediumSizeDefaultFamily}
                    dropdownIconPosition='right'
                    renderDropdownIcon={() => {
                      return <AntDesign name="down" size={8} color="black" />
                    }}
                    defaultButtonText='Select Country'

                  />
                </View>
                <View style={[border.bottomGreyLight, { paddingVertical: 10 }]}>
                  <Text style={text.mediumSizeH5Family}>TYPE:</Text>
                  <SelectDropdown
                    data={wineType}
                    onSelect={(selectedItem, index) => {
                      setWineCategory(wineDetail, selectedItem.id)
                      if (selectedItem.has_colors == "t") {
                        setHasColor(true)
                      } else {
                        setHasColor(false)
                      }
                    }
                    }
                    buttonTextAfterSelection={(selectedItem, index) => {
                      return selectedItem.name;
                    }}
                    rowTextForSelection={(item, index) => {
                      return item.name
                    }}
                    buttonStyle={[border.greySmallRadius, styles.dropDownStyle]}
                    buttonTextStyle={text.mediumSizeDefaultFamily}
                    dropdownIconPosition='right'
                    renderDropdownIcon={() => {
                      return <AntDesign name="down" size={8} color="black" />
                    }}
                    defaultButtonText='Select Type'
                  />
                </View>
                {hasColor &&
                  <View style={[border.bottomGreyLight, { paddingVertical: 10 }]}>
                    <Text style={text.mediumSizeH5Family}>Color:</Text>
                    <SelectDropdown
                      data={wineColor}
                      onSelect={(selectedItem, index) => {
                        setWineCategoryColor(wineDetail, selectedItem.id)
                      }
                      }
                      buttonTextAfterSelection={(selectedItem, index) => {
                        return selectedItem.name;
                      }}
                      rowTextForSelection={(item, index) => {
                        return item.name
                      }}
                      buttonStyle={[border.greySmallRadius, styles.dropDownStyle]}
                      buttonTextStyle={text.mediumSizeDefaultFamily}
                      dropdownIconPosition='right'
                      renderDropdownIcon={() => {
                        return <AntDesign name="down" size={8} color="black" />
                      }}
                      defaultButtonText='Select Color'
                    />
                  </View>
                }
                <View style={[border.bottomGreyLight, { paddingVertical: 10 }]}>

                  <Text style={text.mediumSizeH5Family}>VINTAGE: </Text>

                  <SelectDropdown
                    data={vintageList}
                    onSelect={(selectedItem, index) => setWineVintage(wineDetail, selectedItem)}
                    buttonTextAfterSelection={(selectedItem, index) => {
                      return selectedItem
                    }}
                    rowTextForSelection={(item, index) => {
                      return item
                    }}
                    buttonStyle={[border.greySmallRadius, styles.dropDownStyle]}
                    buttonTextStyle={text.mediumSizeDefaultFamily}
                    dropdownIconPosition='right'
                    renderDropdownIcon={() => {
                      return <AntDesign name="down" size={8} color="black" />
                    }}
                    defaultButtonText='Select Vintage'
                  />
                </View>
                <View style={[border.bottomGreyLight, { paddingVertical: 10 }]}>

                  <Text style={text.mediumSizeH5Family}>STATE: </Text>

                  <SelectDropdown
                    data={wineStates}
                    defaultValueByIndex={1}
                    onSelect={(selectedItem, index) => setWineState(wineReviewRecord, selectedItem.id)}
                    buttonTextAfterSelection={(selectedItem, index) => {
                      return selectedItem.name
                    }}
                    rowTextForSelection={(item, index) => {
                      return item.name
                    }}
                    buttonStyle={[border.greySmallRadius, styles.dropDownStyle]}
                    buttonTextStyle={text.mediumSizeDefaultFamily}
                    dropdownIconPosition='right'
                    renderDropdownIcon={() => {
                      return <AntDesign name="down" size={8} color="black" />
                    }}
                  />
                </View>
              </View>
              <Text style={[text.titleBaseFamily, { marginHorizontal: 20, marginVertical: 10 }]}>What did you smell?</Text>
              <View style={{ backgroundColor: color.white, paddingHorizontal: 20, marginBottom: 20 }}>
                <Text style={[text.mediumSizeH5Family, { marginTop: 30 }]}>SMELL LIKE:</Text>
                <FTPillsSelector notes={smellPills} nose />
              </View>
              <Text style={[text.titleBaseFamily, { marginHorizontal: 20, marginVertical: 20 }]}>What did you taste?</Text>
              <View style={[general.center, { backgroundColor: color.white, marginBottom: 20 }]}>
                <View style={{ paddingTop: 10, width: '90%' }}>
                  <View style={border.bottomGreyLight}>
                    <View style={{ marginVertical: 20, }}>
                      <Text style={text.mediumSizeH5Family}>SWEETNESS: </Text>
                    </View>
                    <SelectDropdown
                      data={wineSweetnesss}
                      onSelect={(selectedItem, index) => setSweetnessLevel(wineReviewRecord , selectedItem.score)}
                      buttonTextAfterSelection={(selectedItem, index) => {
                        return selectedItem.name
                      }}
                      rowTextForSelection={(item, index) => {
                        return item.name
                      }}
                      buttonStyle={[border.greySmallRadius, styles.dropDownStyle]}
                      buttonTextStyle={text.mediumSizeDefaultFamily}
                      dropdownIconPosition='right'
                      renderDropdownIcon={() => {
                        return <AntDesign name="down" size={8} color="black" />
                      }}
                      defaultButtonText='Select sweetness'
                    />
                  </View>
                  <View style={{ ...border.bottomGreyLight, marginVertical: 10 }}>
                    <Text style={text.mediumSizeH5Family}>ACIDITY</Text>
                    <SwitchButton acidity />
                  </View>
                  <View style={{ ...border.bottomGreyLight, marginVertical: 10 }}>
                    <Text style={text.mediumSizeH5Family}>ALCOHOL</Text>
                    <SwitchButton alcohol />
                  </View>
                  <View style={{ ...border.bottomGreyLight, marginVertical: 10 }}>
                    <Text style={text.mediumSizeH5Family}>TANNIN</Text>
                    <SwitchButton tannin />
                  </View>
                  <View style={{ ...border.bottomGreyLight, marginVertical: 10 }}>
                    <Text style={text.mediumSizeH5Family}>BODY</Text>
                    <SwitchButton body />
                  </View>

                  <View style={{ backgroundColor: color.white, paddingHorizontal: 20, marginBottom: 20 }}>
                    <Text style={[text.mediumSizeH5Family, { marginTop: 30 }]}>TASTE LIKE:</Text>
                    <FTPillsSelector notes={tastePills} mouth />
                  </View>
                </View>
              </View>
              <Text style={[text.titleBaseFamily, { marginHorizontal: 20, marginVertical: 20 }]}>Conclusion</Text>
              <View style={[general.center, { backgroundColor: color.white, marginBottom: 20 }]}>
                <View style={{ paddingTop: 10, width: '90%' }}>
                  <View style={border.bottomGreyLight}>
                    <View style={{ marginVertical: 20, }}>
                      <Text style={text.mediumSizeH5Family}>QUALITY: </Text>
                    </View>
                    <SelectDropdown
                      data={wineQuality}
                      onSelect={(selectedItem, index) => setQualityLevel(wineReviewRecord , selectedItem.score)}
                      buttonTextAfterSelection={(selectedItem, index) => {
                        return selectedItem.name
                      }}
                      rowTextForSelection={(item, index) => {
                        return item.name
                      }}
                      buttonStyle={[border.greySmallRadius, styles.dropDownStyle]}
                      buttonTextStyle={text.mediumSizeDefaultFamily}
                      dropdownIconPosition='right'
                      renderDropdownIcon={() => {
                        return <AntDesign name="down" size={8} color="black" />
                      }}
                      defaultButtonText='Select quality'
                    />
                  </View>
                  <View style={{ marginVertical: 20, }}>
                    <Text style={text.mediumSizeH5Family}>SCORE: </Text>
                  </View>
                  <View style={{ alignSelf: 'center', alignItems: 'center', backgroundColor: color.brandDark, borderRadius: 5 }}>
                    <Text color={color.white} style={{padding: 10}}>{sliderValue}</Text>
                  </View>
                  <Slider
                    style={{ width: '100%', height: 30 }}
                    minimumValue={1}
                    maximumValue={20}
                    minimumTrackTintColor={color.brandDark}
                    maximumTrackTintColor="#C4C4C4"
                    step={1}
                    tapToSeek={true}
                    onValueChange={(value) => { setSliderValue(value) }}
                    onSlidingComplete={(value) => { setScoreLevel(wineReviewRecord , value) }}
                  />
                  <View style={[border.bottomGreyLight, { justifyContent: 'space-between', flexDirection: 'row', width: '95%', alignSelf: 'center', paddingBottom: 20 }]}>
                    <Text>1</Text>
                    <Text>10</Text>
                    <Text>20</Text>
                  </View>
                  <View style={border.bottomGreyLight}>
                    <View style={{ marginVertical: 20, }}>
                      <Text style={text.mediumSizeH5Family}>how does it drink: </Text>
                    </View>
                    <SelectDropdown
                      data={wineDrinkability}
                      onSelect={(selectedItem, index) => setDrinkabilityLevel(wineReviewRecord , selectedItem.score)}
                      buttonTextAfterSelection={(selectedItem, index) => {
                        return selectedItem.name
                      }}
                      rowTextForSelection={(item, index) => {
                        return item.name
                      }}
                      buttonStyle={[border.greySmallRadius, styles.dropDownStyle]}
                      buttonTextStyle={text.mediumSizeDefaultFamily}
                      dropdownIconPosition='right'
                      renderDropdownIcon={() => {
                        return <AntDesign name="down" size={8} color="black" />
                      }}
                      defaultButtonText='How does it drink'
                    />
                  </View>
                  <View style={{ paddingBottom: 110 }}>
                    <View style={{ marginVertical: 20 }}>
                      <Text style={text.mediumSizeH5Family}>PLEASE NOTES: </Text>
                    </View>
                    <View style={[border.greySmallRadius, { height: 124 }]}>
                      <TextInput
                        multiline={true}
                        placeholder='Add your personal notes'
                        style={{ marginHorizontal: 20, textAlignVertical: 'top', marginTop: 15 }}
                        //onChange={onWineNoteFormValueChange.bind(null, 'notes')}
                        onChangeText={onWineNoteFormValueChange.bind(null, 'notes')}
                        numberOfLines={6}
                        value={wineNotesForm['notes']}
                      />
                    </View>
                  </View>
                </View>
              </View>
            </View>
          }
        </> : <>
          {/* TODO: Add loading spinner */}
        </>}
      </KeyboardAwareScrollView>
      <View style={[styles.bottomButton, general.center, { backgroundColor: color.white }]}>
        <View style={{ justifyContent: "space-between", flexDirection: 'row', width: '88%' }}>
          <View style={{ justifyContent: 'center' }}>
            <Text style={text.largeSizeH5Family} color='#A38E67'>{'3/100'}</Text>
            <Text style={text.smallSizeH5Family} color='#A38E67'>points collected</Text>
          </View>
          <Button dark label={'SUBMIT'} onPress={() => endReview()} style={[border.greySmallRadius, { backgroundColor: color.brand }]} ></Button>
        </View>
      </View>
    </View>
  )
}

export const styles = StyleSheet.create({
  imgStyle: {
    borderRadius: 10,
    height: 90,
    width: 75
  },
  eventTextBox: {
    marginLeft: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  flagStyle: {
    marginRight: 3,
    borderRadius: 5,
  },
  viewStyle: {
    flexDirection: 'row',
    marginLeft: 15,
    paddingTop: 10
  },
  vintageStyle: {
    height: 14,
    width: 13,
    marginRight: 3,
  },
  vintageButton: {
    marginVertical: 20,
    borderRadius: 5,
    width: '100%',
    height: 44,
    backgroundColor: color.white,
    borderWidth: 1
  },
  dropDownStyle: {
    backgroundColor: color.white,
    width: '100%',
    marginBottom: 20
  },
  bottomButton: {
    width: '100%',
    height: 70,
    backgroundColor: color.white,
    position: 'absolute',
    bottom: 0,
    shadowColor: color.black,
    shadowOpacity: 1,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  }
})