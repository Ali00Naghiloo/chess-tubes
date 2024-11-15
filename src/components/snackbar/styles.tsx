// @Mui
import { useTheme } from '@mui/material/styles';
import { GlobalStyles } from '@mui/material';

// ----------------------------------------------------------------------

export default function StyledNotistack() {
  const theme = useTheme();

  const isLight = theme.palette.mode === 'light';

  const inputGlobalStyles = (
    <GlobalStyles
      styles={{
        '.notistack-MuiContent': {
          width: '100%',
          padding: theme.spacing(1),
          margin: theme.spacing(0.25, 0),
          boxShadow: theme.customShadows.z8,
          borderRadius: theme.shape.borderRadius,
          justifyContent: 'space-between',
          color: isLight ? theme.palette.common.white : theme.palette.grey[800],
          backgroundColor: isLight ? theme.palette.grey[900] : theme.palette.common.white,
          '&.notistack-MuiContent-success, &.notistack-MuiContent-error, &.notistack-MuiContent-warning, &.notistack-MuiContent-info':
            {
              color: theme.palette.text.primary,
              backgroundColor: theme.palette.background.paper,
            },
          [theme.breakpoints.up('md')]: {
            minWidth: 240,
          },
        },
        '.go946087465': {
          padding: '0 !important',
          fontWeight: theme.typography.fontWeightMedium,
        },
        '.go703367398': {
          marginRight: 0,
          marginLeft: 0,
          padding: 0,
          color: theme.palette.action.active,
        },
      }}
    />
  );

  return inputGlobalStyles;
}
