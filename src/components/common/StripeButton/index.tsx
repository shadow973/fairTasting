import * as React from 'react';
import Text from '../Text';
import {
    AccessibilityProps,
    ActivityIndicator,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import { color } from '@fair/constants/Colors';

interface Props {
    title?: string
    variant?: 'default' | 'primary'
    disabled?: boolean
    loading?: boolean
    onPress: () => void
};

const StripeButton = ({ title, variant, disabled, loading, onPress }: Props) => {
    return (
        <View>
            <TouchableOpacity onPress={onPress}>
                <Text>{title} </Text>
            </TouchableOpacity>
        </View>
    )
}

export default StripeButton

const styles = StyleSheet.create({
    container: {
        paddingVertical: 12,
        borderRadius: 12,
    },
    primaryContainer: {
        backgroundColor: color.brand,
        alignItems: 'center',
    },
    text: {
        color: color.brand,
        fontWeight: '600',
        fontSize: 16,
    },
    textPrimary: {
        color: color.white,
    },
    disabled: {
        opacity: 0.3,
    }
});