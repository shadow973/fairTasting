export interface WineReviewRecord {
    id?: string,
    user_id?: string,
    location_id?: string,
    wine_id: string,
    producer_name?: string,
    country_code?: string,
    country_name?: string,
    wine_name: string,
    vintage?: number,
    ft_score?: number,
    score?: number,
    non_vintage?: boolean,
    image_id?: string,
    image_path?: string,
    wine_review?: WineReview
    created_at?: Date
}
export interface WineReview {
    appearance: Appearance,
    nose: Nose,
    mouth: Mouth,
    conclusion: Conclusion
}
export interface WineImage {
    id?: string
    uri?: string,
    user_id?: string,
    customer_id?: string,
    image_path?: string
}
export interface Wine {
    id?: string
    name?: string,
    producer?: string,
    region?: string,
    country?: string,
    classification?: string,
    metadata?: WineMetadata,
    reviewed?: boolean,
    provided_by?: string
}
export interface WineCountry {
    id?: string
    country?: string,
    country_name?: string,
}
export interface Producer {
    id?: string,
    name?: string,
    reviewed?: boolean
}
export interface WineRegion {
    id?: string,
    country_id?: string,
    parent_id?: string,
    region?: string,
    reviewed?: boolean,
    provided_by?: string,
}
export interface WineClassification {
    id?: string,
    country_id?: string,
    region_id?: string,
    short_name?: string,
    name?: string,
    reviewed?: boolean,
    provided_by?: string
}
export interface WineMetadata{
    composition: WineComposition[]
}

interface WineComposition{
    grape_id: string,
    name: string,
    percentage: number
}
export interface Appearance {
    type?: number
    bubble_size?: number
    bubble_intensity?: number
    intensity?: number
    color?: number
    color_shade?: number
    viscosity?: number
    clarity?: number

}
interface Mouth {
    sweetness: number
    acidity: number
    tannin: number
    body: number
    alcohol: number
    fruit: Fruit[]
    floral?: number[]
    herbs: number[]
    tertiary: number[]
    secondary: number[]
    finish: number
    length: number
    complexity: number
    layers: number
}
interface Nose {
    intensity: number
    fruit: Fruit[]
    floral?: number[]
    herbs?: number[]
    tertiary: number[]
    secondary: number[]
}
interface Conclusion {
    quality?: number
    score?: number
    notes?: string

}
 interface Fruit {
    category: number
    note?: number[]
}
 interface Floral {
    note: number[]
}
 interface Herbs {
    note: number[]
}
export interface WineFruitCategory{
    category_id: number
    image_path: string
    name: string
}
export interface WineFloralCategory{
    category_id: number
    language: string
    name: string
}
export interface WineHerbNote{
    id: number
    language: string
    name: string
}
export interface WineSecondaryNote{
    id: number
    language: string
    name: string
}
export interface WineTertiaryNote{
    id: number
    language: string
    name: string
}
export interface WineNote{
    id: number
    language: string
    name: string
}