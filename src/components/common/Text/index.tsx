import { color } from '@fair/constants/Colors';
import { brandFontFamily, brandFontSize } from '@fair/constants/Fonts'
import * as React from 'react';
import { useMediaQuery } from 'react-responsive';
import { StyleSheet, Text as RnText, TextProps as RnTextProps } from 'react-native';

interface TextProps extends React.PropsWithChildren<RnTextProps> {
  children: React.ReactNode
  color?: string | undefined,
  type?: string | ''
}

const Text = ({ children, color, style, type }: TextProps) => {
  const lg = useMediaQuery({ maxWidth: 1700 });
  const md = useMediaQuery({ maxWidth: 1400 });
  const _hero = md ? brandFontSize.h2 : lg ? brandFontSize.h1 : 90;
  const _heading = md ? brandFontSize.h3 : lg ? brandFontSize.h2 : brandFontSize.h1;
  const _text = md ? brandFontSize.h4 : lg ? brandFontSize.h3 : brandFontSize.h2;
  const fontSize = type && type === 'hero' ? _hero : type && type === 'heading' ? _heading : style && style.fontSize;
  return (
    <RnText style={[styles.base, (color && { color }), (type && {fontSize: fontSize ? fontSize : _text}), (style && style)]}>
      {children}
    </RnText>
  )
}

export default Text

const styles = StyleSheet.create({
  base: {
    color: color.text,
    fontSize: brandFontSize.base,
    fontFamily: brandFontFamily.base
  }
})