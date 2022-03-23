import { UserAddress } from '@fair/components/interfaces/useraddress'
export interface UserDataProps{
    loading: boolean
    getShippingAddress: () => void
    getBillingAddress: () => void
    storeAddress: (type: string, formValues: any) => void
    userData: any
}