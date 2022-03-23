import { Wine, WineDetailRecord, WineDataByName, WineType, WineColor } from "@fair/constants/WineDetail";
import { WineNote } from "@fair/constants/WineReview";

export interface WineDetailProps {
    wineDetail: WineDetailRecord
    wineDataByName: WineDataByName
    wineType: WineType
    wineColor: WineColor
    smellPills: WineNote[]
    tastePills: WineNote[]
    wineStates: []
    wineSweetnesss: []
    wineQuality: []
    wineDrinkability: []
    vintageList: string[]
    wineTasteProfile: {}
    getWineDetail: (id: string) => void
    setWineName: (wine: WineDetailRecord, name: string) => void
    getWineType: () => void
    getWineColor: () => void
    getSmellPills: () => void
    getTastePills: () => void
    setWineCountry: (wine: WineDetailRecord, country_id: string) => void
    setWineCategory: (wine: WineDetailRecord, category_id: string) => void
    setWineCategoryColor: (wine: WineDetailRecord, color_id: string) => void
    setWineVintage: (wine: WineDetailRecord, vintage: string) => void
    setReviewWine:  (wine: WineDetailRecord, wine_id: string) => void
}