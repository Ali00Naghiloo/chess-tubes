import localFont from 'next/font/local';

// ----------------------------------------------------------------------

export const iranSansX = localFont({
  src: [
    {
      path: '../../public/fonts/iranSansX/woff/IRANSansXFaNum-Thin.woff',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../../public/fonts/iranSansX/woff2/IRANSansXFaNum-Thin.woff2',
      weight: '100',
      style: 'normal',
    },

    // ========================================================

    {
      path: '../../public/fonts/iranSansX/woff/IRANSansXFaNum-UltraLight.woff',
      weight: '200',
      style: 'normal',
    },

    {
      path: '../../public/fonts/iranSansX/woff2/IRANSansXFaNum-UltraLight.woff2',
      weight: '200',
      style: 'normal',
    },

    // ========================================================

    {
      path: '../../public/fonts/iranSansX/woff/IRANSansXFaNum-Light.woff',
      weight: '300',
      style: 'normal',
    },

    {
      path: '../../public/fonts/iranSansX/woff2/IRANSansXFaNum-Light.woff2',
      weight: '300',
      style: 'normal',
    },

    // ========================================================
    {
      path: '../../public/fonts/iranSansX/woff/IRANSansXFaNum-Medium.woff',
      weight: '500',
      style: 'normal',
    },

    {
      path: '../../public/fonts/iranSansX/woff2/IRANSansXFaNum-Medium.woff2',
      weight: '500',
      style: 'normal',
    },

    // ========================================================

    {
      path: '../../public/fonts/iranSansX/woff/IRANSansXFaNum-DemiBold.woff',
      weight: '600',
      style: 'normal',
    },

    {
      path: '../../public/fonts/iranSansX/woff2/IRANSansXFaNum-DemiBold.woff2',
      weight: '600',
      style: 'normal',
    },

    // ========================================================

    {
      path: '../../public/fonts/iranSansX/woff/IRANSansXFaNum-ExtraBold.woff',
      weight: '800',
      style: 'normal',
    },

    {
      path: '../../public/fonts/iranSansX/woff2/IRANSansXFaNum-ExtraBold.woff2',
      weight: '800',
      style: 'normal',
    },

    // ========================================================
    {
      path: '../../public/fonts/iranSansX/woff/IRANSansXFaNum-Black.woff',
      weight: '900',
      style: 'normal',
    },

    {
      path: '../../public/fonts/iranSansX/woff2/IRANSansXFaNum-Black.woff2',
      weight: '900',
      style: 'normal',
    },

    // ========================================================
    {
      path: '../../public/fonts/iranSansX/woff/IRANSansXFaNum-ExtraBlack.woff',
      weight: '950',
      style: 'normal',
    },

    {
      path: '../../public/fonts/iranSansX/woff2/IRANSansXFaNum-ExtraBlack.woff2',
      weight: '950',
      style: 'normal',
    },

    // ========================================================
    {
      path: '../../public/fonts/iranSansX/woff/IRANSansXFaNum-Heavy.woff',
      weight: '1000',
      style: 'normal',
    },

    {
      path: '../../public/fonts/iranSansX/woff2/IRANSansXFaNum-Heavy.woff2',
      weight: '1000',
      style: 'normal',
    },

    // ========================================================

    {
      path: '../../public/fonts/iranSansX/woff/IRANSansXFaNum-Bold.woff',
      weight: 'bold',
      style: 'normal',
    },

    {
      path: '../../public/fonts/iranSansX/woff2/IRANSansXFaNum-Bold.woff2',
      weight: 'bold',
      style: 'normal',
    },

    // ========================================================

    {
      path: '../../public/fonts/iranSansX/woff/IRANSansXFaNum-Regular.woff',
      weight: 'normal',
      style: 'normal',
    },

    {
      path: '../../public/fonts/iranSansX/woff2/IRANSansXFaNum-Regular.woff2',
      weight: 'normal',
      style: 'normal',
    },
  ],
  variable: '--font',
});

// ----------------------------------------------------------------------

export function remToPx(value: string) {
  return Math.round(parseFloat(value) * 16);
}

export function pxToRem(value: number) {
  return `${value / 16}rem`;
}

export function responsiveFontSizes({ sm, md, lg }: { sm: number; md: number; lg: number }) {
  return {
    '@media (min-width:600px)': {
      fontSize: pxToRem(sm),
    },
    '@media (min-width:900px)': {
      fontSize: pxToRem(md),
    },
    '@media (min-width:1200px)': {
      fontSize: pxToRem(lg),
    },
  };
}

// ----------------------------------------------------------------------

const typography = {
  fontFamily: iranSansX.style.fontFamily,
  fontWeightRegular: 400,
  fontWeightMedium: 600,
  fontWeightBold: 700,
  h1: {
    fontWeight: 800,
    lineHeight: 80 / 64,
    fontSize: pxToRem(40),
    ...responsiveFontSizes({ sm: 52, md: 58, lg: 64 }),
  },
  h2: {
    fontWeight: 800,
    lineHeight: 64 / 48,
    fontSize: pxToRem(32),
    ...responsiveFontSizes({ sm: 40, md: 44, lg: 48 }),
  },
  h3: {
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: pxToRem(24),
    ...responsiveFontSizes({ sm: 26, md: 30, lg: 32 }),
  },
  h4: {
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: pxToRem(20),
    ...responsiveFontSizes({ sm: 20, md: 24, lg: 24 }),
  },
  h5: {
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: pxToRem(18),
    ...responsiveFontSizes({ sm: 19, md: 20, lg: 20 }),
  },
  h6: {
    fontWeight: 700,
    lineHeight: 28 / 18,
    fontSize: pxToRem(17),
    ...responsiveFontSizes({ sm: 18, md: 18, lg: 18 }),
  },
  subtitle1: {
    fontWeight: 600,
    lineHeight: 1.5,
    fontSize: pxToRem(16),
  },
  subtitle2: {
    fontWeight: 600,
    lineHeight: 22 / 14,
    fontSize: pxToRem(14),
  },
  body1: {
    lineHeight: 1.5,
    fontSize: pxToRem(16),
  },
  body2: {
    lineHeight: 22 / 14,
    fontSize: pxToRem(14),
  },
  caption: {
    lineHeight: 1.5,
    fontSize: pxToRem(12),
  },
  overline: {
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: pxToRem(12),
    textTransform: 'uppercase',
  },
  button: {
    fontWeight: 700,
    lineHeight: 24 / 14,
    fontSize: pxToRem(14),
    textTransform: 'capitalize',
  },
} as const;

export default typography;
