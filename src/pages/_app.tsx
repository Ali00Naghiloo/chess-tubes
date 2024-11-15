// toast styles
import 'react-toastify/dist/ReactToastify.css';

// scroll bar
import 'simplebar-react/dist/simplebar.min.css';

// global styles
import '@/theme/globals.css';

// slick-carousel
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// lazy image
import 'react-lazy-load-image-component/src/effects/blur.css';

// yet another react lightbox
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/captions.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';

// ----------------------------------------------------------------------

import { CacheProvider, EmotionCache } from '@emotion/react';
// next
import { NextPage } from 'next';
import Head from 'next/head';
import { AppProps } from 'next/app';
// toast
import { ToastContainer } from 'react-toastify';
// snackbar
import SnackbarProvider from '@/components/snackbar/SnackbarProvider';
// theme
import { ThemeProvider } from '@/theme';
// redux
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
// Hoc
import AuthHOC from '@/modules/user/hocs/AuthHOC';
// utils
import createEmotionCache from '@/utils/createEmotionCache';
// @mui
import { AdapterDateFnsJalali } from '@mui/x-date-pickers/AdapterDateFnsJalali';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { faIR } from '@mui/x-date-pickers/locales';
//
import { MotionLazyContainer } from '@/components/animate';

// ----------------------------------------------------------------------

const clientSideEmotionCache = createEmotionCache();

type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type MyAppProps = AppProps & {
  Component: NextPageWithLayout;
  emotionCache?: EmotionCache;
};

export default function App({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: MyAppProps) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <Provider store={store}>
        <MotionLazyContainer>
          <LocalizationProvider
            localeText={faIR.components.MuiLocalizationProvider.defaultProps.localeText}
            dateAdapter={AdapterDateFnsJalali}
          >
            <ThemeProvider>
              <AuthHOC>
                {' '}
                <SnackbarProvider>
                  <ToastContainer />
                  {getLayout(<Component {...pageProps} />)}
                </SnackbarProvider>
              </AuthHOC>
            </ThemeProvider>
          </LocalizationProvider>
        </MotionLazyContainer>
      </Provider>
    </CacheProvider>
  );
}
