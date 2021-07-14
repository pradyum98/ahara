import { StyleSheet } from 'react-native';

const colors = {
  primaryA: '#1BB4A4',
  primary:'#E1BD61',
  primarySlate: '#3E4A59',
  secondary1: '#066066',
  secondary2: '#CB3C3A',
  secondary8: '#7CB9B2',
  secondary8Transparent: 'rgba(124, 185, 178, 0.15)',
  darkGreen: '#18A294',
  background: '#F7F8FA',
  white: '#FFFFFF',
  black: '#000000',
  textGrey: '#959FBE',
  dark: '#3D4144',
  darkGrey: '#3E4A59',
  success: '#28a745',
  error: '#dc3545',
  warning: '#ffc107',
  info: '#17a2b8',
  blue: '#185F8A',
  gray: '#424242',
  green: '#0D6D5E',
  lightGreen: '#58968B',
  red: '#ff4444',
  lightBlack: '#3D4144',
  darkPurple: 'rgba(61, 65, 68, 0.05)',
  lightGreenTransparent: 'rgba(124, 185, 178, 0.15)',
  blackTransparent: 'rgba(0, 0, 0, 0.05)',
  darkPurpleTransparent: 'rgba(30, 47, 101, 0.05)',
  lightWhite: '#EAECF1',
  blueTransparent: 'rgba(15, 70, 112, 0.492188)',
  lightSeaGreen: '#1BB4A4',
  seaGreenTransparent: 'rgba(27, 180, 164, 0.05)',
  veryLightGreen: '#A8C4CE',
  greyTransparent: 'rgba(230, 239, 240, 0.3)',
  whiteTransparent: 'rgba(255, 255, 255, 0.3)',
  blueGrey: '#F2F7FA',
  darkSeaGreen: '#18A294',
  whitelightTransparent: 'rgba(255, 255, 255, 0.1)',
  lightGrey: '#F7F8FA',
  seaGreenDark: '#066066',
  whiteVariant1: 'rgba(230, 239, 240, 0.5)',
  verylightSeaGreen: '#8DDAD2',
  greenTransparent: 'rgba(124, 185, 178, 0.15)',
};

export const theme = {
  spacing: {
    xTiny: 4,
    tiny: 8,
    xSmall: 12,
    small: 16,
    base: 24,
    medium: 36,
    large: 48,
    xLarge: 64,
  },
  colors,
  typography: StyleSheet.create({
    header: {
      fontSize: 21,
      fontFamily: 'Inter-Bold',
      color: colors.white,
    },
    consultHeader: {
      fontSize: 18,
      fontFamily: 'Inter-Medium',
      color: colors.black,
    },
    bold: {
      fontFamily: 'Inter-Bold',
    },
    medium: {
      fontFamily: 'Inter-Medium',
    },
    semiBold: {
      fontFamily: 'Inter-SemiBold',
    },
    regular: {
      fontFamily: 'Inter-Regular',
    },
    buttonText: {
      fontSize: 15,
      fontFamily: 'Inter-Regular',
    },
    title1: {
      fontSize: 25,
      fontFamily: 'Inter-Bold',
    },
    title2: {
      fontSize: 17,
      fontFamily: 'Inter-Bold',
    },
    title3: {
      fontSize: 15,
      fontFamily: 'Inter-Bold',
    },
    title4: {
      fontSize: 15,
      fontFamily: 'Inter-Medium',
    },
    body1: {
      fontSize: 14,
      fontFamily: 'Inter-Regular',
    },
    // Figma Typography
    title: {
      fontFamily: 'Inter-Bold',
      fontSize: 18,
    },
    header0: {
      fontFamily: 'Inter-Bold',
      fontSize: 36,
    },
    header1: {
      fontFamily: 'Inter-Bold',
      fontSize: 24,
    },
    header2: {
      fontFamily: 'Inter-Bold',
      fontSize: 16,
    },
    button: {
      fontFamily: 'Inter-Medium',
      fontSize: 16,
    },
    body: {
      fontFamily: 'Inter-Regular',
      fontSize: 14,
    },
    body2: {
      fontFamily: 'Inter-Medium',
      fontSize: 14,
    },
    emphasis: {
      fontFamily: 'Inter-Bold',
      fontSize: 14,
    },
    message: {
      fontFamily: 'Inter-Regular',
      fontSize: 18,
    },
    smallText: {
      fontFamily: 'Inter-Regular',
      fontSize: 14,
    },
    micro: {
      fontFamily: 'Inter-Regular',
      fontSize: 10,
    },
    light: {
      fontFamily: 'Inter-Light',
    },
    subtitle: {
      fontFamily: 'Inter-Bold',
      fontSize: 12,
    },
    subtitle2: {
      fontFamily: 'Inter-Regular',
      fontSize: 12,
    },
    subtitle3: {
      fontFamily: 'Inter-Medium',
      fontSize: 12,
    },
    tags: {
      fontFamily: 'Inter-Regular',
      fontSize: 11,
    },
  }),
};