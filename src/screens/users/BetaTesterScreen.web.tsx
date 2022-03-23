import React, { useEffect, useRef, useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, StyleSheet, ScrollView } from 'react-native';
import Button from '@fair/components/common/Button';
import View from '@fair/components/common/View';
import Text from '@fair/components/common/Text';
import { useNavigation, useRoute } from '@react-navigation/core';
import { useAuthContext } from '@fair/context/AuthContextProvider';
import i18n from 'i18n-js';
import { color } from '@fair/constants/Colors';
import { brandFontFamily, brandFontSize } from '@fair/constants/Fonts';
import FTWebLayout from '@fair/components/custom/FTWebLayout/index.web';
import Input from '@fair/components/common/Input';
import { BetaTesterInput } from '@fair/constants/User'
import { Picker } from '@react-native-picker/picker';
import Autocomplete from "react-google-autocomplete";
import { GoogleAddressParser } from '@fair/components/custom/GoogleAddressParser';
import { useApi } from '@fair/hooks/useApi';
import { useMediaQuery } from 'react-responsive'
const logoUri =
    "https://cdn.fairtasting.com/hero-content/ft-hero.png";

export default function BetaTesterScreen() {
    const isTabletOrMobile = useMediaQuery({ maxWidth: 1224 })
    const { params } = useRoute()
    const { navigate } = useNavigation()
    const video = useRef(null);
    const { isTokenValid, handleAppleSignIn } = useAuthContext()
    const [confirmed, setConfirmed] = useState(false)
    const [formValues, setFormvalues] = useState<BetaTesterInput>({})
    const onFormValueChange = (field: any, value: any) => {
        setFormvalues(d => ({ ...d, [field]: value }))
    }
    const handleSubmit = async () =>{
        // const {data} = await useApi('beta/application',{
        //     method: 'POST',
        //   body: JSON.stringify(formValues)
        // })
        // if(data.id>0){
        //     setConfirmed(true)
        // }
    }
    useEffect(() => {
        setFormvalues(d => ({ ...d, locale: i18n.locale.substr(0,2) }))
    }, [params]);
    return (
        <FTWebLayout>
            <View style={styles.darkContainer}>
                <View>
                    {!confirmed?<>
                    {isTabletOrMobile?<>
                        <View style={styles.sectionHeader}>
                        <Text style={[styles.featuredHeader, styles.gold]}>{i18n.t('beta_test.header')}</Text>
                        <View style={styles.sectionContent}>
                        <Text style={styles.betaText}>{i18n.t('beta_test.teaser')}</Text>
                        {/* <Text style={styles.betaText}>{i18n.t('beta_test.instruction')}</Text> */}
                        </View>
                        {/* <View style={styles.background}>
                            <View style={{ backgroundColor: color.white, paddingHorizontal: 30, paddingVertical: 30, borderRadius: 15 }}>
                                <View>
                                    <Input value={formValues['firstname']} placeholder={i18n.t('form_first_name')} onChange={onFormValueChange.bind(null, 'firstname')} web />
                                    <Input value={formValues['lastname']} placeholder={i18n.t('form_last_name')} onChange={onFormValueChange.bind(null, 'lastname')} web />
                                    <Input value={formValues['email']} placeholder={i18n.t('email')} onChange={onFormValueChange.bind(null, 'email')} web />
                                    <Picker
                                        style={styles.pickerMobile}
                                        selectedValue={formValues['device']}
                                        onValueChange={(itemValue, itemIndex) =>
                                            setFormvalues(d => ({ ...d, device: itemValue }))
                                        }>
                                        <Picker.Item label={i18n.t('please_select_phone')} value="" />
                                        <Picker.Item label="Android" value="Android" />
                                        <Picker.Item label="iPhone" value="iPhone" />

                                    </Picker>
                                    <Autocomplete
                            apiKey={'AIzaSyA2wJOlG2yHLJuzM3I1MLtoYJuKVautrgs'}
                            color={color.brand}
                            placeholder={i18n.t('enter_city')}
                            style={{ height: '20px', borderColor: '#F0F0F0', borderRadius: '10px', paddingTop: '10px', paddingBottom: '10px', paddingLeft: '20px', paddingRight: '20px', fontSize: '16', borderWidth: '1.25px', color: '#4C0013' }}
                            onPlaceSelected={(place) => {
                                const address = new GoogleAddressParser(place?.address_components).result();
                                setFormvalues(d => ({ ...d, country:address.country, city: address.city }))
                            }}
                            // options={{
                            //     types: ["cities"],
                            // }}
                        />
                                </View>
                                <View>
                                    <Button label={i18n.t('beta_test.button')} onPress={()=>handleSubmit()} dark />
                                </View>
                            </View>
                        </View> */}
                    </View>
                    </>:<>
                    <View style={styles.sectionHeader}>
                        <Text style={[styles.featuredHeader, styles.gold]}>{i18n.t('beta_test.header')}</Text>
                    </View>
                    <View style={styles.sectionContent}>
                        <Text style={styles.betaText}>{i18n.t('beta_test.teaser')}</Text>
                        {/* <Text style={styles.betaText}>{i18n.t('beta_test.instruction')}</Text>
                        <View style={styles.background}>
                            <View style={{ backgroundColor: color.white, paddingHorizontal: 30, paddingVertical: 30, borderRadius: 15 }}>
                                <View row>
                                    <Input value={formValues['firstname']} placeholder={i18n.t('form_first_name')} onChange={onFormValueChange.bind(null, 'firstname')} web />
                                    <Input value={formValues['lastname']} placeholder={i18n.t('form_last_name')} onChange={onFormValueChange.bind(null, 'lastname')} web left />
                                    <Input value={formValues['email']} placeholder={i18n.t('email')} onChange={onFormValueChange.bind(null, 'email')} web left />
                                    <Picker
                                        style={styles.picker}
                                        selectedValue={formValues['device']}
                                        onValueChange={(itemValue, itemIndex) =>
                                            setFormvalues(d => ({ ...d, device: itemValue }))
                                        }>
                                        <Picker.Item label={i18n.t('please_select_phone')} value="" />
                                        <Picker.Item label="Android" value="Android" />
                                        <Picker.Item label="iPhone" value="iPhone" />

                                    </Picker>
                                    <Autocomplete
                            apiKey={'AIzaSyA2wJOlG2yHLJuzM3I1MLtoYJuKVautrgs'}
                            color={color.brand}
                            placeholder={i18n.t('enter_city')}
                            style={{ height: '20px', borderColor: '#F0F0F0', borderRadius: '10px', paddingTop: '10px', paddingBottom: '10px', marginLeft: '20px', paddingLeft: '20px', paddingRight: '20px', fontSize: '16', borderWidth: '1.25px', color: '#4C0013' }}
                            onPlaceSelected={(place) => {
                                const address = new GoogleAddressParser(place?.address_components).result();
                                setFormvalues(d => ({ ...d, country:address.country, city: address.city }))
                            }}
                            // options={{
                            //     types: ["cities"],
                            // }}
                        />
                                </View>
                                <View style={{ paddingHorizontal: '30%' }}>
                                    <Button label={i18n.t('beta_test.button')} onPress={()=>handleSubmit()} dark />
                                </View>
                            </View>
                        </View> */}
                    </View>
                    </>}
                    </>:<>
                    {/* <View style={styles.sectionHeader}>
                        <Text style={[styles.featuredHeader, styles.gold]}>{i18n.t('beta_test.thanks_header')}</Text>
                    </View>
                    <View style={styles.sectionContent}>
                        <Text style={styles.betaText}>{i18n.t('beta_test.thanks_text')}</Text>
                        </View> */}
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
