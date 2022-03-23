import Button from '@fair/components/common/Button';
import View from '@fair/components/common/View';
import Text from '@fair/components/common/Text';
import Input from '@fair/components/common/Input';
import { useNavigation, useRoute } from '@react-navigation/core';
import { useAuthContext } from '@fair/context/AuthContextProvider';
import { color } from '@fair/constants/Colors';
import { Pressable, StyleSheet, TouchableOpacity } from 'react-native';
import { brandFontFamily, brandFontSize } from '@fair/constants/Fonts';
import { Linking, TextInput } from 'react-native';
import i18n from 'i18n-js';
import Logo from '@fair/components/common/Logo'
import React, { useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { useMediaQuery } from 'react-responsive'
import { useApi } from '@fair/hooks/useApi';
import { Entypo, AntDesign } from '@expo/vector-icons';
interface TextProps extends React.PropsWithChildren<any> {
    children: React.ReactNode;
    setShowSignInModal: Function;
}
const FTWebLayout = ({ children, setShowSignInModal }: TextProps) => {
    const isDesktopOrLaptop = useMediaQuery({ minWidth: 1224 })
    const isBigScreen = useMediaQuery({ minWidth: 1824 })
    const isTabletOrMobile = useMediaQuery({ maxWidth: 1224 })
    const isPortrait = useMediaQuery({ orientation: 'portrait' })
    const isRetina = useMediaQuery({ minResolution: '2dppx' })
    const { navigate } = useNavigation()
    const { currentUser, logout } = useAuthContext()
    const [confirmed, setConfirmed] = useState(false)
    const [showExploreOptions, setShowExploreOptions] = useState(false);
    const [formValues, setFormvalues] = useState({
        email: '',
        full_name: '',
    })
    const onFormValueChange = (field: any, value: any) => {
        setFormvalues(d => ({ ...d, [field]: value }))
    }
    const handleSubmit = async () => {
        const { data } = await useApi('newsletter', {
            method: 'POST',
            body: JSON.stringify(formValues)
        })
        if (data) {
            setConfirmed(true)
        }
    }

    return (
        <ScrollView style={[styles.outerContainer]}>

            {isTabletOrMobile ? <>
                <View style={styles.headerMobile}>
                    <View style={styles.headerLogo}>
                        <Pressable style={styles.pressable} onPress={() => navigate('Welcome')}>
                            <Logo />
                        </Pressable>
                    </View>
                    <TouchableOpacity style={{width: '30%', alignItems: 'flex-end', justifyContent: 'flex-end'}}>
                        <Entypo name="menu" color="#000000" size={40} />
                    </TouchableOpacity>
                </View>
                <View style={styles.contentContainer}>

                    {children}
                </View>
            </> : <>
                <View>
                    <View style={styles.header} row>
                        <View style={styles.headerLogo}>
                            <Pressable style={styles.pressable} onPress={() => navigate('Welcome')}>
                                <Logo />
                            </Pressable>
                        </View>
                        <View style={{ width: '50%', justifyContent: 'flex-end', alignItems: 'center' }} row>
                            <View style={styles.headerLinksContainer} row>
                                <View style={styles.headerLinks}><Text style={styles.headerLinkText}>ABOUT</Text></View>
                                <View style={styles.headerLinks}>
                                    <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}} onPress={() => setShowExploreOptions(!showExploreOptions)}>
                                        <Text style={styles.headerLinkText}>EXPLORE</Text>
                                        <Entypo name="chevron-down" size={20} style={{ marginLeft: 5 }} color="#000" />
                                    </TouchableOpacity>
                                    {showExploreOptions && <View style={{ position: 'absolute', top: 30, left: 0, right: 0, zIndex: 10, backgroundColor: '#FFFFFF', padding: 10, width: 160 }}>
                                        <View style={styles.headerLinks2}><Text style={styles.headerLinkText2}>FAIRS</Text></View>
                                        <View style={styles.headerLinks2}><Text style={styles.headerLinkText2}>WINEBARS</Text></View>
                                        <View style={styles.headerLinks2}><Text style={styles.headerLinkText2}>RESTAURANTS</Text></View>
                                    </View>}
                                </View>
                                <TouchableOpacity style={styles.headerLinks} onPress={() => setShowSignInModal(true)}><Text style={styles.headerLinkText}>SIGN IN</Text></TouchableOpacity>
                                {/* <View style={styles.headerLinks}><Text style={styles.headerLinkText}>Tastings</Text></View>
                        <View style={styles.headerLinks}><Text style={styles.headerLinkText}>Winebars</Text></View>
                        <View style={styles.headerLinks}><Text style={styles.headerLinkText}>Restaurants</Text></View> */}
                                {/* <View style={styles.headerLinks}><Text style={styles.headerLinkText}>Sign In</Text></View> */}
                            </View>
                            <View style={styles.headerButtonsContainer} row>
                                <View style={styles.headerButton}><Button label="Register" gold /></View>
                                <View style={styles.headerButton}><a href="https://pro.fairtasting.com" target="_blank"><Button label="fairTasting PRO" pro /></a></View>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.contentContainer}>

                    {children}
                    <View style={styles.mainFooter}>
                        <View style={styles.textContainerLeft}>
                            <Pressable style={styles.pressable} onPress={() => navigate('Welcome')}>
                                <Logo style={{ tintColor: '#fff' }} />
                            </Pressable>
                            <Text style={styles.footerText}>
                                At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores.
                            </Text>
                            <View style={styles.socialLinks}>
                                <View style={styles.socialIcon}>
                                    <Entypo name="facebook" size={24} color="#F29FB6" />
                                </View>
                                <View style={styles.socialIcon}>
                                    <Entypo name="twitter" size={24} color="#F29FB6" />
                                </View>
                                <View style={styles.socialIcon}>
                                    <Entypo name="linkedin" size={24} color="#F29FB6" />
                                </View>
                                <View style={styles.socialIcon}>
                                    <AntDesign name="instagram" size={24} color="#F29FB6" />
                                </View>
                            </View>
                            {/* <Text style={styles.footerText}>{i18n.t('home.tagline')}</Text> */}
                        </View>
                        <View style={styles.textContainerLeft}>
                            <Text style={styles.footerHeaderText}>{i18n.t('home.find_out_more')}</Text>
                            <View style={{ marginTop: 15 }}>
                                <View style={styles.footerTextContainer}>
                                    <Entypo name="dot-single" size={24} color="#F29FB6" />
                                    <Text style={styles.footerText}>
                                        About
                                    </Text>
                                </View>
                                <View style={styles.footerTextContainer}>
                                    <Entypo name="dot-single" size={24} color="#F29FB6" />
                                    <Text style={styles.footerText}>
                                        FAQ
                                    </Text>
                                </View>
                                <View style={styles.footerTextContainer}>
                                    <Entypo name="dot-single" size={24} color="#F29FB6" />
                                    <Text style={styles.footerText}>
                                        Contact
                                    </Text>
                                </View>
                                <View style={styles.footerTextContainer}>
                                    <Entypo name="dot-single" size={24} color="#F29FB6" />
                                    <Text style={styles.footerText}>
                                        Press
                                    </Text>
                                </View>
                                <View style={styles.footerTextContainer}>
                                    <Entypo name="dot-single" size={24} color="#F29FB6" />
                                    <Text style={styles.footerText}>
                                        Careers
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.textContainerLeft}>
                            <Text style={styles.footerHeaderText}>{i18n.t('home.subscribe_to_newsletter')}</Text>
                            <View style={{ marginTop: 30, width: '60%' }}>
                                {!confirmed ? <>
                                    <View style={{ borderBottomWidth: 1, borderColor: '#F29FB6', width: '100%', padding: 12, marginVertical: 10 }}>
                                        <TextInput
                                            value={formValues['full_name']}
                                            placeholder="Full Name"
                                            onChange={(value) => onFormValueChange('email', value)}
                                            placeholderTextColor="#F29FB6"
                                            style={{ color: '#F29FB6' }}
                                        />
                                    </View>
                                    <View style={{ borderBottomWidth: 1, borderColor: '#F29FB6', width: '100%', padding: 12, marginVertical: 10 }}>
                                        <TextInput
                                            value={formValues['email']}
                                            placeholder={i18n.t('email')}
                                            onChange={(value) => onFormValueChange('email', value)}
                                            placeholderTextColor="#F29FB6"
                                            style={{ color: '#F29FB6' }}
                                        />
                                    </View>
                                    <View style={styles.subscribeButton}>
                                        <Button label={i18n.t('home.subscribe')} onPress={() => handleSubmit()} />
                                    </View>
                                </> : <>
                                    <Text style={styles.footerText}>{i18n.t('home.subscribe_confirmed')}</Text>
                                </>}
                            </View>
                        </View>
                    </View>
                    <View style={styles.subFooter}>
                        <View style={styles.textContainerLeft} row>
                            <Pressable style={styles.pressable} onPress={() => navigate('Privacy')}>
                                <Text style={styles.footerText}>Privacy</Text>
                            </Pressable>
                            <Pressable style={styles.pressable} onPress={() => navigate('Terms')}>
                                <Text style={styles.footerText}>Terms of Service</Text>
                            </Pressable>
                            <Pressable style={styles.pressable} onPress={() => navigate('CookiePolicy')}>
                                <Text style={styles.footerText}>Cookie Policy</Text>
                            </Pressable>
                            <Pressable style={styles.pressable} onPress={() => navigate('AcceptableUsePolicy')}>
                                <Text style={styles.footerText}>Acceptable Use Policy</Text>
                            </Pressable>
                            {/* <Text style={styles.footerText}>News</Text> */}
                        </View>
                        <View style={styles.copyright}>
                            <Text style={styles.footerText}>Copyright &copy; 2021 fairTasting - All Rights Reserved</Text>
                        </View>
                    </View>
                </View>

            </>}

        </ScrollView>
    )
}


export default FTWebLayout

const styles = StyleSheet.create({
    outerContainer: {
        flexGrow: 1,
        backgroundColor: color.white,
    },
    contentContainer: {
        flex: 1,
        backgroundColor: color.white,
        height: '100%',
        minHeight: '100vh',
        zIndex: -1,
    },
    header: {
        backgroundColor: color.white,
        paddingHorizontal: 100,
        maxHeight: 100,
        justifyContent: 'space-between',
    },
    headerMobile: {
        backgroundColor: color.white,
        paddingHorizontal: 20,
        maxHeight: 100,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    headerLogo: {
        width: '70%',
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    headerLinksContainer: {
        alignItems: 'center',
    },
    headerButtonsContainer: {
        alignItems: 'center',
    },
    headerLinks: {
        paddingHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    headerLinks2: {
        padding: 10,
        backgroundColor: '#FFFFFF',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        borderBottomWidth: 1,
        borderColor: '#E5E5E5'
    },
    headerLinkText: {
        color: color.black,
        fontFamily: brandFontFamily.h1,
        textTransform: 'uppercase'
    },
    headerLinkText2: {
        color: color.black,
        fontFamily: brandFontFamily.h1,
        textTransform: 'uppercase',
        textAlign: 'left'
    },
    headerButton: {
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    mainFooter: {
        //flex: 1,
        alignItems: 'flex-start',
        paddingHorizontal: 100,
        backgroundColor: color.brandContrast,
        flexDirection: 'row'
    },
    subFooter: {
        //flex: 1,
        paddingHorizontal: 100,
        backgroundColor: color.brand,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    footerHeaderText: {
        fontFamily: brandFontFamily.h1,
        fontSize: brandFontSize.h3,
        color: color.white,
        textTransform: 'uppercase'
    },
    footerTextContainer: {
        flexDirection: 'row',
        width: '80%',
        alignItems: 'center',
        padding: 5,
    },
    footerText: {
        fontFamily: brandFontFamily.base,
        fontSize: brandFontSize.h3,
        color: color.brandSuperLight,
        paddingRight: 20,
        lineHeight: 30,
        width: '100%%',
        textAlign: 'justify',
        marginLeft: 10,
    },
    footerTextLine: {
        fontFamily: brandFontFamily.base,
        fontSize: brandFontSize.base,
        color: color.brandSuperLight,
        paddingRight: 20,
        lineHeight: 30
    },
    textContainer: {
        marginVertical: 30,
        marginHorizontal: 30,
        alignItems: 'center',
        flex: 1
    },
    textContainerLeft: {
        marginVertical: 30,
        marginHorizontal: 30,
        alignItems: 'flex-start',
        flex: 1,
    },
    pressable: {
        cursor: 'pointer'
    },
    copyright: {
        alignItems: 'flex-end',
        flexGrow: 1,
    },
    subscribeButton: {
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        flexGrow: 1,
        marginTop: 10,
    },
    socialLinks: {
        marginTop: 25,
        flexDirection: 'row',
        alignItems: 'center',
    },
    socialIcon: {
        backgroundColor: '#690D26',
        marginHorizontal: 10,
        padding: 11,
        borderRadius: 5,
    }
})