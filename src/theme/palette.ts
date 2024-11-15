import { alpha, getContrastRatio } from '@mui/material/styles';

// ----------------------------------------------------------------------

export type ColorSchema = 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error';

// SETUP COLORS

declare module '@mui/material/styles/createPalette' {
  interface TypeBackground {
    neutral: string;
  }
  interface SimplePaletteColorOptions {
    lighter: string;
    darker: string;
  }
  interface PaletteColor {
    lighter: string;
    darker: string;
  }
}

declare module '@mui/material/styles' {
  interface Palette {
    footer: Palette['primary'];
    green: Palette['primary'];
    newError: Palette['primary'];
    darkPrimary: Palette['primary'];
  }
  interface PaletteOptions {
    footer: PaletteOptions['primary'];
    green: PaletteOptions['primary'];
    newError: PaletteOptions['primary'];
    darkPrimary: PaletteOptions['primary'];
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    green: true;
    newError: true;
    darkPrimary: true;
  }
}

declare module '@mui/material/TextField' {
  interface TextFieldPropsColorOverrides {
    green: true;
  }
}

declare module '@mui/material/Pagination' {
  interface PaginationPropsColorOverrides {
    darkPrimary: true;
  }
}

const GREY = {
  0: '#FFFFFF',
  100: '#FBFAF9',
  200: '#F8F6F4',
  300: '#E8E2DF',
  400: '#D5CBC4',
  500: '#AB9B91',
  600: '#816F63',
  700: '#5B4D45',
  800: '#362921',
  900: '#241B16',
};

const PRIMARY = {
  lighter: '#F2C2A8',
  light: '#D8A284',
  main: '#BE815F',
  dark: '#A46542',
  darker: '#8A4B28',
  contrastText: '#FFFFFF',
};

const DARKPRIMRY = {
  lighter: '#F2C2A8',
  light: '#D8A284',
  main: '#613e28',
  dark: '#A46542',
  darker: '#8A4B28',
  contrastText: '#FFFFFF',
};

const SECONDARY = {
  lighter: '#C8FACD',
  light: '#5BE584',
  main: '#00AB55',
  dark: '#007B55',
  darker: '#005249',
  contrastText: '#FFFFFF',
};

// const SECONDARY = {
//   lighter: '#D6E4FF',
//   light: '#84A9FF',
//   main: '#3366FF',
//   dark: '#1939B7',
//   darker: '#091A7A',
//   contrastText: '#FFFFFF',
// };

const INFO = {
  lighter: '#CAFDF5',
  light: '#61F3F3',
  main: '#00B8D9',
  dark: '#006C9C',
  darker: '#003768',
  contrastText: '#FFFFFF',
};

const SUCCESS = {
  lighter: '#D8FBDE',
  light: '#86E8AB',
  main: '#36B37E',
  dark: '#1B806A',
  darker: '#0A5554',
  contrastText: '#FFFFFF',
};

const WARNING = {
  lighter: '#FFF5CC',
  light: '#FFD666',
  main: '#FFAB00',
  dark: '#B76E00',
  darker: '#7A4100',
  contrastText: GREY[800],
};

const ERROR = {
  lighter: '#FF897D',
  light: '#FF5449',
  main: '#DE3730',
  dark: '#BA1A1A',
  darker: '#93000A',
  contrastText: '#FFFFFF',
};

const footerBase = '#3b3839';
const FOOTER = {
  // main: '#3b3839',
  main: alpha(footerBase, 1),
  light: alpha(footerBase, 0.5),
  //
  dark: alpha(footerBase, 0.9),
  lighter: alpha(footerBase, 0.4),
  darker: alpha(footerBase, 1),
  contrastText: getContrastRatio(footerBase, '#fff') > 4.5 ? '#fff' : '#111',
};

const GreenBase = '#50b848';
const GREEN = {
  // main: '#3b3839',
  main: alpha(GreenBase, 1),
  light: alpha(GreenBase, 0.5),
  //
  dark: alpha(GreenBase, 0.9),
  lighter: alpha(GreenBase, 0.4),
  darker: alpha(GreenBase, 1),
  // contrastText: getContrastRatio(GreenBase, '#fff') > 4 ? '#fff' : '#111',
  contrastText: '#FFFFFF',
};

const NewErrorBase = '#ff4b4b';
const NEWERROR = {
  // main: '#3b3839',
  main: alpha(NewErrorBase, 1),
  light: alpha(NewErrorBase, 0.5),
  //
  dark: alpha(NewErrorBase, 0.9),
  lighter: alpha(NewErrorBase, 0.4),
  darker: alpha(NewErrorBase, 1),
  // contrastText: getContrastRatio(GreenBase, '#fff') > 4 ? '#fff' : '#111',
  contrastText: '#FFFFFF',
};

const COMMON = {
  common: { black: '#000000', white: '#FFFFFF' },
  primary: PRIMARY,
  secondary: SECONDARY,
  info: INFO,
  success: SUCCESS,
  warning: WARNING,
  error: ERROR,
  grey: GREY,
  divider: alpha(GREY[500], 0.24),
  action: {
    hover: alpha(GREY[500], 0.08),
    selected: alpha(GREY[500], 0.16),
    disabled: alpha(GREY[500], 0.8),
    disabledBackground: alpha(GREY[500], 0.24),
    focus: alpha(GREY[500], 0.24),
    hoverOpacity: 0.08,
    disabledOpacity: 0.48,
  },
  footer: FOOTER,
  extra: {},
  green: GREEN,
  newError: NEWERROR,
  darkPrimary: DARKPRIMRY,
};

export default function palette(themeMode: 'light' | 'dark') {
  const light = {
    ...COMMON,
    mode: 'light',
    text: {
      primary: GREY[800],
      secondary: GREY[600],
      disabled: GREY[500],
    },
    background: { paper: '#FFFFFF', default: '#FFFFFF', neutral: GREY[200] },
    action: {
      ...COMMON.action,
      active: GREY[600],
    },
  } as const;

  const dark = {
    ...COMMON,
    mode: 'dark',
    text: {
      primary: '#FFFFFF',
      secondary: GREY[500],
      disabled: GREY[600],
    },
    background: {
      paper: GREY[800],
      default: GREY[900],
      // default: '#3B3839',
      neutral: alpha(GREY[500], 0.16),
    },
    action: {
      ...COMMON.action,
      active: GREY[500],
    },
  } as const;

  return themeMode === 'light' ? light : dark;
}
