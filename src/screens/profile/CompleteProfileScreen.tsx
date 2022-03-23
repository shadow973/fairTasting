import Button from '@fair/components/common/Button';
import Card from '@fair/components/common/Card';
import Text from '@fair/components/common/Text';
import View from '@fair/components/common/View';
import { useAuthContext } from '@fair/context/AuthContextProvider';
import { ColorPropType, Image, Platform, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationHelpersContext, useNavigation, useRoute } from '@react-navigation/core';
import i18n from 'i18n-js';
import { color } from '@fair/constants/Colors';
import { brandFontFamily, brandFontSize } from '@fair/constants/Fonts';
import { AntDesign, Ionicons, Entypo } from '@expo/vector-icons';
import Input from '@fair/components/common/Input';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useEffect, useState } from 'react';
import { isSet } from 'lodash';

const basePath = 'https://cdn.fairtasting.com/images/welcome_ft.jpeg'

export default function CompleteProfileScreen() {
    const { user, completeProfile } = useAuthContext();
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(true);
    const [showValidation, setShowValidation] = useState(false);
    const [viewValidationBorder, setVieValidationBorder] = useState('black');
    const { navigate } = useNavigation();
    const [formValues, setFormvalues] = React.useState({
        firstname: '',
        lastname: '',
        gender: '',
        dob: null,
    })
    const onChange = (event:any, selectedDate:Date) => {
        //alert("Selected date: "+selectedDate)
        const currentDate = selectedDate;
        setDate(currentDate || date);
        setFormvalues(d => ({ ...d, dob: currentDate }));
        setShowValidation(false);
        console.log(new Date(selectedDate))
        alert(selectedDate)
    };


    const onFormValueChange = (field: any, value: any) => {
        setFormvalues(d => ({ ...d, [field]: value }))
    }
    const handleSubmit = async() =>{
        if (!formValues.dob) {
            setShowValidation(true);
        } else {
            completeProfile(formValues)
        }
    }
    let color = 'black';
    let maxDate = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
    maxDate.setUTCFullYear(maxDate.getUTCFullYear() - 18);
    let empDate = new Date();
    empDate.setFullYear(maxDate.getFullYear() - 150);
    return (
        <View style={styles.container}>
            <View style={styles.header} safeArea>
                <Text style={styles.title}>{i18n.t('complete_profile.header')}</Text>
            </View>
            
                <View style={{ overflow: 'hidden', backgroundColor: color.lightGrey, height: 150, marginBottom: 5 }}>
                    <Image source={{ uri: basePath }} style={StyleSheet.absoluteFill} />
                </View>
                <ScrollView contentContainerStyle={{ paddingHorizontal: 0, paddingBottom: 250  }}>
                <View style={styles.welcomeExplainer}>
                    <Text style={styles.explainerText}>{i18n.t('complete_profile.explainer')}</Text>
                </View>
                { !(user?.firstname) && !(user?.lastname) &&
                    <View style={styles.inputView}>
                        <Text style={styles.headerText}>{i18n.t('complete_profile.name_header')}</Text>
                        <Text style={styles.explainerText}>{i18n.t('complete_profile.name_explainer')}</Text>
                            <Input placeholder={i18n.t('form_first_name')} onChange={onFormValueChange.bind(null, 'firstname')}
                                value={formValues['firstname']} />
                            <Input placeholder={i18n.t('form_last_name')} onChange={onFormValueChange.bind(null, 'lastname')}
                                value={formValues['lastname']} />
                    </View>
                }
                { !(user?.gender) &&
                    <View style={styles.inputView}>
                        <Text style={styles.headerText}>{i18n.t('complete_profile.gender_header')}</Text>
                        <Text style={styles.explainerText}>{i18n.t('complete_profile.gender_explainer')}</Text>
                        <Picker
                            style={styles.pickerMobile}
                            itemStyle={{ height: 120, fontFamily: brandFontFamily.base, fontSize: brandFontSize.base }}
                            selectedValue={formValues['gender']}
                            onValueChange={(itemValue, itemIndex) => {
                                setFormvalues(d => ({ ...d, gender: itemValue }))
                            }}>
                            <Picker.Item label="Please Select" value="" />
                            <Picker.Item label="Female" value="F" />
                            <Picker.Item label="Male" value="M" />
                            <Picker.Item label="Other" value="O" />
                            <Picker.Item label="I don't want to disclose" value="X" />
                        </Picker>
                    </View>
                }
                <View  style={{ ...styles.inputView, borderColor: showValidation ? 'red' : 'black' }}>
                        <Text style={styles.headerText}>{i18n.t('complete_profile.dob_header')}</Text>
                        <Text style={styles.explainerText}>{i18n.t('complete_profile.dob_explainer')}</Text>
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            {(new Date(user?.dob) < empDate || !(user?.dob) || user?.dob == undefined || user?.dob == null) &&
                                <DateTimePicker
                                    value={date}
                                    is24Hour={true}
                                    mode="date"
                                    display="spinner"
                                    onChange={onChange}
                                    style={{ width: '100%', height: 140 }}
                                    
                                    maximumDate={maxDate}
                                />
                            }
                        </View>
                </View>
                <View style={styles.validationStyle}>
                    {showValidation && 
                        <Text color='red'>Please insert your birthday.</Text>
                    }
                </View>
                <View style={styles.inputViewForButton}>
                    <Button label="Update Profile" onPress={()=>handleSubmit()} dark />
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#FFFFFF'
    },
    header: {
        alignItems: 'center',
        backgroundColor: color.brand,
        paddingVertical: 10
    },
    title: {
        fontSize: brandFontSize.h2,
        fontFamily: brandFontFamily.h3,
        color: color.white,
        paddingBottom: 10
    },
    welcomeExplainer: {
        marginHorizontal: 20,
    },
    inputView: {
        marginHorizontal: 20,
        marginTop: 5,
        borderWidth: 1,
        borderRadius: 15,
        padding: 10,
        flex: 1,
    },
    inputViewForButton: {
        marginHorizontal: 20,
        marginVertical: 5,
        flex: 1
    },
    headerText: {
        fontSize: brandFontSize.h2,
        fontFamily: brandFontFamily.h1,
        color: color.grey,
        paddingBottom: 10
    },
    explainerText: {
        fontSize: brandFontSize.h3,
        fontFamily: brandFontFamily.h3,
        color: color.grey,
        paddingBottom: 10
    },
    pickerMobile: {

        borderColor: color.light_gray,
        //paddingHorizontal: 20,
        //paddingVertical: 10,
        //height: 60,
        borderRadius: 10,
        borderWidth: 1.25,
        //flex: 1,
        //color: color.brand,

    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
    nameContainer: {
        flex: 2,
        paddingVertical: 20,
        justifyContent: 'center'
    },
    picContainer: {
        flex: 1,
        paddingVertical: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    lineStyleSlim: {
        borderWidth: 1,
        borderColor: '#E5E5E5',
        marginTop: 5,
        marginBottom: 5,
    },
    lineStyleMedium: {
        borderWidth: 3,
        borderColor: '#E5E5E5',
        marginTop: 5,
        marginBottom: 5,
    },
    menuItem: {
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    validationStyle: {
        marginHorizontal: 20,
        paddingLeft: 10,
        paddingTop: 5,
        marginBottom: 20
    }
});
