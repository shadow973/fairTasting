import { Wine, WineReview, WineReviewRecord, Producer, WineCountry, WineRegion, WineClassification, WineFruitCategory, Fruit, WineFloralCategory, WineHerbNote, WineSecondaryNote, WineTertiaryNote, WineNote } from "@fair/constants/WineReview";

export interface WineReviewProps {
    wineReviewRecord: WineReviewRecord
    currentWine: Wine
    currentProducer: Producer
    wineCountries: WineCountry[]
    wineRegions: WineRegion[]
    wineClassifications: WineClassification[]
    wineFruitCategories: WineFruitCategory[]
    wineFloralCategories: WineFloralCategory[]
    wineHerbNotes: WineHerbNote[]
    wineSecondaryNotes: WineSecondaryNote[]
    wineTertiaryNotes: WineTertiaryNote[]
    wineFinishNotes: WineNote[]
    myReviews: WineReviewRecord[]
    loading: boolean
    startReview: (record: WineReviewRecord) => void
    storeWineImage: (uri: string) => void
    recognizeImage: () => void
    saveWine: (wine: Wine) => void
    saveReview: (review: WineReviewRecord) => void
    addProducer: (producer: Producer) => void
    setProducer: (producer_id: string) => void
    setWine: (wine_id: string) => void
    addRegion: (region: WineRegion) => void
    addClassification: (classification: WineClassification) => void
    noseHasFruitCategory: (id: number) => boolean
    noseHasFloralCategory: (id: number) => boolean
    noseHasHerbalCategory: (id: number) => boolean
    noseHasSecondaryCategory: (id: number) => boolean
    noseHasTertiaryCategory: (id: number) => boolean
    mouthHasFruitCategory: (id: number) => boolean
    mouthHasFloralCategory: (id: number) => boolean
    mouthHasHerbalCategory: (id: number) => boolean
    mouthHasSecondaryCategory: (id: number) => boolean
    mouthHasTertiaryCategory: (id: number) => boolean
    loadMyReviews: () => void
    setWineState: (record: WineReviewRecord, state_id: string) => void
    setReviewWine: (record: WineReviewRecord, wine_id: string) => void
    setNoseNote: (record: WineReviewRecord, note_id: string) => void
    setMouthNote: (record: WineReviewRecord, note_id: string) => void
    unsetNoseNote: (record: WineReviewRecord, note_id: string) => void
    unsetMouthNote: (record: WineReviewRecord, note_id: string) => void
    setTanninLevel: (record: WineReviewRecord, level: number) => void
    setAcidityLevel: (record: WineReviewRecord, level: number) => void
    setAlcoholLevel: (record: WineReviewRecord, level: number) => void
    setBodyLevel: (record: WineReviewRecord, level: number) => void
    setSweetnessLevel: (record: WineReviewRecord, level: number) => void
    setQualityLevel: (record: WineReviewRecord, level: number) => void
    setScoreLevel: (record: WineReviewRecord, level: number) => void
    setDrinkabilityLevel: (record: WineReviewRecord, level: number) => void
    completeReview: (record: WineReviewRecord, notes: string) => void
}