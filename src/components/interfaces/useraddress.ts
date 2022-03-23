export interface UserAddress{
    id: number
    company_name: string
    address_type: string
    address: string
    address2?: string
    postcode: string
    state: string
    country?: string
}