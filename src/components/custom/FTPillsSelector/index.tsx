import Button from '@fair/components/common/Button';
import Text from '@fair/components/common/Text';
import { View } from '@fair/components/Themed';
import { border, general, text } from '@fair/constants/Styles';
import React, { useEffect, useState } from 'react';
import { Pressable } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { color } from '@fair/constants/Colors';
import Input from '@fair/components/common/Input';
import { WineNote } from '@fair/constants/WineDetail';
import { useWineReviewContext } from '@fair/context/WineReviewContextProvider';
import { useWineDetailContext } from '@fair/context/WineDetailContextProvider';

const FTPillsSelector = ({notes, nose, mouth}) => {

  const { wineReviewRecord, wineCountries, setWineState, setReviewWine, setNoseNote, setMouthNote, unsetNoseNote, unsetMouthNote } = useWineReviewContext();
  const { wineDetail, smellPills, tastePills } = useWineDetailContext();
  
  const [unSelectedData, setUnSelectedData] = useState<WineNote[] | null>(null)
  const [selectedData, setSelectedData] = useState([])
  const [addOther, setAddOther] = useState(false)
  const [addFormValue, setAddFormValue] = useState('')

  const selectPills = (id: number) => {
    
    const newSelectedData = selectedData.concat(unSelectedData[id]);
    setSelectedData(newSelectedData);
    const newUnSelectedData = unSelectedData.filter((_: any, index: number) => index != id);
    setUnSelectedData(newUnSelectedData)
    if(nose){
      setNoseNote(wineReviewRecord, unSelectedData[id].id)
    }
    if(mouth){
      setMouthNote(wineReviewRecord, unSelectedData[id].id)
    }
  }

  const unSelectPills = (id: number) => {
    const newUnSelectedData = unSelectedData.concat(selectedData[id]);
    setUnSelectedData(newUnSelectedData);
    const newSelectedData = selectedData.filter((_: any, index: number) => index != id);
    setSelectedData(newSelectedData)
    if(nose){
      unsetNoseNote(wineReviewRecord, selectedData[id].id)
    }
    if(mouth){
      unsetMouthNote(wineReviewRecord, selectedData[id].id)
    }
  }

  const handleChange = (name: string) => {
    setAddFormValue(name)
  }

  const handleSubmit = () => {
    setAddOther(false)
  }
  useEffect(() => {
    setUnSelectedData(notes)
  }, [notes])
  //console.log(selectedData)
  //console.log(wineReviewRecord.wine_review?.mouth)
  //console.log("Unselected", unSelectedData)
  return (
    <View>
      {!(selectedData == null) &&
        <View style={[border.bottomGreyLight, { paddingBottom: 10, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', width: '100%' }]}>
          {selectedData.map((e: WineNote, id: number) => <Pressable key={id} onPress={() => unSelectPills(id)} style={[border.brandLargeRadius, general.center, { backgroundColor: color.brandGray, margin: 10, flexDirection: 'row' }]} >
            <Entypo style={{ marginLeft: 15 }} name="circle-with-cross" size={16} color={color.brandDark} />
            <Text style={[text.mediumSizeH5Family, { marginVertical: 10, marginRight: 15 }]}>{e.name}</Text>
          </Pressable>)}
        </View>
      }
      <View style={[border.bottomGreyLight, { paddingBottom: 10, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', width: '100%' }]}>
        {(unSelectedData !== null && unSelectedData != undefined) &&
          unSelectedData.map((e: WineNote, id: number) => (
            <Pressable key={id} onPress={() => selectPills(id)}
              style={[border.greyLargeRadius, { margin: 10 }]} >
              <Text style={[text.mediumSizeH5Family, { marginVertical: 10, marginHorizontal: 15 }]}>{e.name}</Text></Pressable>)
          )
        }

      </View>
      <View style={{ marginBottom: 40 }}>
        <Pressable onPress={() => setAddOther(true)} style={[general.center, { marginTop: 25 }]}>
          <Text style={text.mediumSizeH5Family} color={color.brandDark}>{'OTHER +'}</Text>
        </Pressable>
        {addOther ?
          <View>
            <Input style={[border.greySmallRadius, { marginVertical: 20, padding: 10 }]} placeholder='Start typing to add' placeholderColor='#91868A' onChange={(e) => handleChange(e)} />
            <Pressable onPress={() => handleSubmit()} style={{ alignSelf: 'center' }}>
              <Text color={color.brandDark} style={text.mediumSizeH5Family}>DONE</Text>
            </Pressable>
          </View> :
          <></>
        }
      </View>
    </View>
  )
}

export default FTPillsSelector