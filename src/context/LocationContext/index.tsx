import React, { ReactNode, useEffect, useCallback, useContext, useMemo, useState } from 'react'
import { LocationProps } from '@fair/components/interfaces/location';
import * as Location from 'expo-location';
import * as IntentLauncher from 'expo-intent-launcher';
import { useAuthContext } from '@fair/context/AuthContextProvider';
import { LocationObject } from 'expo-location';
import SecureStore from '@fair/components/common/SecureStore';
import FTENV from '@fair/ftenv'
import { useRef } from 'react';

export const LocationContext = React.createContext<LocationProps | undefined>(undefined)

export function useLocationContext(): LocationProps {
    const context = useContext(LocationContext)
    if (!context) {
        throw new Error('No valid location context. Did you forget to add LocationContextProvider?')
    }
    return context
}

const LocationContextProvider = ({ children }: { children: ReactNode }) => {
    const unmounted = useRef(false);
    const {loading} = useAuthContext();
    const [currentLocation, setCurrentLocation] = useState<LocationObject>()
    const [permissionStatus, setPermissionStatus] = useState<Location.PermissionStatus>()

    const restoreSession = async () => {
        await getPermission()
        let loc = await getLastKnownLocation()
        if (loc) {
            await setCurrentLocation(loc)
            if (await shouldRefresh()) {
                await getLocation();
            }
        } else {
            await getLocation();
        }
    }
    useEffect(() => {
        if(!loading){
        restoreSession()
        }
        return () => { unmounted.current = true }
    }, [loading])

    const refreshLocation = async () => {
        await getLocation();
    }
    const getPermission = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        setPermissionStatus(status)
    }
    const getLocation = async () => {
        let location = await Location.getCurrentPositionAsync({ accuracy: 4 });
        if(!unmounted.current){
        await setCurrentLocation(location);
        await setLastKnownLocation(location);
        await setLastRefresh();
        }
    }
    const shouldRefresh = async (): Promise<Boolean> => {
        const lastRefresh = await getLastRefresh()
        const difference = ((Date.now() - Number(lastRefresh)) / 1000) / 60
        if (difference > 5) {
            return true
        }
        return false
    }
    const launchLocationSettings = async () => {
        IntentLauncher.startActivityAsync(IntentLauncher.ACTION_LOCATION_SOURCE_SETTINGS);
    }
    const setLastRefresh = async () => await SecureStore.set(FTENV().envName + '-locationrefresh', String(Date.now()));
    const getLastRefresh = async () => await SecureStore.get(FTENV().envName + '-locationrefresh');
    const setLastKnownLocation = async (location: LocationObject) => await SecureStore.set(FTENV().envName + '-location', JSON.stringify(location));
    const getLastKnownLocation = async () => {
        const location = await SecureStore.get(FTENV().envName + '-location');
        return location ? JSON.parse(location) : false
    };

    const value = useMemo(() => ({
        launchLocationSettings,
        refreshLocation,
        currentLocation,
        permissionStatus

    }), [
        launchLocationSettings,
        refreshLocation,
        currentLocation,
        permissionStatus
    ])

    return <LocationContext.Provider value={value}>{children}</LocationContext.Provider>
}
export default LocationContextProvider