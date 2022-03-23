import { StyleSheet } from "react-native";
import { color } from "@fair/constants/Colors"
import { brandFontFamily, brandFontSize } from '@fair/constants/Fonts';

export const text = StyleSheet.create({
	titleH3Family: {
    fontSize: brandFontSize.h2,
    fontFamily: brandFontFamily.h3,
		lineHeight: 22
  	},
	titleBaseFamily: {
		fontSize: brandFontSize.h2,
    fontFamily: brandFontFamily.base,
		lineHeight: 22
	},
	titleH9Family: {
		fontSize: brandFontSize.h2,
    fontFamily: brandFontFamily.h9,
		lineHeight: 22
	},
	mediumSizeDefaultFamily: {
		fontFamily: brandFontFamily.base,
		fontSize: brandFontSize.base,
		lineHeight: 16
	},
	mediumSizeH5Family: {
		fontFamily: brandFontFamily.h5,
		fontSize: brandFontSize.base,
		lineHeight: 16
	},
	smallSizeDefaultFamily: {
		fontFamily: brandFontFamily.base,
		fontSize: 12,
		lineHeight:14 
	},
	smallSizeH5Family: {
		fontFamily: brandFontFamily.h5,
		fontSize: 12,
		lineHeight: 14
	},
	smallSizeH9Family: {
		fontFamily: brandFontFamily.h9,
		fontSize: 12,
		lineHeight: 14
	},
  extraSizeDefaultFamily: {
    fontFamily: brandFontFamily.base,
    fontSize: 16,
    lineHeight: 18
  },
  extraSizeH5Family: {
    fontFamily: brandFontFamily.h5,
    fontSize: 16,
    lineHeight: 18
  },
  extraSizeBoldFamily: {
    fontFamily: brandFontFamily.h7,
    fontSize: 16,
    lineHeight: 18
  },
  largeSizeDefaultFamily: {
    fontFamily: brandFontFamily.base,
    fontSize: 18,
    lineHeight: 20
  },
  largeSizeH5Family: {
    fontFamily: brandFontFamily.h5,
    fontSize: 18,
    lineHeight: 20
  }
})

export const general = StyleSheet.create({
	header: {
    backgroundColor: color.brand,
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
	},
	center: {
		alignItems: 'center',
		justifyContent: 'center'
	},
})

export const border = StyleSheet.create({
	greyNonRadius: {
		borderColor: color.grey,
		borderWidth: 1,
	},
	brandNonRadius: {
		borderColor: color.brand,
		borderWidth: 1,
	},
	greySmallRadius: {
		borderColor: color.grey,
		borderWidth: 1,
		borderRadius: 5
	},
	greyLargeRadius: {
		borderColor: color.grey,
		borderWidth: 1,
		borderRadius: 20
	},
	brandLargeRadius: {
    borderColor: '#D4BAC3',
    borderWidth: 1,
    borderRadius: 20,
	},
	bottomGreyLight: {
		borderBottomColor: color.greyLight,
		borderBottomWidth: 1,
	},
	brandLeftSmallRadius: {
		borderColor: '#D4BAC3',
		borderWidth: 1,
		borderTopLeftRadius: 5,
		borderBottomLeftRadius: 5
	},
	greyLeftSmallRadius: {
		borderColor: color.grey,
		borderWidth: 1,
		borderTopLeftRadius: 5,
		borderBottomLeftRadius: 5
	},
	brandRightSmallRadius: {
		borderColor: '#D4BAC3',
		borderWidth: 1,
		borderTopRightRadius: 5,
		borderBottomRightRadius: 5
	},
	greyRightSmallRadius: {
		borderColor: color.grey,
		borderWidth: 1,
		borderTopRightRadius: 5,
		borderBottomRightRadius: 5
	}
})