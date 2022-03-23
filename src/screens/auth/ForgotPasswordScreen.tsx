import Button from '@fair/components/common/Button';
import Input from '@fair/components/common/Input';
import Text from '@fair/components/common/Text';
import View from '@fair/components/common/View';
import { color } from '@fair/constants/Colors';
import { InputType } from '@fair/constants/Form';
import { StackScreenProps } from '@react-navigation/stack';
import * as React from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from '@react-navigation/core';

import { AuthStackParamList } from '../../types';
import { useAuthContext } from '@fair/context/AuthContextProvider';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import i18n from 'i18n-js';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';



export default function ForgotPasswordScreen() {
  const { passwordReset, pwdResetError, setpwdResetError, loading } = useAuthContext()
  const { verifyReset } = useAuthContext()
  const { navigate } = useNavigation()
  const [verify, setVerify] = React.useState(false)
  const [formValues, setFormvalues] = React.useState({
    email: undefined
  })
  const [verifyValues, setVerifyFormvalues] = React.useState({
    email: undefined,
    password: undefined,
    code: undefined
  })

  const handleSubmit = async () => {
    setpwdResetError(false)
    await passwordReset(formValues)
    if (!pwdResetError) {
      setVerify(true)
    }
  }
  const handleVerifySubmit = async () => {
    await verifyReset(verifyValues)
    navigate('SignIn')
  }

  const onFormValueChange = (field: any, value: any) => {
    setFormvalues(d => ({ ...d, [field]: value.toLowerCase().trim() }))
    setVerifyFormvalues(d => ({ ...d, [field]: value.toLowerCase().trim() }))
  }
  const onVerifyFormValueChange = (field: any, value: any) => {
    setVerifyFormvalues(d => ({ ...d, [field]: value }))
  }



  return (
    <KeyboardAvoidingView
      style={styles.outerContainer}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      enabled>
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.9)']}
        style={[StyleSheet.absoluteFill]}
      />
      <View style={styles.container} >
        {!verify || pwdResetError ? <>
          <View style={{ alignSelf: 'stretch' }}>
            <Text color={color.brand} style={styles.title}>{i18n.t('forgot_password')}</Text>
            <Text style={styles.explainer}>{i18n.t('forgot_password_explainer')}</Text>
          </View>
          <Input
            autoFocus
            placeholder={i18n.t('email')}
            type={InputType.EMAIL}
            onChange={onFormValueChange.bind(null, 'email')}
            value={formValues['email']}
            autoCapitalize="none" />
          {pwdResetError ? <>
            <View style={styles.warningView}>
              <View>
                <Ionicons name="warning" size={20} color="red" />
              </View>
              <Text style={styles.warningText}>{i18n.t('unknown_email')}</Text>
            </View>
          </> : <></>}
          <Button label={i18n.t('request_security_code')} onPress={handleSubmit} dark />
          <Button label={i18n.t('cancel')} onPress={() => navigate("Welcome")} dark secondary />
        </> : <>
          <View style={{ alignSelf: 'stretch' }}>
            <Text color={color.brand} style={styles.title}>{i18n.t('enter_security_code')}</Text>
            <Text style={styles.explainer}>{i18n.t('security_code_explainer')}</Text>
          </View>
          <Input
            autoFocus
            placeholder={i18n.t('security_code')}
            onChange={onVerifyFormValueChange.bind(null, 'code')}
            value={verifyValues['code']} />
          <Input

            placeholder={i18n.t('password')}
            type={InputType.PASSWORD}
            onChange={onVerifyFormValueChange.bind(null, 'password')}
            value={verifyValues['password']} />
          <Button label={i18n.t('reset_password')}onPress={handleVerifySubmit} dark />
          <Button label={i18n.t('cancel')} onPress={() => navigate("Welcome")} dark secondary />
        </>}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    //justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#4C0013',
  },
  container: {
    marginTop: 100,
    borderRadius: 10,
    marginHorizontal: 15,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 30,
    maxWidth: 400
  },
  title: {
    fontSize: 30,
    marginVertical: 15,
    fontFamily: 'Sentient-Regular',
  },
  explainer: {
    fontSize: 15,
    paddingBottom: 15,
  },
  textInput: {
    backgroundColor: "#F0F0F0",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    //flex: 1,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
  root: { flex: 1, padding: 20 },
  codeFieldRoot: { marginTop: 20 },
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 2,
    borderColor: '#00000030',
    textAlign: 'center',
  },
  focusCell: {
    borderColor: '#000',
  },
  warningText: {
    fontSize: 14,
    color: 'red',
    padding: 3
  },
  warningView: {
    borderRadius: 10,
    borderWidth: 1.25,
    borderColor: 'red',
    paddingHorizontal: 50,
    paddingVertical: 5,
    minHeight: 30,
    flexDirection: 'row',
    alignSelf: "stretch",
    alignItems: 'center',
    justifyContent: 'center'

  },
});
