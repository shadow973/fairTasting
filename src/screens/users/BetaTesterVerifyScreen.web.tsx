import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import View from '@fair/components/common/View';
import Text from '@fair/components/common/Text';
import { useNavigation, useRoute } from '@react-navigation/core';
import { useAuthContext } from '@fair/context/AuthContextProvider';
import i18n from 'i18n-js';
import { color } from '@fair/constants/Colors';
import { brandFontFamily, brandFontSize } from '@fair/constants/Fonts';
import FTWebLayout from '@fair/components/custom/FTWebLayout/index.web';
import { BetaTesterInput } from '@fair/constants/User'
import { useApi } from '@fair/hooks/useApi';
import { useMediaQuery } from 'react-responsive'
const logoUri =
    "https://cdn.fairtasting.com/hero-content/ft-hero.png";

export default function BetaTesterVerifyScreen() {
    const isTabletOrMobile = useMediaQuery({ maxWidth: 1224 })
    const { params } = useRoute()
    const [confirmed, setConfirmed] = useState(false)
    const verify = async (verification_code:string) =>{
        const {data} = await useApi('beta/verification/'+verification_code)
        if(data.id>0){
            setConfirmed(true)
        }
    }
    useEffect(() => {
        if(params.verification_code){
        verify(params.verification_code);
        }
    }, [params]);
    return (
        <FTWebLayout>
            <View style={styles.darkContainer}>
                <View>
                    
                    {isTabletOrMobile?<>
                        <View style={styles.sectionHeader}>
                        <Text style={[styles.featuredHeader, styles.gold]}>{i18n.t('beta_test.email_verification')}</Text>
                        {confirmed?<>
                        <Text style={styles.betaText}>{i18n.t('beta_test.email_verification_thanks')}</Text>
                        </>:<>
                        <Text style={styles.betaText}>{i18n.t('beta_test.please_wait')}</Text>
                        </>}
                        
                    </View>
                    </>:<>
                    <View style={styles.sectionHeader}>
                        <Text style={[styles.featuredHeader, styles.gold]}>{i18n.t('beta_test.email_verification')}</Text>
                    </View>
                    <View style={styles.sectionContent}>
                    {confirmed?<>
                        <Text style={styles.betaText}>{i18n.t('beta_test.email_verification_thanks')}</Text>
                        </>:<>
                        <Text style={styles.betaText}>{i18n.t('beta_test.please_wait')}</Text>
                        </>}
                    </View>
                    </>}
                    
                </View>
            </View>
        </FTWebLayout>
    );
}

const styles = StyleSheet.create({
    lightContainer: {
        backgroundColor: color.white,
        paddingHorizontal: 40,
        paddingVertical: 20
    },
    darkContainer: {
        backgroundColor: color.lightGrey,
        paddingHorizontal: 40,
        paddingVertical: 20,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    sectionHeader: {
        alignItems: 'center'
    },
    sectionContent: {
        alignItems: 'center',
        flex: 1
    },
    featuredHeader: {
        color: color.black,
        fontFamily: brandFontFamily.h1,
        fontSize: brandFontSize.h1,
        paddingVertical: 10
    },
    gold: {
        color: color.gold
    },
    betaText: {
        color: color.text,
        fontSize: brandFontSize.h3,
        marginBottom: 40
    },
    background: {

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 20,
        },
        shadowOpacity: 0.15,
        shadowRadius: 50,

        elevation: 5,
        marginBottom: 30,
        borderRadius: 5
    },
    picker: {
        marginLeft: 20,
        borderColor: color.light_gray,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
        borderWidth: 1.25,
        flex: 1,
        color: color.brand,
        height: 40
    },
    pickerMobile: {
        
        borderColor: color.light_gray,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
        borderWidth: 1.25,
        flex: 1,
        color: color.brand,
       
    }

});
