import Text from '@fair/components/common/Text';
import * as React from 'react';
import View from '@fair/components/common/View';
import { StyleSheet } from 'react-native';
import { color } from '@fair/constants/Colors';
import { brandFontFamily, brandFontSize } from '@fair/constants/Fonts';
import i18n from 'i18n-js';
import { Video } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';
import { useRef } from 'react';
import Logo from '@fair/components/common/Logo'

const SplashScreen = () => {
    const video = useRef(null);
    return (

        <View style={[styles.outerContainer]}>
            <Video
                ref={video}
                style={[StyleSheet.absoluteFill]}
                source={{
                    uri: 'https://cdn.fairtasting.com/videos/welcome.mp4',
                }}
                posterSource={require('@assets/images/home/welcome_bg.jpg')}
                shouldPlay
                resizeMode="cover"
                isLooping
            />
            <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.9)']}
                style={[StyleSheet.absoluteFill]}
            />
            <View style={styles.container}>
                <View style={{ justifyContent: 'flex-end', paddingVertical: 20 }}>
                    <Logo />
                </View>
                <Text style={styles.splashText}>{i18n.t('please_wait')}</Text>
            </View>
        </View>
    );
}

export default SplashScreen

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
        backgroundColor: '#4C0013'
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
      },
    splashText: {
        fontFamily: brandFontFamily.base,
        fontSize: brandFontSize.h2,
        color: color.white
    },
})