import { WineMetadata, WineReviewRecord } from './WineReview';
export interface WineDetailRecord {
  id: string
  wine: Wine
  vintage: number
  metadata: WineMetadata
  non_vintage: boolean
  score: number
  images: Image[]
  taste_profile: any
  review: WineReviewRecord[]
}

export interface WineDataByName {
  id: string
  name: string
  producer: string
  region: string
  country: string
  classification: string
  created_at: Date
  reviewed: boolean
  provided_by: string
  category_id: string
  category_color: string
  is_organic: boolean
  is_biodynamic: boolean
  is_vegan: boolean
  is_glutenfree: boolean
  is_lactosefree: boolean
  is_kosher: boolean
  is_nature: boolean
  vintages: Vintage[]
}

export interface WineType {
  data: WineTypeData[]
}

export interface WineColor {
  data: WineColorType[]
}

export interface WineColorType {
  id: string
  name: string
}

export interface WineTypeData {
  id: string
  name: string
  has_colors: string
}

export interface Wine {
  wine_id: string
  name?: string
  producer_name?: string
  producer_id?: string
  region_name?: string
  region_id?: string
  country_code?: string
  country_id?: string
  classification_name?: string
  classification_id?: string
  created_at?: Date
  reviewed?: boolean
  category_id?: string
  is_organic: boolean
  is_biodynamic: boolean
  is_vegan: boolean
  is_glutenfree: boolean
  is_lactosefree: boolean
  is_kosher: boolean
  vintages?: Vintage[]
}

export interface Vintage {
  id: string
  wine_id: string
  vintage?: number
  non_vintage?: boolean
  metadata?: WineMetadata
  reviewed?: boolean
  provided_by?: string
}

export interface Image {
  id: string
  wine_id: string
  user_id: string
  customer_id: string
  image_path: string
  created_at: Date
  reviewed: boolean
}
export interface WineNote{
  id: string
  is_floral: boolean
  is_fruit: boolean
  is_herb: boolean
  is_secondary: boolean
  is_tertiary: boolean
  name: string
}
