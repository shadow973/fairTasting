import React, { useEffect, useRef, useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, StyleSheet, Text, Pressable } from 'react-native';
import Button from '@fair/components/common/Button';
import View from '@fair/components/common/View';
import { useNavigation, useRoute } from '@react-navigation/core';
import Logo from '@fair/components/common/Logo'
import { Video } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuthContext } from '@fair/context/AuthContextProvider';
import i18n from 'i18n-js';
import { color } from '@fair/constants/Colors';
import * as AppleAuthentication from 'expo-apple-authentication';
import { brandFontFamily, brandFontSize } from '@fair/constants/Fonts';
import * as Facebook from "expo-facebook";
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { requestTrackingPermissionsAsync } from 'expo-tracking-transparency';
import Input from '@fair/components/common/Input';
import { CapitaliseType, InputType } from '@fair/constants/Form';
import InvalidText from '@fair/components/common/InvalidText';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

WebBrowser.maybeCompleteAuthSession();
export default function WelcomeScreen() {
  let scroll = useRef();
  const { params } = useRoute()
  const { navigate } = useNavigation()
  const video = useRef(null);
  const { isTokenValid, handleAppleSignIn, handleFacebookSignIn, handleGoogleSignIn, login } = useAuthContext()
  const [usernameValidation, setUsernameValidation] = useState(true)
  const [formValues, setFormValues] = useState({
    email: '',
    password: ''
  })
  /* FB const setting*/
  const facebookAppId = '457711701973443';
  /* Google const setting*/
  const expoClientId = '682567992933-kne9fihh8p6lo5133t0frk6evisv5o04.apps.googleusercontent.com';
  const androidClientId = '682567992933-cv06mjvpuc4jftundaja0gv70dd0a1at.apps.googleusercontent.com';
  const iosClientId = '682567992933-re7v2cqf39d9rftr55c5t1rudbakopum.apps.googleusercontent.com';
  const webClientId = '682567992933-415f9ls424d5ic8l7n216q5u1oap08c0.apps.googleusercontent.com';

  const [gRequest, gResponse, gPromptAsync] = Google.useAuthRequest({
    expoClientId: expoClientId,
    androidClientId: androidClientId,
    iosClientId: iosClientId,
    webClientId: webClientId,
  });

  const facebookLogIn = async () => {
    try {
      await Facebook.initializeAsync({
        appId: facebookAppId,
      });
      const { type, token } =
        await Facebook.logInWithReadPermissionsAsync({
          permissions: ["public_profile", "email"],
          behavior: "web",
        });
      if (type === "success") {
        handleFacebookSignIn(token);
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
      console.log("message", message);
    }
  };

  const validateEmail = (email: any) => {
    let reg = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return reg.test(email);
  };

  const handleSubmit = async () => {
    if (validateEmail(formValues.email) === true) {
      setUsernameValidation(true)
      try {
        await login(formValues)
      } catch (error) {
        alert('Unregistered account')
      }
    } else {
      setUsernameValidation(false);
    }
  };

  const onFormValueChange = (field: any, value: any) => {
    setFormValues((d: any) => ({ ...d, [field]: value }))
  }

  /* Google signin process start point*/
  useEffect(() => {
    if (gResponse?.type === 'success') {
      handleGoogleSignIn(gResponse);
    }
  }, [gResponse]);
  /* Google signin process end point*/

  useEffect(() => {
    (async () => {
      const { status } = await requestTrackingPermissionsAsync();
    })();
  }, []);

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
      <KeyboardAwareScrollView innerRef={ref => {
        scroll.current = ref
      }}>
        <View style={styles.container}>

          <View style={{ justifyContent: 'flex-end', paddingVertical: 20 }}>
            <Logo />
          </View>
          <View>
            <Input
              placeholder='Username'
              style={usernameValidation ? styles.inputContainer : styles.invalidInputContainer}
              keyboardType='email-address'
              onChange={onFormValueChange.bind(null, 'email')}
              autoCapitalize={CapitaliseType.NONE}
              inputStyle={styles.input}
            />
            {!usernameValidation &&
              <InvalidText >{i18n.t('invalid_email')}</InvalidText>
            }
            <Input
              placeholder='Password'
              style={{ ...styles.inputContainer, flexDirection: 'row', marginBottom: 20 }}
              inputStyle={styles.input}
              type={InputType.PASSWORD}
              onChange={onFormValueChange.bind(null, 'password')}
            />
            <Button signinText label={i18n.t('login')} onPress={handleSubmit} />
            <Pressable style={{ marginTop: 20 }} onPress={() => null}>
              <Text style={styles.forgetPwd}>{i18n.t('forgot_password')}</Text>
            </Pressable>
            <View style={styles.socialSignin}>
              <Text style={{ color: color.white }}>{i18n.t('login_with')}</Text>
              <View style={styles.socialButton}>
                {Platform.OS == 'ios' &&
                  <Pressable onPress={async () => {
                    try {
                      const credential = await AppleAuthentication.signInAsync({
                        requestedScopes: [
                          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                          AppleAuthentication.AppleAuthenticationScope.EMAIL,
                        ],
                      });
                      // signed in
                      handleAppleSignIn(credential)
                    } catch (e) {
                      if (e.code === 'ERR_CANCELED') {
                        console.log(e.message)
                      } else {
                        console.log(e.message)
                      }
                    }
                  }
                  }>
                    <Image source={require('@assets/images/social_login/apple.png')} style={{ marginRight: 20 }} />
                  </Pressable>
                }
                <Pressable onPress={() => gPromptAsync()}>
                  <Image source={require('@assets/images/social_login/google.png')} style={{ marginRight: 20 }} />
                </Pressable>
                <Pressable onPress={() => facebookLogIn()}>
                  <Image source={require('@assets/images/social_login/facebook.png')} />
                </Pressable>
              </View>
            </View>
            <View style={styles.socialSignin}>
              <Text style={{ color: color.white, paddingBottom: 5 }}>{i18n.t('no_account')}</Text>
              <Pressable onPress={() => navigate('CreateAccount')}>
                <Text style={styles.forgetPwd}>{i18n.t('signup')}</Text>
              </Pressable>
            </View>
            <View style={styles.socialSignin}>

              <Pressable onPress={() => navigate('UpcomingEvents')}>
                <Text style={styles.forgetPwd}>{i18n.t('welcome_as_guest')}</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}

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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  mustLoginText: {
    fontFamily: brandFontFamily.base,
    fontSize: brandFontSize.h2,
    color: color.white,
    paddingBottom: 20
  },
  textInput: {
    backgroundColor: "#F0F0F0",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    flex: 1,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
  versionText: {
    fontSize: 10,
    color: color.white,
    paddingBottom: 5
  },
  versionTextProd: {
    fontSize: 10,
    color: color.white,
    marginBottom: 20
  },
  versionContainer: {
    fontSize: 10,
    color: color.white,
    alignContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginTop: 50,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: color.white,
    justifyContent: 'flex-end',
  },
  signupContainer: {
    fontSize: 10,
    color: color.white,
    alignContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },
  signupText: {
    fontSize: brandFontSize.base,
    color: color.white,
    alignItems: 'center',
    alignContent: 'center',
  },
  inputContainer: {
    alignItems: 'center',
    backgroundColor: color.white,
    opacity: 0.4,
    padding: 10,
    borderRadius: 5,
    marginTop: 20
  },
  invalidInputContainer: {
    alignItems: 'center',
    backgroundColor: color.white,
    opacity: 0.4,
    padding: 10,
    borderRadius: 5,
    borderColor: 'red',
    borderWidth: 2,
    marginTop: 20
  },
  input: {
    fontSize: 14,
    width: 320
  },
  forgetPwd: {
    color: color.white,
    textDecorationLine: 'underline',
    fontSize: 14,
    //lineHeight: 16,
    alignSelf: 'center'
  },
  socialSignin: {
    marginTop: 20,
    alignItems: 'center'
  },
  socialButton: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 20
  }
});
