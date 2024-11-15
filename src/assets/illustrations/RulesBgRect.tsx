import { memo } from 'react';
// @mui
import { Box, BoxProps, useTheme } from '@mui/material';
//
// ----------------------------------------------------------------------

function RulesBgRect({ ...other }: BoxProps) {
  //
  const { palette } = useTheme();

  return (
    <Box {...other}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 571 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_116_113)">
          <path
            opacity="0.999"
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M132.5 -0.5C272.833 -0.5 413.167 -0.5 553.5 -0.5C561.5 2.83333 567.167 8.5 570.5 16.5C570.5 105.167 570.5 193.833 570.5 282.5C567.167 290.5 561.5 296.167 553.5 299.5C374.5 299.5 195.5 299.5 16.5 299.5C8.5 296.167 2.83333 290.5 -0.5 282.5C-0.5 232.5 -0.5 182.5 -0.5 132.5C9.64766 68.1798 45.6477 25.6798 107.5 5C115.877 2.72213 124.21 0.888795 132.5 -0.5Z"
            fill={palette.primary.main}
          />
        </g>
        <defs>
          <clipPath id="clip0_116_113">
            <rect width="571" height="300" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </Box>
  );
}

export default memo(RulesBgRect);
