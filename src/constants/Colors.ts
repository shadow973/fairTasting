const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';

export enum color  {
  brand = '#4C0013',
  brandDark = '#71142D',
  brandLight = '#EBDEDE',
  brandGray = '#E4DBDE',
  heroBrand = '#821D39',
  brandContrast = '#821D39',
  lightGrey = '#F9F9F9',
  brandSuperLight ='#F29FB6',
  grey= '#414141',
  greyLight = '#E5E5E5',
  blurple= '#635BFF',
  blurple_dark= '#5851DF',
  white= '#FFFFFF',
  light_gray= '#F0F0F0',
  dark_gray= '#425466',
  slate= '#0A2540',
  text= '#414141',
  gold='#947D50',
  black='#000000'
}

export default {
  light: {
    text: '#000',
    background: '#fff',
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#fff',
    background: '#000',
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
  },
};
