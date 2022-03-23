import Text from '@fair/components/common/Text';
import Button from '@fair/components/common/Button';
import * as React from 'react';
import View from '@fair/components/common/View';
import { KeyboardAvoidingView, StyleSheet, Platform } from 'react-native'
import { color } from '@fair/constants/Colors';
import Input from '@fair/components/common/Input';
import { useUserDataContext } from '@fair/context/UserDataContextProvider';
import i18n, { currentLocale } from 'i18n-js';


const AddressInput = ({type}) => {
  const { storeAddress } = useUserDataContext()
  const [formValues, setFormvalues] = React.useState({
    company_name: '',
    address: '',
    address2: '',
    postcode: '',
    city: '',
    state: '',
    country: ''
  })
  const onFormValueChange = (field: any, value: any) => {
    setFormvalues(d => ({ ...d, [field]: value }))
  }
  
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      enabled>
    <View style={styles.addressInputContainer}>
      <Text style={styles.explainerText}>{i18n.t('adr_explainer')}</Text>
      <Input
        autoFocus
        placeholder={i18n.t('adr_company_name')}
        onChange={onFormValueChange.bind(null, 'company_name')}
        value={formValues['company_name']}
      />
      <Input
        autoFocus
        placeholder={i18n.t('adr_address1')}
        onChange={onFormValueChange.bind(null, 'address')}
        value={formValues['address']}
      />
      <Input
        autoFocus
        placeholder={i18n.t('adr_address2')}
        onChange={onFormValueChange.bind(null, 'address2')}
        value={formValues['address2']}
      />
      <Input
        autoFocus
        placeholder={i18n.t('adr_postcode')}
        onChange={onFormValueChange.bind(null, 'postcode')}
        value={formValues['postcode']}
      />
      <Input
        autoFocus
        placeholder={i18n.t('adr_city')}
        onChange={onFormValueChange.bind(null, 'city')}
        value={formValues['city']}
      />
      <Input
        autoFocus
        placeholder={i18n.t('adr_country')}
        onChange={onFormValueChange.bind(null, 'country') }
        value={formValues['country']}
      />
      <Button label={i18n.t('adr_submit')} onPress={() => storeAddress(type, formValues)} dark />
    </View>
    </KeyboardAvoidingView>
  );
}

export default AddressInput

const styles = StyleSheet.create({
  addressInputContainer: {
    textAlign: 'right',
    textAlignVertical: 'center',
    flex: 1,
    paddingHorizontal: 20
  },
  explainerText: {
    paddingVertical: 20
  }
});