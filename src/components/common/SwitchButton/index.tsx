import { color } from '@fair/constants/Colors';
import { border, general, text } from '@fair/constants/Styles';
import { useWineReviewContext } from '@fair/context/WineReviewContextProvider';
import React, { useEffect, useState } from 'react';
import { Pressable } from 'react-native';
import Text from '../Text';
import View from '../View';
import i18n from 'i18n-js';

interface SwitchButtonProps {
  body?: boolean
  tannin?: boolean
  acidity?: boolean
  alcohol?: boolean
}
const SwitchButton = ({ body, tannin, acidity, alcohol }: SwitchButtonProps) => {
  const { wineReviewRecord, setTanninLevel, setAcidityLevel, setAlcoholLevel, setBodyLevel } = useWineReviewContext();
  const [level, setLevel] = useState(0)
  const selectLevel = (level: number) => {
    if (level > 0) {
      if (tannin) {
        setTanninLevel(wineReviewRecord, level)
      }
      if (acidity) {
        setAcidityLevel(wineReviewRecord, level)
      }
      if (alcohol) {
        setAlcoholLevel(wineReviewRecord, level)
      }
      if (body) {
        setBodyLevel(wineReviewRecord, level)
      }
    }
  }
  useEffect(() => {
    if(wineReviewRecord !== undefined){
    if (tannin) {
      setLevel(wineReviewRecord.wine_review?.mouth.tannin)
    }
    if (acidity) {
      setLevel(wineReviewRecord.wine_review?.mouth.acidity)
    }
    if (alcohol) {
      setLevel(wineReviewRecord.wine_review?.mouth.alcohol)
    }
    if (body) {
      setLevel(wineReviewRecord.wine_review?.mouth.body)
    }
  }
  }, [wineReviewRecord])
  return (
    <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 20 }}>
      {body ? <>
        <Pressable onPress={() => { selectLevel(1) }} style={[(level == 1 ? border.brandLeftSmallRadius : border.greyLeftSmallRadius), general.center, { backgroundColor: (level !== 1 ? color.white : color.brandGray), width: '33%' }]}>
          <Text color={(level == 1 ? '#71142D' : color.grey)} style={[text.mediumSizeDefaultFamily, { marginVertical: 12 }]}>{i18n.t('review.levels.light')}</Text>
        </Pressable>
        <Pressable onPress={() => { selectLevel(2) }} style={[(level == 2 ? border.brandNonRadius : border.greyNonRadius), general.center, { backgroundColor: (level !== 2 ? color.white : color.brandGray), width: '33%' }]}>
          <Text selectionColor={(level == 2 ? '#71142D' : color.grey)} style={[text.mediumSizeDefaultFamily, { marginVertical: 12 }]}>{i18n.t('review.levels.medium')}</Text>
        </Pressable>
        <Pressable onPress={() => { selectLevel(3) }} style={[(level == 3 ? border.brandRightSmallRadius : border.greyRightSmallRadius), general.center, { backgroundColor: (level !== 3 ? color.white : color.brandGray), width: '33%' }]}>
          <Text selectionColor={(level == 3 ? '#71142D' : color.grey)} style={[text.mediumSizeDefaultFamily, { marginVertical: 12 }]}>{i18n.t('review.levels.full')}</Text>
        </Pressable>
      </> : <>
        <Pressable onPress={() => { selectLevel(1) }} style={[(level == 1 ? border.brandLeftSmallRadius : border.greyLeftSmallRadius), general.center, { backgroundColor: (level !== 1 ? color.white : color.brandGray), width: '33%' }]}>
          <Text color={(level == 1 ? '#71142D' : color.grey)} style={[text.mediumSizeDefaultFamily, { marginVertical: 12 }]}>{i18n.t('review.levels.low')}</Text>
        </Pressable>
        <Pressable onPress={() => { selectLevel(2) }} style={[(level == 2 ? border.brandNonRadius : border.greyNonRadius), general.center, { backgroundColor: (level !== 2 ? color.white : color.brandGray), width: '33%' }]}>
          <Text selectionColor={(level == 2 ? '#71142D' : color.grey)} style={[text.mediumSizeDefaultFamily, { marginVertical: 12 }]}>{i18n.t('review.levels.medium')}</Text>
        </Pressable>
        <Pressable onPress={() => { selectLevel(3) }} style={[(level == 3 ? border.brandRightSmallRadius : border.greyRightSmallRadius), general.center, { backgroundColor: (level !== 3 ? color.white : color.brandGray), width: '33%' }]}>
          <Text selectionColor={(level == 3 ? '#71142D' : color.grey)} style={[text.mediumSizeDefaultFamily, { marginVertical: 12 }]}>{i18n.t('review.levels.high')}</Text>
        </Pressable>
      </>}
    </View>
  )
}

export default SwitchButton