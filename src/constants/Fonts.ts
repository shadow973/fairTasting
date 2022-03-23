import {Platform} from 'react-native';

export enum brandFontFamily {
  base = 'Roboto_400Regular',
  h9 =  'Roboto_900Black',
  h7 =  'Roboto_700Bold',
  h5 =  'Roboto_500Medium',
  h3 = 'Roboto_300Light',
  h1 = 'Roboto_100Thin',
  iBase = 'Roboto_400Regular_Italic',
  i9 =  'Roboto_900Black_Italic',
  i7 =  'Roboto_700Bold_Italic',
  i5 =  'Roboto_500Medium_Italic',
  i3 = 'Roboto_300Light_Italic',
  i1 = 'Roboto_100Thin_Italic',
}

export enum brandFontSize {
  base = (Platform.OS == "ios" ? 16: 14),
  h1 =  30,
  h2=  20,
  h3 =  18,
  h4 =  16,
  hero = 90,
  statnumber = 64,
  stattype = 24
  
}

// Roboto_100Thin_Italic,
// Roboto_300Light_Italic,
// Roboto_400Regular_Italic,
// Roboto_500Medium_Italic,
// Roboto_700Bold_Italic,
// Roboto_900Black,
// Roboto_900Black_Italic,
// Roboto_500Medium,
// Roboto_400Regular,
// Roboto_700Bold,
// Roboto_300Light,
// Roboto_100Thin,
