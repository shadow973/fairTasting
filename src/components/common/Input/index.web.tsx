import { AntDesign, Feather } from '@expo/vector-icons';
import { color } from '@fair/constants/Colors';
import { InputType, CapitaliseType } from '@fair/constants/Form';
import React, {useState} from 'react';
import { KeyboardTypeOptions, StyleProp, StyleSheet, StyleSheetProperties, TextInput, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface InputProps {
  value?: undefined | string
  placeholder: undefined | string
  autoFocus?: undefined | boolean
  autoCapitalize?: CapitaliseType
  type?: InputType
  onChange: (value:string) => void
  onBlur?: (value:string) => void
  footer?: undefined | boolean
  web?: undefined | boolean
  left?: undefined | boolean
  keyboardType?: KeyboardTypeOptions
  review?: boolean
  textbox?: boolean
  style?: any
  inputStyle?: any
  placeholderColor?: string
}

const Input = ({value,placeholder, autoFocus,autoCapitalize, type, onChange, keyboardType, textbox, style, inputStyle, placeholderColor}:InputProps) => {

  const [focused, setFocused] = useState(false);
  const [showEye, setShowEye] = useState(true)
  return (
    <View style={[styles.container, (style&&style)]}>
      <TextInput
        autoFocus={autoFocus}
        autoCapitalize={autoCapitalize ? autoCapitalize :CapitaliseType.STANDARD}
        selectionColor={color.brand}
        style={[styles.base, (inputStyle&& inputStyle)]}
        placeholder={placeholder}
        placeholderTextColor={placeholderColor}
        onFocus={() => setFocused(true)}
        onChangeText={onChange}
        value={value}
        multiline={textbox ? true : false}
        keyboardType={keyboardType?keyboardType:'default'}
        secureTextEntry={showEye && type== InputType.PASSWORD}
      />
      { (type === InputType.PASSWORD) &&
        <TouchableOpacity onPress={() => setShowEye(!showEye)}>
          { showEye ?
            <AntDesign name="eyeo" size={14} color="black" /> : 
            <Feather name="eye-off" size={14} color="black" />
          }
        </TouchableOpacity>
      }
    </View>
  )
}

export default Input

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 10
  },
  base: {
    borderRadius: 10,
    borderWidth: 1.25,
    // borderColor: 'transparent',
    //flex:1, 
  },
  focus: {
    borderColor: color.brand
  },
  footer: {
    backgroundColor: color.brandContrast,
    color: color.brandSuperLight,
    borderBottomWidth: 1,
    borderBottomColor: color.brandSuperLight,
    borderRadius: 0,
    width: 300,
    paddingHorizontal: 10,
    height: 50,
    flex: 1
  },
  web:{
    borderColor: color.light_gray,
    color: 'black',
    backgroundColor: color.white,
    borderRadius: 5,
  },
  review:{
    borderColor: color.slate,
    borderWidth: 1,
    color: 'black',
    backgroundColor: color.white,
    borderRadius: 5,
    paddingVertical: 15,
    paddingHorizontal: 10
  },
  left: {
    marginLeft: 20,
    
  },
  textbox: {
    height: 100
  }

})