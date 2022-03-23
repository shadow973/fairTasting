import React, { ReactNode, useEffect, useCallback, useContext, useMemo, useState } from 'react'
import { UserDataProps } from '@fair/components/interfaces/userdataprops'
import { UserAddress } from '@fair/components/interfaces/useraddress'
import { useApi } from '@fair/hooks/useApi';
import { useAuthContext } from '@fair/context/AuthContextProvider';
import { catch } from '../../../metro.config';
export const UserDataContext = React.createContext<UserDataProps | undefined>(undefined)

export function useUserDataContext(): UserDataProps {
    const context = useContext(UserDataContext)
    if (!context) {
        throw new Error('No valid cart context. Did you forget to add CartContextProvider?')
    }
    return context
}

const UserDataContextProvider = ({ children }: { children: ReactNode }) => {
    const { user } = useAuthContext()
    const [items, setItems] = useState([])
    const [userData, setUserData] = useState([])

    const getShippingAddress = useCallback(
        async () => {
            try {
                const { data } = await useApi('user/' + user?.id + '/addresses/shipping')
                await setUserData({...userData, shippingAddress: data})
            } catch (error) {
                console.log(`Failed to gt data: ${error.message}`, { error })
                throw error
            }
        },
        []
    )

    const getBillingAddress = useCallback(
        async () => {
            try {
                const { data } = await useApi('user/' + user?.id + '/addresses/billing')
                await setUserData({...userData, billingAddress: data})
            } catch (error) {
                console.log(`Failed to gt data: ${error.message}`, { error })
                throw error
            }
        },
        []
    )

    const storeAddress = useCallback(
        async (type: string, formValues: any) => {
            try {
                if (type == "BILLING") {
                    const { data } = await useApi('user/' + user?.id + '/addresses/billing',{
                        method: 'POST',
                        body: JSON.stringify(formValues)
                      })
                      setUserData({...userData, billingAddress: data})
                } else {
                    const { data } = await useApi('user/' + user?.id + '/addresses/shipping',{
                        method: 'POST',
                        body: JSON.stringify(formValues)
                      })
                      setUserData({...userData, shippingAddress: data})
                }
                
            } catch (error) {
                console.log(`Failed to gt data: ${error.message}`, { error })
                throw error
            }
        },
        []
    )

    const value = useMemo(() => ({
        getShippingAddress,
        getBillingAddress,
        storeAddress,
        userData
    }), [
        getShippingAddress,
        getBillingAddress,
        storeAddress,
        userData
    ])

    return <UserDataContext.Provider value={value}>{children}</UserDataContext.Provider>
}
export default UserDataContextProvider