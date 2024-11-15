import { memo } from 'react';
// @mui
import { Box, BoxProps, useTheme } from '@mui/material';
//
// ----------------------------------------------------------------------

function ChessAnalyzeIcon({ ...other }: BoxProps) {
  //
  const { palette } = useTheme();

  const isDark = palette.mode === 'dark';

  return (
    <Box {...other}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 55 54"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_12_28905)">
          <path
            d="M14.1 37.5C14.545 38.509 15.2731 39.3673 16.196 39.9707C17.119 40.5742 18.1972 40.897 19.3 40.9H48.2C49.7209 40.8738 51.1705 40.2511 52.2367 39.1663C53.3029 38.0814 53.9002 36.6211 53.9 35.1V6.3C53.9002 4.77891 53.3029 3.31862 52.2367 2.23374C51.1705 1.14885 49.7209 0.526226 48.2 0.5H19.3C18.543 0.499884 17.7935 0.650566 17.0954 0.94325C16.3972 1.23594 15.7643 1.66476 15.2337 2.20469C14.7031 2.74462 14.2853 3.38484 14.0048 4.08798C13.7243 4.79112 13.5867 5.54309 13.6 6.3V19.6"
            stroke={isDark ? palette.primary.lighter : palette.primary.darker}
            stroke-miterlimit="10"
          />
          <path
            d="M48.1 3.79999H19.3C17.9193 3.79999 16.8 4.91928 16.8 6.29999V35.12C16.8 36.5007 17.9193 37.62 19.3 37.62H48.1C49.4808 37.62 50.6 36.5007 50.6 35.12V6.29999C50.6 4.91928 49.4808 3.79999 48.1 3.79999Z"
            stroke={isDark ? palette.primary.lighter : palette.primary.darker}
            stroke-miterlimit="10"
          />
          <path
            d="M42.2 3.79999H33.7V12.25H42.2V3.79999Z"
            stroke={isDark ? palette.primary.lighter : palette.primary.darker}
            stroke-miterlimit="10"
          />
          <path
            d="M25.3 12.2H16.8V6.19999C16.8259 5.55443 17.1006 4.94395 17.5667 4.49652C18.0328 4.04909 18.654 3.79947 19.3 3.79999H25.3V12.2Z"
            stroke={isDark ? palette.primary.lighter : palette.primary.darker}
            stroke-miterlimit="10"
          />
          <path
            d="M50.7 12.2H42.2V20.65H50.7V12.2Z"
            stroke={isDark ? palette.primary.lighter : palette.primary.darker}
            stroke-miterlimit="10"
          />
          <path
            d="M33.8 12.2H25.3V20.65H33.8V12.2Z"
            stroke={isDark ? palette.primary.lighter : palette.primary.darker}
            stroke-miterlimit="10"
          />
          <path
            d="M42.2 20.7H33.7V29.15H42.2V20.7Z"
            stroke={isDark ? palette.primary.lighter : palette.primary.darker}
            stroke-miterlimit="10"
          />
          <path
            d="M25.3 20.7H16.8V29.15H25.3V20.7Z"
            stroke={isDark ? palette.primary.lighter : palette.primary.darker}
            stroke-miterlimit="10"
          />
          <path
            d="M48.2 37.6H42.2V29.1H50.5999V35.1C50.6005 35.746 50.3508 36.3672 49.9034 36.8333C49.456 37.2994 48.8455 37.5741 48.2 37.6Z"
            stroke={isDark ? palette.primary.lighter : palette.primary.darker}
            stroke-miterlimit="10"
          />
          <path
            d="M33.8 29.1H25.3V37.55H33.8V29.1Z"
            stroke={isDark ? palette.primary.lighter : palette.primary.darker}
            stroke-miterlimit="10"
          />
          <path
            d="M21.1001 8L46.4001 33.4"
            stroke={isDark ? palette.primary.lighter : palette.primary.darker}
            stroke-miterlimit="10"
          />
          <path
            d="M38 24.9L46.4 16.5"
            stroke={isDark ? palette.primary.lighter : palette.primary.darker}
            stroke-miterlimit="10"
          />
          <path
            d="M38 26.7C38.9941 26.7 39.7999 25.8941 39.7999 24.9C39.7999 23.9059 38.9941 23.1 38 23.1C37.0058 23.1 36.2 23.9059 36.2 24.9C36.2 25.8941 37.0058 26.7 38 26.7Z"
            fill={isDark ? palette.primary.lighter : palette.primary.darker}
          />
          <path
            d="M44.8 16H46.9001V18"
            stroke={isDark ? palette.primary.lighter : palette.primary.darker}
            stroke-miterlimit="10"
            stroke-linecap="round"
          />
          <path
            d="M46.8 31.9V33.9H44.8"
            stroke={isDark ? palette.primary.lighter : palette.primary.darker}
            stroke-miterlimit="10"
            stroke-linecap="round"
          />
          <path
            d="M20.6001 9.6V7.5H22.6001"
            stroke={isDark ? palette.primary.lighter : palette.primary.darker}
            stroke-miterlimit="10"
            stroke-linecap="round"
          />
          <path
            d="M22.2998 41.2C21.6462 43.5528 20.2846 45.6475 18.3998 47.2C17.4391 47.0684 16.4674 47.0349 15.4998 47.1C12.5108 47.4347 9.49562 47.4682 6.49984 47.2C4.54975 45.7069 3.1727 43.5883 2.59984 41.2C2.00356 38.9501 1.94636 36.5913 2.43287 34.3151C2.91938 32.0389 3.93589 29.9096 5.39984 28.1C6.81403 26.2848 8.50066 24.6993 10.3998 23.4C9.82962 22.9226 9.47241 22.2383 9.40677 21.4975C9.34113 20.7567 9.57245 20.0202 10.0498 19.45C10.5272 18.8798 11.2116 18.5226 11.9524 18.4569C12.6931 18.3913 13.4296 18.6226 13.9998 19.1C14.2861 19.2488 14.5342 19.4614 14.725 19.7216C14.9157 19.9817 15.044 20.2823 15.0998 20.6C14.6211 21.3746 14.1871 22.1759 13.7998 23L13.2998 24.1C11.5283 28.4126 10.6441 33.038 10.6998 37.7H14.0998C13.9876 33.3665 14.8416 29.0624 16.5998 25.1C17.6085 25.991 18.5448 26.9607 19.3998 28H19.4998C20.9379 29.8434 21.9374 31.9899 22.4226 34.277C22.9077 36.5641 22.8657 38.9316 22.2998 41.2Z"
            fill={isDark ? palette.primary.lighter : palette.primary.darker}
          />
          <path
            d="M22.3 41.2C21.6464 43.5528 20.2848 45.6475 18.4 47.2C17.447 47.4734 16.4319 47.4384 15.5 47.1C26.1 40.2 19.5 28.2 19.4 28H19.5C20.9381 29.8434 21.9376 31.9899 22.4227 34.277C22.9078 36.5641 22.8659 38.9316 22.3 41.2Z"
            fill={isDark ? palette.primary.light : palette.primary.dark}
          />
          <path
            d="M15.0998 20.6C14.6211 21.3746 14.1871 22.1759 13.7998 23L13.2998 24.1C11.5283 28.4126 10.644 33.038 10.6998 37.7C7.3998 31.5 12.1998 26.1 13.5998 23C14.1987 21.7906 14.3407 20.4057 13.9998 19.1C14.286 19.2487 14.5342 19.4614 14.7249 19.7215C14.9157 19.9817 15.044 20.2823 15.0998 20.6Z"
            fill={isDark ? palette.primary.light : palette.primary.dark}
          />
          <path
            d="M11.8 19.8C11.8 19.7 11.8 19.6 11.7 19.6C11.6 19.6 10.9 19.8 10.7 20C10.5199 20.1802 10.3887 20.4032 10.3187 20.6482C10.2487 20.8931 10.2423 21.1519 10.3 21.4C10.3749 21.606 10.5154 21.7817 10.7 21.9C10.9 21.9 11.1 22 11.2 21.8H11.4C11.5 21.4 11.7 21 11.8 20.7C11.9 20.4 11.9 20 11.8 19.8Z"
            fill={isDark ? palette.primary.light : palette.primary.dark}
          />
          <path
            d="M23.3999 49.3L23.1999 49C22.9727 48.6612 22.663 48.3859 22.2999 48.2C21.6465 47.6506 20.8473 47.3032 19.9999 47.2L18.3999 47L15.4999 46.8C12.4999 46.7 9.49988 46.8 6.49988 47L4.79988 47.2C3.55572 47.4079 2.42358 48.0447 1.59988 49L1.39988 49.3C0.809056 50.0755 0.492488 51.0252 0.499883 52V53.7H24.2999V52C24.3073 51.0252 23.9907 50.0755 23.3999 49.3Z"
            fill={isDark ? palette.primary.lighter : palette.primary.darker}
          />
          <path
            d="M23.1999 49C16.0054 48.6001 8.7943 48.6001 1.59985 49C2.42355 48.0447 3.55569 47.4079 4.79985 47.2L6.49985 47C9.49985 46.8 12.4999 46.7 15.4999 46.8L18.3999 47L19.9999 47.2C20.8473 47.3032 21.6464 47.6506 22.2999 48.2C22.663 48.3859 22.9727 48.6612 23.1999 49Z"
            fill={isDark ? palette.primary.light : palette.primary.dark}
          />
          <path
            d="M3.59977 37.6C3.54665 38.7637 3.75154 39.9247 4.19977 41C4.52022 41.8056 4.92231 42.5763 5.39977 43.3C5.78025 43.9324 6.252 44.5053 6.79977 45C6.92376 45.14 7.07875 45.249 7.25238 45.3185C7.426 45.3879 7.61345 45.4158 7.79977 45.4C8.10802 45.3747 8.39462 45.2314 8.59977 45C8.86565 44.7495 9.07086 44.4417 9.19977 44.1C9.25867 43.6129 9.15308 43.1201 8.89977 42.7L7.89977 41.6C6.93578 40.6792 6.09542 39.6372 5.39977 38.5L4.39977 36.5L4.09977 36.3C3.89977 36.2 3.79977 36.4 3.69977 36.6C3.59977 36.8 3.59977 37.1 3.59977 37.4V37.6Z"
            fill={isDark ? palette.primary.light : palette.primary.dark}
          />
        </g>
        <defs>
          <clipPath id="clip0_12_28905">
            <rect width="53.9" height="53.7" fill="white" transform="translate(0.5)" />
          </clipPath>
        </defs>
      </svg>
    </Box>
  );
}

export default memo(ChessAnalyzeIcon);
