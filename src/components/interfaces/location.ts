import { LocationObject } from "expo-location";
import * as Location from 'expo-location';

export interface LocationProps{
    permissionStatus: Location.PermissionStatus
    currentLocation: LocationObject
    launchLocationSettings: () => void
    refreshLocation: () => void
}