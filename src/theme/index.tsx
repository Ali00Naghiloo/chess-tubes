import { useEffect, useMemo } from 'react';
import {
  createTheme,
  CssBaseline,
  ThemeProvider as MUIThemeProvider,
  ThemeOptions,
} from '@mui/material';
import { themeService } from '@/modules/global/services';
import { useDispatch, useSelector } from '@/redux/store';
import changeTheme from '@/modules/global/redux/operators/changeTheme';
import typography from './typography';
import customShadows from './customShadows';
import palette from './palette';

// ----------------------------------------------------------------------

type Theme = 'dark' | 'light';

type Props = {
  children: React.ReactElement;
};

export function ThemeProvider({ children }: Props) {
  //
  const dispatch = useDispatch();

  const { theme: mode } = useSelector((s) => s.global);

  const themeOptions: ThemeOptions = useMemo(
    () => ({
      typography,
      palette: palette(mode),
      direction: 'rtl',
      customShadows: customShadows(mode),
    }),
    [mode]
  );
  const theme = createTheme(themeOptions);

  useEffect(() => {
    const themeMode = themeService.getTheme();

    if (themeMode !== mode) {
      dispatch(changeTheme(themeMode as Theme));
    }
  }, [dispatch, mode]);

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
}
