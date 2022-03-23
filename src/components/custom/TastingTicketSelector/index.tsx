import Text from '@fair/components/common/Text';
import * as React from 'react';
import View from '@fair/components/common/View';
import { StyleSheet } from 'react-native'
import InputSpinner from "react-native-input-spinner";
import { color } from '@fair/constants/Colors';
import { brandFontFamily, brandFontSize } from '@fair/constants/Fonts';
import { useCartContext } from '@fair/context/CartContextProvider';


const TastingTicketSelector = ({ id, product_name, product_description, unit_price, currency, minimum_quantity, shipping_required}) => {
  const { updateCartItem } = useCartContext()
  return (
    <View style={styles.border}>
      <View row justify>
        <View>
          <Text style={styles.ticketName}>{product_name}</Text>
        </View>
        <View>
          <Text style={styles.ticketPrice}>{currency} {unit_price}</Text>
        </View>
        <View style={styles.quantity}>
          <InputSpinner rounded={true} showBorder={false} buttonFontSize={20} height={30} width={90} fontSize={brandFontSize.base} fontFamily={brandFontFamily.base}
            max={10}
            min={minimum_quantity}
            step={1}
            color={color.brand}
            value={minimum_quantity}
            onChange={(quantity) => {
              updateCartItem({id, quantity, product_name, unit_price, currency, shipping_required, total_price: (quantity*unit_price)});
            }}
          />
        </View>
      </View>
      {product_description ? <>
        <View>
          <Text style={styles.ticketDescription}>{product_description}</Text>
        </View>
      </> : <></>}
    </View>
  );
}

export default TastingTicketSelector

const styles = StyleSheet.create({
  border: {
    marginHorizontal: 20,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 15,
    paddingVertical: 10
  },
  ticketName: {
    fontSize: brandFontSize.h3,
    fontFamily: brandFontFamily.h3,
    lineHeight: 35,
    paddingLeft: 20,
    color: "#000000",
    width: 150
  },
  ticketDescription: {
    fontSize: brandFontSize.base,
    fontFamily: brandFontFamily.base,
    lineHeight: 25,
    paddingHorizontal: 20,
    paddingVertical: 5,
    color: "#000000",
    minWidth: 150,
  },
  ticketPrice: {
    fontSize: brandFontSize.h3,
    fontFamily: brandFontFamily.h3,
    lineHeight: 35,
    color: "#000000",
    textAlign: "right",
    minWidth: 90,
    marginRight: 10
  },
  quantity: {
    marginRight: 20
  },
})