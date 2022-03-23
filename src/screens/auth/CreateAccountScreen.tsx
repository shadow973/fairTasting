import Button from '@fair/components/common/Button';
import Input from '@fair/components/common/Input';
import Text from '@fair/components/common/Text';
import View from '@fair/components/common/View';
import { color } from '@fair/constants/Colors';
import { CapitaliseType, InputType } from '@fair/constants/Form';
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
import { ScrollView } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons';
import InvalidText from '@fair/components/common/InvalidText';
import { string } from 'prop-types';



export default function CreateAccountScreen({
  navigation,
}: StackScreenProps<AuthStackParamList, 'SignIn'>) {

  const { signup, verifySignup, login } = useAuthContext()
  const { navigate } = useNavigation()
  const [verify, setVerify] = React.useState(false)
  const [securityCodeValid, setSecurityCodeValid] = React.useState(false)
  const [passwordValid, setPasswordValid] = React.useState(false)
  const [emailValid, setEmailValid] = React.useState(true)
  const [email, setEmail] = React.useState('')
  const [formValues, setFormvalues] = React.useState({
    email: '',
    password: ''
  })
  const [verifyValues, setVerifyFormvalues] = React.useState({
    email: undefined,
    code: undefined,
    password: undefined,
    firstname: undefined,
    lastname: undefined
  })

  const handleSubmit = async () => {
    if(validateEmail(formValues.email)) {
      setEmailValid(true)
      await signup(formValues)
      setEmail(formValues.email)
      setVerify(true)
    } else {
      setEmailValid(false)
    }
  }
  const handleVerifySubmit = async () => {
    
    const values = { ...verifyValues, email: email }
    if(validateSecurityCode(verifyValues.code) && validatePassword(verifyValues.password)) {
      setPasswordValid(false)
      setSecurityCodeValid(false)
      try {
        await verifySignup(values)
        await login(values)
      } catch {
        //alert('Sign up is failed')
      }
    } else {
      setPasswordValid(validatePassword(verifyValues.password) == false);
      setSecurityCodeValid(validateSecurityCode(verifyValues.code) == false);
    }
  }

  const onFormValueChange = (field: any, value: any) => {
    if (field == "email") {
      setFormvalues(d => ({ ...d, [field]: value.toLowerCase().trim() }))
      setVerifyFormvalues(d => ({ ...d, [field]: value.toLowerCase().trim() }))
    } else {
      setFormvalues(d => ({ ...d, [field]: value }))
      setVerifyFormvalues(d => ({ ...d, [field]: value }))
    }
  }
  const onVerifyFormValueChange = (field: any, value: any) => {
    setVerifyFormvalues(d => ({ ...d, [field]: value }))
  }
  const CELL_COUNT = 6;
  const [value, setValue] = React.useState('');
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const validateEmail = (email: any) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    return reg.test(email);
  }
  const validateSecurityCode = (code: any) => {
    let reg = /^[0-9]{6}$/
    return reg.test(code);
  }
  const validatePassword = (password: any) => {
    let reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    return reg.test(password);
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
      <ScrollView>

        <View style={styles.container} >
          <View style={{ alignSelf: 'stretch' }}>
            <Text color={color.brand} style={styles.title}>{i18n.t('create_account_title')}</Text>
          </View>

          {!verify ? <>

            <View style={{ alignSelf: 'stretch' }}>
              <Text style={styles.explainer}>{i18n.t('create_account_explainer')}</Text>
            </View>
            <Input 
              placeholder='Email'
              style={emailValid ? styles.inputContainer : styles.invalidInputContainer}
              keyboardType='email-address'
              onChange={onFormValueChange.bind(null, 'email')}
              inputStyle={styles.input}
            />
            {
              !emailValid && 
              <InvalidText >{i18n.t('invalid_email')}</InvalidText>
            }
            <Button label={i18n.t('request_security_code')} onPress={handleSubmit} dark />
            <Button label={i18n.t('cancel')} onPress={() => navigate("Welcome")} dark secondary />
          </> : <>
            <View style={{ alignSelf: 'stretch' }}>
              <Text style={styles.explainer}>{i18n.t('security_code_explainer')}</Text>
            </View>
            <View>
              <Input
                autoFocus
                placeholder={i18n.t('security_code')}
                keyboardType={'numeric'}
                style={styles.inputContainer}
                inputStyle={styles.input}
                onChange={onVerifyFormValueChange.bind(null, 'code')}
                value={verifyValues['code']} />
              {securityCodeValid && 
                <InvalidText>{i18n.t('invalid_security_code')}</InvalidText>
              }
              <Input
                placeholder={i18n.t('form_first_name')}
                style={styles.inputContainer}
                inputStyle={styles.input}
                onChange={onVerifyFormValueChange.bind(null, 'firstname')}
                value={verifyValues['firstname']}
              />
              <Input
                placeholder={i18n.t('form_last_name')}
                style={styles.inputContainer}
                inputStyle={styles.input}
                onChange={onVerifyFormValueChange.bind(null, 'lastname')}
                value={verifyValues['lastname']}
              />
              <Input
                placeholder={i18n.t('password')}
                type={InputType.PASSWORD}
                onChange={onVerifyFormValueChange.bind(null, 'password')}
                style={styles.inputContainer}
                inputStyle={styles.input}
                value={verifyValues['password']}
              />
              {passwordValid &&
                <InvalidText>{i18n.t('password_minimum_length')}</InvalidText>
              }
            </View>
            {/* <Text>{i18n.t('password_minimum_length')}</Text> */}
            <Button label={i18n.t('signup')} onPress={handleVerifySubmit} dark />
            <Button label={i18n.t('cancel')} onPress={() => navigate("Welcome")} dark secondary />

          </>}

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flexGrow: 1,
    backgroundColor: '#4C0013',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  container: {
    marginTop: 100,
    borderRadius: 10,
    marginHorizontal: 15,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 30,
    maxWidth: 400
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: color.white,
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    marginBottom: 10
  },
  invalidInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: color.white,
    padding: 10,
    borderRadius: 5,
    borderColor: 'red',
    borderWidth: 2,
    marginBottom: 10
  },
  input: {
    fontSize: 14,
    width: 260
  },
  title: {
    fontSize: 30,
    marginVertical: 15,
    fontFamily: 'Sentient-Regular',
  },
  error: {
    color: "red"
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
});
