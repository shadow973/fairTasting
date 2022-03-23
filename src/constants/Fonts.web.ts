import { Dimensions, Platform, PixelRatio } from 'react-native';
const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
} = Dimensions.get('window');
const scale = SCREEN_WIDTH / 3000;

export function normalize(size:number) {
  const newSize = size * scale 
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize))
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
  }
}

export enum brandFontFamily {
  base = 'PTSans_400Regular',
  baseitalic = 'PTSans_400Regular_Italic',
  h1 =  'PTSans_700Bold',
  h1italic =  'PTSans_700Bold_Italic',
}

export enum brandFontSize {
  base = (Platform.OS == "ios" ? 16: 14),
  h1 =  36,
  h2=  24,
  h3 = 18,
  hero = normalize(80),
  statnumber = normalize(64),
  stattype = normalize(24)
}
