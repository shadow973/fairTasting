import Text from '@fair/components/common/Text';
import Button from '@fair/components/common/Button';
import * as React from 'react';
import View from '@fair/components/common/View';
import Checkbox from 'expo-checkbox';
import Logo from '@fair/components/common/Logo';
import { KeyboardAvoidingView, StyleSheet, Platform, TouchableOpacity, Image, TextInput } from 'react-native'
import { color } from '@fair/constants/Colors';
import Input from '@fair/components/common/Input';
import { useUserDataContext } from '@fair/context/UserDataContextProvider';
import i18n, { currentLocale } from 'i18n-js';
import { AntDesign } from '@expo/vector-icons';
import { brandFontFamily } from '@fair/constants/Fonts';
import { useMediaQuery } from 'react-responsive';

interface RegisterProps {
  username: string;
  email: string;
  password: string;
}

interface RegisterModalProps {
  onRegisterFormValueChange: Function;
  formRegister: RegisterProps;
  agreeTerms: boolean | false;
  setAgreeTerms: Function;
  setShowRegisterForm: Function;
  setShowSignInModal: Function;
  handleSubmit: Function;
}

const RegisterModal = ({ onRegisterFormValueChange, formRegister, agreeTerms, setAgreeTerms, setShowRegisterForm, setShowSignInModal, handleSubmit }: RegisterModalProps) => {
  const modal_xxs = useMediaQuery({ maxWidth: 650 });

  return (
    <View style={[styles.modalView, { width: modal_xxs ? 500 : 536 }]}>
      <Logo style={{ height: 40 }} />
      <TouchableOpacity style={{ position: 'absolute', top: 10, right: 10 }} onPress={() => setShowSignInModal(false)}>
        <AntDesign name="close" color="#91868A" size={20} />
      </TouchableOpacity>
      <Text style={{ fontFamily: brandFontFamily.h2, marginTop: 35, fontSize: 18 }} type='text'>Create an account using</Text>
      <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', width: '95%', marginVertical: 25 }}>
        <TouchableOpacity>
          <Image source={require('../../../../assets/images/google_login.png')} style={{ height: 50, width: 215, resizeMode: 'contain' }} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={require('../../../../assets/images/facebook_login.png')} style={{ height: 50, width: 215, resizeMode: 'contain' }} />
        </TouchableOpacity>
      </View>
      <Text style={{ fontFamily: brandFontFamily.h2, fontSize: 16 }} type='text'>
        Or use your email for registration
      </Text>
      <View style={{ marginTop: 20, width: '100%', }}>
        <TextInput
          autoFocus
          placeholder="Username"
          onChange={onRegisterFormValueChange.bind(null, 'username')}
          value={formRegister['username']}
          style={[styles.becomeTesterInput, { width: '100%', marginLeft: 0 }]}
        />
      </View>
      <View style={{ marginTop: 20, width: '100%', }}>
        <TextInput
          autoFocus
          placeholder="Email"
          onChange={onRegisterFormValueChange.bind(null, 'email')}
          value={formRegister['email']}
          style={[styles.becomeTesterInput, { width: '100%', marginLeft: 0 }]}
        />
      </View>
      <View style={{ marginTop: 20, width: '100%', }}>
        <TextInput
          autoFocus
          placeholder="Password"
          onChange={onRegisterFormValueChange.bind(null, 'password')}
          value={formRegister['password']}
          style={[styles.becomeTesterInput, { width: '100%', marginLeft: 0 }]}
        />
      </View>
      <View style={{ marginTop: 20, width: '100%' }}>
        <View style={{ flexDirection: 'row' }}>
          <Checkbox
            value={agreeTerms}
            onValueChange={setAgreeTerms}
            color={agreeTerms ? "#71142D" : "#E5E5E5"}
          />
          <Text style={{ fontFamily: brandFontFamily.h2, fontSize: 14, marginLeft: 10 }} type='text'>
            I agree to the terms of service
          </Text>
        </View>
      </View>
      <View style={{ width: '100%', marginTop: 20 }}>
        <Button dark onPress={() => handleSubmit()} label="Register" />
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', marginTop: 35 }}>
        <Text style={{ fontFamily: brandFontFamily.h2, fontSize: 16, marginLeft: 10 }} type='text'>
          Already a member?
        </Text>
        <TouchableOpacity onPress={() => setShowRegisterForm(false)}>
          <Text style={{ fontFamily: brandFontFamily.h1, fontSize: 16, marginLeft: 10, color: '#947D50' }} type='text'>
            Log in
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default RegisterModal

const styles = StyleSheet.create({
  becomeTesterInput: {
    width: '30%',
    flexDirection: 'row',
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#F0F0F0',
    marginHorizontal: '2%',
  },
  modalView: {
    margin: 20,
    width: 536,
    backgroundColor: "white",
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});