import Button from '@fair/components/common/Button';
import Input from '@fair/components/common/Input';
import Text from '@fair/components/common/Text';
import View from '@fair/components/common/View';
import { color } from '@fair/constants/Colors';
import { InputType, CapitaliseType } from '@fair/constants/Form';
import { StackScreenProps } from '@react-navigation/stack';
import * as React from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { AuthStackParamList } from '../../types';
import { useAuthContext } from '@fair/context/AuthContextProvider';
import i18n from 'i18n-js';
import { catch } from '../../../metro.config';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';



export default function SignInScreen({
  navigation,
}: StackScreenProps<AuthStackParamList, 'SignIn'>) {
  const [badcredentials, setBadcredentials] = React.useState(false)
  const { login } = useAuthContext()
  const { navigate, goBack } = useNavigation()
  const [formValues, setFormvalues] = React.useState({
    email: '',
    password: ''
  })

  const handleSubmit = async () => {
    try {
      setBadcredentials(false)
      await login(formValues)
    } catch (error) {
      setBadcredentials(true)
    }
  }

  const onFormValueChange = (field: any, value: any) => {
    setFormvalues(d => ({ ...d, [field]: value }))
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
        <View style={{ alignSelf: 'stretch' }}>
          <Text color={color.brand} style={styles.title}>{i18n.t('login')}</Text>
        </View>
        <Input
          autoFocus
          placeholder={i18n.t('email')}
          type={InputType.EMAIL}
          autoCapitalize={CapitaliseType.NONE}
          onChange={onFormValueChange.bind(null, 'email')}
          keyboardType={'email-address'}
          value={formValues['email']} />
        <Input
          placeholder={i18n.t('password')}
          type={InputType.PASSWORD}
          onChange={onFormValueChange.bind(null, 'password')}
          value={formValues['password']} />
        {badcredentials ? <>
          <View style={styles.warningView} row>
            <View>
              <Ionicons name="warning" size={20} color="red" />
            </View>
            <Text style={styles.warningText}>{i18n.t('login_failed')}</Text>
          </View>
        </> : <></>}
        <View style={{ alignSelf: 'stretch', alignItems: 'flex-end' }}>
          <Button
            label={i18n.t('forgot_password')}
            onPress={() => {
              navigation.popToTop();
              setTimeout(d => navigate('ForgotPassword'), 500)
            }}
            secondary
            dark
            underline
          />
        </View>
        <Button label={i18n.t('login')} onPress={handleSubmit} dark />
        <Button label={i18n.t('go_back')} onPress={() => navigation.popToTop()} dark secondary />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#4C0013',
    alignItems: 'center',
    //justifyContent: 'center' 
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
    minHeight: 30

  },
});
