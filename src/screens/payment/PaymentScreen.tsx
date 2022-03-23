import Button from '@fair/components/common/Button';
import { useApi } from '@fair/hooks/useApi';
import React, { useEffect, useState } from 'react';
import { ColorPropType, Image, ScrollView, StyleSheet, TouchableOpacity, Alert, Platform, ActivityIndicator } from 'react-native';
import Text from '@fair/components/common/Text';
import View from '@fair/components/common/View';
import { PaymentIntent } from '@fair/constants/Stripe'
import { color } from '@fair/constants/Colors';
import { NavigationHelpersContext, useNavigation, useRoute } from '@react-navigation/core';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { useStripe } from '@stripe/stripe-react-native';
import { useCartContext } from '@fair/context/CartContextProvider';
import PaymentScreen from '@fair/components/common/PaymentScreen'
import i18n, { currentLocale } from 'i18n-js';
import { useUserDataContext } from '@fair/context/UserDataContextProvider';
import { useAuthContext } from '@fair/context/AuthContextProvider';
import AddressInput from '@fair/components/custom/AddressInput';
import FTENV from '@fair/ftenv'

export default function CardPaymentScreen() {
    const { user } = useAuthContext()
    const { params } = useRoute()
    const { goBack } = useNavigation()
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const [paymentSheetEnabled, setPaymentSheetEnabled] = useState(false);
    const [loading, setLoading] = useState(false);
    const [orderId, setOrderId] = useState();
    const [billingAdr, setBillingAdr] = useState([]);
    const [clientSecret, setClientSecret] = useState<string>();
    const { navigate } = useNavigation();
    const { items } = useCartContext()
    const { getShippingAddress, getBillingAddress, userData } = useUserDataContext()

    const shippingRequired = items.reduce(function (prev, cur) {
        return (prev === true || cur.shipping_required === true)
    }, false)

    const total = parseFloat(items.reduce(function (prev, cur) {
        const calc = prev + (cur.unit_price * cur.quantity)
        return calc
    }, 0.00)).toFixed(2)
    const fetchPaymentSheetParams = async (price: number): Promise<PaymentIntent> => {
        const { data } = await useApi('stripe/payment-intent', {
            method: 'POST',
            body: JSON.stringify({ amount: price, cart: items })
        });
        setClientSecret(data.payment_intent_secret);
        setOrderId(data.order_id)
        return data;
    };
    const confirmPayment = async (order_id: number): Promise<Boolean> => {
        const { data } = await useApi('orders/' + order_id + '/confirm');
        return data;
    };
    const cancelPayment = async (order_id: number): Promise<Boolean> => {
        const { data } = await useApi('orders/' + order_id + '/cancel');
        return data;
    };

    const openPaymentSheet = async () => {
        if (!clientSecret) {
            return;
        }
        setLoading(true);
        const { error } = await presentPaymentSheet({
            clientSecret,
        });

        if (error) {
            const cancelled = await cancelPayment(orderId);
            setPaymentSheetEnabled(false);
        } else {
            const confirmed = await confirmPayment(orderId);
            if (confirmed) {
                navigate('PaymentSuccess');
            }
        }
        setPaymentSheetEnabled(false);
        setLoading(false);
    };

    const initialisePaymentSheet = async (amount: number) => {
        const intent = await fetchPaymentSheetParams(amount);
        const { error } = await initPaymentSheet({
            customerId: intent.customer,
            applePay: true,
            googlePay: true,
            testEnv: FTENV().testPayments,
            merchantCountryCode: 'DK',
            customerEphemeralKeySecret: (Platform.OS == "ios" ? intent.ephemeral_key : intent.ephemeral_key_id),
            paymentIntentClientSecret: intent.payment_intent_secret,
            customFlow: false,
            merchantDisplayName: 'fairTasting',
            style: 'automatic',
        });
        if (!error) {
            setPaymentSheetEnabled(true);
        }
    };

    useEffect(() => {
        (async () => await getBillingAddress())();
        //(async () => await getShippingAddress())();
    }, []);


    useEffect(() => {
        if (clientSecret && paymentSheetEnabled) {
            openPaymentSheet();
        }
    }, [paymentSheetEnabled]);

    return (
        <View style={styles.container}>
            <View style={styles.header} safeArea>
                <Text style={styles.title}>{i18n.t('checkout')}</Text>
            </View>
            <ScrollView>

                <View>
                    <Text style={styles.billingHeader}>
                        {i18n.t('billing_address')}
                    </Text>
                </View>

                {userData.billingAddress ? <>
                    <View row>
                        <View style={styles.addressContainer}>
                            <Text style={styles.billingText}>
                                {user?.firstname} {user?.lastname}
                            </Text>

                            <Text style={styles.billingText}>
                                {userData.billingAddress.address}
                            </Text>
                            <Text style={styles.billingText}>
                                {userData.billingAddress.address2}
                            </Text>
                            <Text style={styles.billingText}>
                                {userData.billingAddress.postcode} {userData.billingAddress.city}
                            </Text>
                            <Text style={styles.billingText}>
                                {userData.billingAddress.country}
                            </Text>
                            {/* <Text style={styles.billingText}>
                                {"Country"}
                            </Text> */}
                            <Text style={styles.billingEmail}>
                                {user?.email}
                            </Text>

                        </View>
                        <View style={styles.changeContainer}>
                            {/* <Text style={styles.changeLink}>
                                {i18n.t('change_address')}
                            </Text> */}
                        </View>
                    </View>
                </> : <>
                    <AddressInput type='BILLING'></AddressInput>
                </>}


                <PaymentScreen>
                    {!loading ? <>
                        <Button
                            label={i18n.t('button_pay') + " " + total}
                            onPress={() => initialisePaymentSheet(total)}
                            dark
                        />
                    </> : <>
                        <ActivityIndicator size="large" color={color.brand} />
                    </>}
                </PaymentScreen>

            </ScrollView>
            <TouchableOpacity onPress={() => goBack()} style={styles.backButton}>
                <Ionicons name="arrow-back" size={25} color="white" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
    },
    header: {
        alignItems: 'center',
        backgroundColor: color.brand
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        zIndex: 1,
        paddingTop: 20
    },
    title: {
        fontSize: 30,
        paddingBottom: 20,
        color: '#E9E1DD',
        fontFamily: 'Sentient-Regular',
    },
    byText: {
        fontSize: 19,
        paddingLeft: 20,
        lineHeight: 35,
        fontWeight: "900",
        paddingBottom: 5,
        color: "#000000",
    },
    icon: {
        paddingLeft: 20,
        paddingRight: 10
    },
    dateText: {
        fontSize: 19,
        paddingLeft: 20,
        lineHeight: 35,
        fontWeight: "900",
        paddingBottom: 5,
        color: "#000000",
    },
    ticketDescription: {
        fontSize: 20,
        lineHeight: 35,
        paddingLeft: 20,
        color: "#000000",
    },
    ticketPrice: {
        fontSize: 20,
        lineHeight: 35,
        color: "#000000",
    },
    billingHeader: {
        fontSize: 25,
        lineHeight: 35,
        padding: 20,
        color: color.brand
    },
    billingText: {
        fontSize: 18,
        paddingLeft: 20,
        color: "#000000",
        fontFamily: 'Roboto_100Thin'
    },
    billingEmail: {
        fontSize: 18,
        lineHeight: 35,
        paddingLeft: 20,
        paddingTop: 10,
        color: "#000000"
    },
    eventCard: {
        backgroundColor: color.white,
        marginBottom: 15,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    eventName: {
        fontSize: 20,
        fontFamily: 'Sentient-Regular',
    },
    backButton: {
        position: 'absolute',
        top: 40,
        left: 20,
        height: 40,
        width: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    infoIcon: {
        paddingLeft: 20,
    },
    bottomIcon: {
        paddingLeft: 20,
        paddingTop: 5,
        lineHeight: 50,
    },
    bottomText: {
        fontSize: 25,
        paddingTop: 5,
        lineHeight: 50,
        textAlignVertical: "center",
        textAlign: "center"
    },
    buttonRight: {
        paddingRight: 20,

    },
    lineStyle: {
        borderWidth: 3,
        borderColor: '#E5E5E5',
        marginTop: 10,
        marginBottom: 10,
    },
    lineStyleSlim: {
        borderWidth: 1,
        borderColor: '#E5E5E5',
        marginTop: 10,
        marginBottom: 10,
    },
    paymentSelectorActive: {
        borderWidth: 2,
        borderColor: color.brand,
        borderRadius: 5,
        paddingVertical: 20,
        paddingHorizontal: 55,
        marginBottom: 20,
        zIndex: 1
    },
    paymentSelector: {
        backgroundColor: '#F0F0F0',
        borderRadius: 5,
        marginLeft: 20,
        paddingVertical: 20,
        paddingHorizontal: 55,
        marginBottom: 20,
    },
    addressContainer: {
        textAlign: 'right',
        textAlignVertical: 'center',
        flex: 2
    },
    addressInputContainer: {
        textAlign: 'right',
        textAlignVertical: 'center',
        flex: 1,
        paddingHorizontal: 20
    },
    changeContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    changeLink: {
        textAlign: 'right',
        color: color.brand,
        fontSize: 20,
    }
});
