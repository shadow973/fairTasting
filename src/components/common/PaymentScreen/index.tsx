import { color } from '@fair/constants/Colors';
import { initStripe } from '@stripe/stripe-react-native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text } from 'react-native';
import { useApi } from '@fair/hooks/useApi';

interface Props {
    paymentMethod?: string;
}

const PaymentScreen: React.FC<Props> = ({ paymentMethod, children }) => {
    const [loading, setLoading] = useState(true);
    const getpKey = async (): Promise<string> => {
        const { data } = await useApi('stripe/keys/publishable')
        return data
    }
    useEffect(() => {
        async function initialize() {
            const publishableKey = await getpKey();
            if (publishableKey) {
                await initStripe({
                    publishableKey,
                    merchantIdentifier: 'merchant.com.fairtasting.app',
                    urlScheme: 'stripe-example',
                    setUrlSchemeOnAndroid: true,
                });
                setLoading(false);
            }
        }
        initialize();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return loading ? (
        <ActivityIndicator size="large" style={StyleSheet.absoluteFill} />
    ) : (
        <ScrollView
            accessibilityLabel="payment-screen"
            keyboardShouldPersistTaps="always"
            style={styles.container}
        >
            {children}
            {/* eslint-disable-next-line react-native/no-inline-styles */}
            <Text style={{ opacity: 0 }}>appium fix</Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.white,
        paddingTop: 20,
        paddingHorizontal: 16,
    },
});

export default PaymentScreen;