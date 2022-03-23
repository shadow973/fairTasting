import React, { ReactNode, useEffect, useCallback, useContext, useMemo, useState } from 'react'
import { useApi } from '@fair/hooks/useApi';
import { WineReviewRecord, WineImage, WineReview, Wine, Producer, WineCountry, WineRegion, WineClassification, WineFruitCategory, Fruit, Floral, WineFloralCategory, WineHerbNote, WineSecondaryNote, WineTertiaryNote, WineNote } from '@fair/constants/WineReview';
import SecureStore from '@fair/components/common/SecureStore';
import { WineReviewProps } from '@fair/components/interfaces/winereview';
import FTENV from '@fair/ftenv';
import { useAuthContext } from '../AuthContextProvider';
import { UserDataContext } from '../UserDataContextProvider';


export const WineReviewContext = React.createContext<WineReviewProps | undefined>(undefined)

export function useWineReviewContext(): WineReviewProps {
    const context = useContext(WineReviewContext)
    if (!context) {
        throw new Error('No valid wine review context. Did you forget to add WineReviewContextProvider?')
    }
    return context
}

const WineReviewContextProvider = ({ children }: { children: ReactNode }) => {
    const { user } = useAuthContext()
    const [wineReviewRecord, setWineReviewRecord] = useState<WineReviewRecord | undefined>()
    const [reload, setReload] = useState(false)
    const [loading, setLoading] = useState(false)
    const [wineImage, setWineImage] = useState<WineImage | undefined>()
    const [currentWine, setCurrentWine] = useState<Wine | undefined>()
    const [currentProducer, setCurrentProducer] = useState<Producer | undefined>()
    const [wineCountries, setWineCountries] = useState<WineCountry[] | undefined>()
    const [wineRegions, setWineRegions] = useState<WineRegion[] | undefined>()
    const [wineClassifications, setWineClassifications] = useState<WineClassification[] | undefined>()
    const [wineFruitCategories, setWineFruitCategories] = useState<WineFruitCategory[] | undefined>()
    const [wineFloralCategories, setWineFloralCategories] = useState<WineFloralCategory[] | undefined>()
    const [wineHerbNotes, setWineHerbNotes] = useState<WineHerbNote[] | undefined>()
    const [wineSecondaryNotes, setWineSecondaryNotes] = useState<WineSecondaryNote[] | undefined>()
    const [wineTertiaryNotes, setWineTertiaryNotes] = useState<WineTertiaryNote[] | undefined>()
    const [wineFinishNotes, setWineFinishyNotes] = useState<WineNote[] | undefined>()
    const [myReviews, setMyReviews] = useState<WineReviewRecord[] | undefined>()

    useEffect(() => {
        restoreReview()
    }, [])
    const restoreReview = async () => {
        setLoading(true)
        const review = await getCachedReview();
        await loadCountries()
        await loadMyReviews()
        if (review) {
            setWineReviewRecord(review)   
        }
        setLoading(false)

    }

    const storeWineImage = async (uri: string) => {
        await setWineImage(d => ({ ...d, uri: uri }))
    }
    const recognizeImage = async () => {
        const {data} = await useApi('wine/review/image', {
            method: 'POST',
            body: JSON.stringify(wineImage)
        })
        if (data) {
            let image_id = ""
            let image_path = ""
            for (let i = 0; i < data.images.length; i++) {
                if (user?.id == data.images[i].user_id) {
                    image_id = data.images[i].id
                    image_path = data.images[i].image_path
                }
            }
            if (image_id == "") {
                image_id = data.images[0].id
                image_path = data.images[0].image_path
            }
            await startReview({ image_id: image_id, image_path: image_path, wine_id: data.id })
        }

    }
    const startReview = async (record: WineReviewRecord) => {
        try {
            await clearReview()
            const {data} = await useApi('wine/review/create', {
                method: 'POST',
                body: JSON.stringify(record)
            })
            await cacheReview(data)
            await restoreReview()
        } catch (error) {

        }
    }
    const setWineState = async (record: WineReviewRecord, state_id: string) => {
        try {
          const {data} = await useApi(`review/${record.id}/state/${state_id || ':state_id'}`)
          await cacheReview(data)
          await restoreReview()
        } catch(error) {
          
        }
      }
      const setReviewWine = async (record: WineReviewRecord, wine_id: string) => {
        try {
          const {data} = await useApi(`review/${record.id}/wine/${wine_id || ':wine_id'}`)
          await cacheReview(data)
          await setWineReviewRecord(data)   
        } catch(error) {
          
        }
      }
      const setNoseNote = async (record: WineReviewRecord, note_id: string) => {
        try {
          const {data} = await useApi(`review/${record.id}/nose/${note_id || ':note_id'}`)
          await cacheReview(data)
          await restoreReview()
        } catch(error) {
          
        }
      }
      const setMouthNote = async (record: WineReviewRecord, note_id: string) => {
        try {
          const {data} = await useApi(`review/${record.id}/mouth/${note_id || ':note_id'}`)
          await cacheReview(data)
          await restoreReview()
        } catch(error) {
          
        }
      }
      const unsetNoseNote = async (record: WineReviewRecord, note_id: string) => {
        try {
          const {data} = await useApi(`review/${record.id}/noseunset/${note_id || ':note_id'}`)
          await cacheReview(data)
          await restoreReview()
        } catch(error) {
          
        }
      }
      const unsetMouthNote = async (record: WineReviewRecord, note_id: string) => {
        try {
          const {data} = await useApi(`review/${record.id}/mouthunset/${note_id || ':note_id'}`)
          await cacheReview(data)
          await restoreReview()
        } catch(error) {
          
        }
      }
      const setSweetnessLevel = async (record: WineReviewRecord, level: number) => {
        try {
          const {data} = await useApi(`review/${record.id}/sweetness/${level || ':level'}`)
        
          await cacheReview(data)
          await restoreReview()
        } catch(error) {
          
        }
      }
      const setTanninLevel = async (record: WineReviewRecord, level: number) => {
        try {
          const {data} = await useApi(`review/${record.id}/tannin/${level || ':level'}`)
        
          await cacheReview(data)
          await restoreReview()
        } catch(error) {
          
        }
      }
      const setAcidityLevel = async (record: WineReviewRecord, level: number) => {
        try {
          const {data} = await useApi(`review/${record.id}/acidity/${level || ':level'}`)
     
          await cacheReview(data)
          await restoreReview()
        } catch(error) {
            
        }
      }
      const setAlcoholLevel = async (record: WineReviewRecord, level: number) => {
        try {
          const {data} = await useApi(`review/${record.id}/alcohol/${level || ':level'}`)
          await cacheReview(data)
          await restoreReview()
        } catch(error) {
          
        }
      }
      const setBodyLevel = async (record: WineReviewRecord, level: number) => {
        try {

          const {data} = await useApi(`review/${record.id}/body/${level || ':level'}`)
          await cacheReview(data)
          await restoreReview()
        } catch(error) {
          
        }
      }
      const setQualityLevel = async (record: WineReviewRecord, level: number) => {
        try {
          const {data} = await useApi(`review/${record.id}/quality/${level || ':level'}`)
        
          await cacheReview(data)
          await restoreReview()
        } catch(error) {
          
        }
      }
      const setScoreLevel = async (record: WineReviewRecord, level: number) => {
        try {
          const {data} = await useApi(`review/${record.id}/score/${level || ':level'}`)
        
          await cacheReview(data)
          await restoreReview()
        } catch(error) {
          
        }
      }
      const setDrinkabilityLevel = async (record: WineReviewRecord, level: number) => {
        try {
          const {data} = await useApi(`review/${record.id}/drink/${level || ':level'}`)
        
          await cacheReview(data)
          await restoreReview()
        } catch(error) {
          
        }
      }
      const completeReview = async (record: WineReviewRecord, wine_note: string) => {
        try {
            let body = { notes: wine_note, review_id: record.id }
            const  data  = await useApi('review/complete', {
                method: 'POST',
                body: JSON.stringify(body)
            })
           await cacheReview(data)
        } catch (error) {

        }
    }
    const saveReview = async (record: WineReviewRecord) => {
        try {
            const { data } = await useApi('wine/review/update', {
                method: 'POST',
                body: JSON.stringify({ ...wineReviewRecord, ...record })
            })
            await cacheReview(data)
        } catch (error) {

        }
    }
    const saveWine = async (wine: Wine) => {
        try {
            const { data } = await useApi('wine/save', {
                method: 'POST',
                body: JSON.stringify({ ...currentWine, ...wine })
            })
            await cacheWine(data)
            await setWine(data.id)
        } catch (error) {
            console.log(error)
        }

    }
    const loadMyReviews = async () => {
        try {
            const { data } = await useApi('my/wine/reviews')
            setMyReviews(data)
        } catch (error) {

        }
    }
    const loadCountries = async () => {
        try {
            const { data } = await useApi('wine/countries')
            setWineCountries(data)
        } catch (error) {

        }
    }
    const loadProducer = async (id: string) => {
        try {
            const { data } = await useApi('wine/producer/get/' + id)
            setCurrentProducer(data)
        } catch (error) {

        }
    }
    const loadWineRegions = async (id: string) => {
        try {
            const { data } = await useApi('settings/wine/regions/' + id)
            setWineRegions(data)
        } catch (error) {

        }
    }
    const loadWineClassification = async (country_id: string, region_id: string) => {
        try {
            const { data } = await useApi('settings/wine/classifications/' + country_id + '/' + region_id)
            setWineClassifications(data)
        } catch (error) {

        }
    }
    

    const setProducer = async (producer_id: string) => {
        await saveWine({ producer: producer_id })
    }
    const setRegion = async (region: string) => {
        await saveWine({ region: region })
    }
    const setClassification = async (classification: string) => {
        await saveWine({ classification: classification })
    }
    const setWine = async (wine_id: string) => {
        await saveReview({ wine_id: wine_id })
    }
    const addProducer = async (producer: Producer) => {
        try {
            const { data } = await useApi('wine/producer/save', {
                method: 'POST',
                body: JSON.stringify(producer)
            })
            await setProducer(data.id)
            await loadProducer(data.id)
        } catch (error) {
            console.log(error)
        }
    }
    const addRegion = async (region: WineRegion) => {
        try {
            const { data } = await useApi('settings/wine/region', {
                method: 'POST',
                body: JSON.stringify(region)
            })
            await setRegion(data.id)
            await loadWineRegions(data.country_id)
        } catch (error) {
            console.log(error)
        }
    }
    const addClassification = async (classification: WineClassification) => {
        try {
            const { data } = await useApi('settings/wine/classification', {
                method: 'POST',
                body: JSON.stringify(classification)
            })
            await setClassification(data.id)
            await loadWineClassification(data.country_id, data.region_id)
        } catch (error) {
            console.log(error)
        }
    }


    const cacheReview = async (record: WineReviewRecord) => {
       
        try{
        await SecureStore.set(FTENV().envName + '-review', JSON.stringify(record));
        }catch(e){
            console.log(e)
        }
        setWineReviewRecord(record)
    };

    const getCachedReview = async () => {
        try{
        const record = await SecureStore.get(FTENV().envName + '-review')
        return record ? JSON.parse(record) : false
    }catch(e){
        console.log("get")
    }
    };
    const cacheWine = async (wine: Wine) => {
        try{
        await SecureStore.set(FTENV().envName + '-wine', JSON.stringify(wine));
        setCurrentWine(wine)
    }catch(e){
        console.log("cachewine")
    }
    };
    const getCachedWine = async () => {
        try{
        const record = await SecureStore.get(FTENV().envName + '-wine')
        return record ? JSON.parse(record) : false
    }catch(e){
        console.log("get cache")
    }
    };

    const clearReview = async () => {
        try{
        await SecureStore.delete(FTENV().envName + '-review');
        await SecureStore.delete(FTENV().envName + '-wine');
    }catch(e){
        console.log("clear")
    }
        
    }



    const value = useMemo(() => ({
        wineReviewRecord,
        currentWine,
        currentProducer,
        wineCountries,
        wineRegions,
        wineClassifications,
        wineFruitCategories,
        wineFloralCategories,
        wineHerbNotes,
        wineSecondaryNotes,
        wineTertiaryNotes,
        wineFinishNotes,
        myReviews,
        loading,
        startReview,
        storeWineImage,
        recognizeImage,
        saveWine,
        addProducer,
        setProducer,
        setWine,
        addRegion,
        addClassification,
        saveReview,
        loadMyReviews,
        setWineState,
        setReviewWine,
        setNoseNote,
        setMouthNote,
        unsetNoseNote,
        unsetMouthNote,
        setTanninLevel,
        setAcidityLevel,
        setAlcoholLevel,
        setBodyLevel,
        setSweetnessLevel,
        setQualityLevel,
        setScoreLevel,
        setDrinkabilityLevel,
        completeReview

    }), [
        wineReviewRecord,
        currentWine,
        currentProducer,
        wineCountries,
        wineRegions,
        wineClassifications,
        wineFruitCategories,
        wineFloralCategories,
        wineHerbNotes,
        wineSecondaryNotes,
        wineTertiaryNotes,
        wineFinishNotes,
        myReviews,
        loading,
        startReview,
        storeWineImage,
        recognizeImage,
        saveWine,
        addProducer,
        setProducer,
        setWine,
        addRegion,
        addClassification,
        saveReview,
        loadMyReviews,
        setWineState,
        setReviewWine,
        setNoseNote,
        setMouthNote,
        unsetNoseNote,
        unsetMouthNote,
        setTanninLevel,
        setAcidityLevel,
        setAlcoholLevel,
        setBodyLevel,
        setSweetnessLevel,
        setQualityLevel,
        setScoreLevel,
        setDrinkabilityLevel,
        completeReview

    ])

    return <WineReviewContext.Provider value={value}>{children}</WineReviewContext.Provider>
}
export default WineReviewContextProvider