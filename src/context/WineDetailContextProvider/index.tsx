import React, { ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { useApi } from '@fair/hooks/useApi';
import { WineDetailProps } from '@fair/components/interfaces/winedetail';
import { WineColor, WineDataByName, WineDetailRecord, WineType, WineNote } from '@fair/constants/WineDetail';

export const WineDetailContext = React.createContext<WineDetailProps | null>(null)

export function useWineDetailContext(): WineDetailProps {
  const context = useContext(WineDetailContext)
  if (!context) {
    throw new Error('No valid wine Detail context. Did you forget to add WineDetailContextProvider?')
  }
  return context
}

const WineDetailContextProvider = ({ children }: { children: ReactNode }) => {
  const [wineDetail, setWineDetail] = useState<WineDetailRecord | null>(null)
  const [wineTasteProfile, setWineTasteProfile] = useState<{} | null>(null)
  const [wineDataByName, setWineDataByName] = useState<WineDataByName | null>(null)
  const [wineType, setWineType] = useState<WineType[]>()
  const [wineColor, setWineColor] = useState<WineColor[] | null>(null)
  const [wineStates, setWineStates] = useState<[] | null>(null)
  const [wineSweetnesss, setWineSweetness] = useState<[] | null>(null)
  const [wineQuality, setWineQuality] = useState<[] | null>(null)
  const [wineDrinkability, setWineDrinkability] = useState<[] | null>(null)
  const [vintageList, setVintageList] = useState<string[] | null>(null)
  const [smellPills, setSmellPills] = useState<WineNote[] | null>(null)
  const [tastePills, setTastePills] = useState<WineNote[] | null>(null)
  useEffect(() => {
    getSmellPills()
    getTastePills()
  }, [wineDetail])

  useEffect(() => {
    getWineType()
    getWineColor()
    getWineStates()
    getVintages()
    getWineSweetness()
    getWineQuality()
    getWineDrinkability()
    getSmellPills()
    getTastePills()
  }, [])

  const getWineDetail = async (wine_id: string) => {
    try {
      const {data} = await useApi(`wine/details/${wine_id}`)
      setWineDetail(data)
     // await getWineTasteProfile(wine_id)
    } catch (error) {
      setWineDetail(null)
    }
  }
  const getWineTasteProfile = async (wine_id: string) => {
    try {
      const { data } = await useApi(`wine/${wine_id}/tasteprofile`)
      setWineTasteProfile(data)
    } catch (error) {
      setWineTasteProfile(null)
    }
  }

  const setWineName = async (record: WineDetailRecord, name: string) => {
    try {
      const { data } = await useApi(`wine/${record.wine.wine_id}/name/${name}`)
      await getWineDetail(record.id)
    } catch (error) {

    }
  }
  const setWineCountry = async (record: WineDetailRecord, country_id: string) => {
    try {
      const { data } = await useApi(`wine/${record.wine.wine_id}/country/${country_id || ':country_id'}`)
      await getWineDetail(record.id)
    } catch (error) {

    }
  }
  const setWineCategory = async (record: WineDetailRecord, category_id: string) => {
    try {
      const { data } = await useApi(`wine/${record.wine.wine_id}/category/${category_id || ':category_id'}`)
      await getWineDetail(record.id)
    } catch (error) {

    }
  }
  const setWineCategoryColor = async (record: WineDetailRecord, color_id: string) => {
    try {
      const { data } = await useApi(`wine/${record.wine.wine_id}/color/${color_id || ':color_id'}`)
      await getWineDetail(record.id)
    } catch (error) {

    }
  }
  const setWineVintage = async (record: WineDetailRecord, vintage: string) => {
    try {
      const { data } = await useApi(`wine/${record.wine.wine_id}/vintage/${vintage || ':vintage'}`)
      await getWineDetail(data.id)
    } catch (error) {

    }
  }
  const getVintages = () => {
    let max = new Date().getFullYear()
    let min = max - 9
    let vintages = []
    vintages.push("Non Vintage")

    for (var i = max; i >= min; i--) {
      vintages.push(`${i}`)
    }
    setVintageList(vintages)
  }

  const getSmellPills = async () => {
    try {
      const { data } = await useApi(`review/notes/nose/${wineDetail?.wine.category_id || ':category_id'}/${wineDetail?.wine.region_id || ':region_id'}/${wineDetail?.wine.country_id || ':country_id'}`)
      setSmellPills(data)
    } catch (error) {

    }
  }

  const getTastePills = async () => {
    try {
      const { data } = await useApi(`review/notes/mouth/${wineDetail?.wine.category_id || ':category_id'}/${wineDetail?.wine.region_id || ':region_id'}/${wineDetail?.wine.country_id || ':country_id'}`)
      setTastePills(data)
    } catch (error) {

    }
  }

  const getWineType = async () => {
    const { data } = await useApi(`wine/types`)
    setWineType(data)
  }

  const getWineColor = async () => {
    const { data } = await useApi(`wine/types/color`)
    setWineColor(data)
  }
  const getWineStates = async () => {
    const { data } = await useApi(`review/states`)
    setWineStates(data)
  }
  const getWineSweetness = async () => {
    const { data } = await useApi(`review/sweetness`)
    setWineSweetness(data)
  }
  const getWineQuality = async () => {
    const { data } = await useApi(`review/quality`)
    setWineQuality(data)
  }
  const getWineDrinkability = async () => {
    const { data } = await useApi(`review/drink`)
    setWineDrinkability(data)
  }


  const value: any = useMemo(() => ({
    wineDetail,
    wineDataByName,
    wineType,
    wineColor,
    smellPills,
    tastePills,
    wineStates,
    vintageList,
    wineSweetnesss,
    wineQuality,
    wineDrinkability,
    wineTasteProfile,
    getWineDetail,
    setWineName,
    getSmellPills,
    getTastePills,
    getWineType,
    getWineColor,
    setWineCountry,
    setWineCategory,
    setWineCategoryColor,
    setWineVintage
  }), [
    wineDetail,
    wineDataByName,
    wineType,
    wineColor,
    smellPills,
    tastePills,
    wineStates,
    vintageList,
    wineSweetnesss,
    wineQuality,
    wineDrinkability,
    wineTasteProfile,
    getWineDetail,
    setWineName,
    getSmellPills,
    getTastePills,
    getWineType,
    getWineColor,
    setWineCountry,
    setWineCategory,
    setWineCategoryColor,
    setWineVintage
  ])
  return <WineDetailContext.Provider value={value}>{children}</WineDetailContext.Provider>
}

export default WineDetailContextProvider