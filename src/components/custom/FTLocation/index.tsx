import Text from '@fair/components/common/Text';
import * as React from 'react';
import { Platform, StyleSheet } from 'react-native'
import { color } from '@fair/constants/Colors';
import { brandFontFamily, brandFontSize } from '@fair/constants/Fonts';
import { useEffect, useState } from 'react';
import { useApi } from '@fair/hooks/useApi';
interface CardProps {
    id: number
    long?: boolean
    white?: boolean

}
const FTLocation = ({ id, long, white }: CardProps) => {
    const [location, setLocation] = useState()

    useEffect(() => {
        if(id){
            getLocation(id)
        }
    }, [id])

    const getLocation = async (id) => {
        const data = await useApi('customer/locations/' + id)
        setLocation(data.data)
    }
    return (

        <Text style={[styles.dateStyle,(white && styles.white)]}>{location ? <>
            {long ?
                <>{location.street_name}
                    {location.street_number ?
                        <> {location.street_number}, </>
                        : <>, </>}
                </>
                : <></>}
            {location.city}, {location.country}</> : <></>}
        </Text>
    )
}


export default FTLocation

const styles = StyleSheet.create({
    dateStyle: {
        color: color.brand,
    },
    white: {
        color: color.white,
        fontSize: brandFontSize.h3
    }
})