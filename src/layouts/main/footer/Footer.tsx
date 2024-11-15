// next
import Image from 'next/image';
import NextLink from 'next/link';
// components
import Iconify from '@/components/iconify/Iconify';
import Logo from '@/components/logo/Logo';
import SubscribeNewsletterForm from '@/components/subscribe-newsletter/SubscribeNewsletterForm';
// @mui
import {
  Box,
  Container,
  createTheme,
  Divider,
  Grid,
  IconButton,
  Link,
  Stack,
  ThemeProvider,
  Tooltip,
  Typography,
} from '@mui/material';
//
import { _socials, _socials2 } from '@/_mock/arrays';
// routes
import { PATH_PAGE } from '@/routes/paths';
// hooks
import useResponsive from '@/hooks/useResponsive';
import ChessBishop from '@/assets/icons/ChessBishop';
import palette from '@/theme/palette';

// ----------------------------------------------------------------------

const LINKS = [
  {
    headline: 'شروع آموزش',
    children: [
      { name: 'فروشگاه', href: PATH_PAGE.shop },
      { name: 'دوره های آموزشی', href: PATH_PAGE.courses },
      { name: 'سوالات متداول', href: PATH_PAGE.faqs },
    ],
  },

  {
    headline: 'ارتباط با ما',
    children: [
      { name: 'قوانین', href: PATH_PAGE.rules },
      { name: 'درباره ما', href: PATH_PAGE.about },
      { name: 'تماس با ما', href: PATH_PAGE.contact },
      
    ],
  },
];
const enamad=`<img src='https://trustseal.enamad.ir/logo.aspx?id=504342&Code=Ysmc3YsWHITR1GT6Utvzx3yqEQQXAinn' referrerpolicy='origin' style='cursor:pointer' code='Ysmc3YsWHITR1GT6Utvzx3yqEQQXAinn'
onclick=window.open('https://trustseal.enamad.ir/?id=504342&Code=Ysmc3YsWHITR1GT6Utvzx3yqEQQXAinn','target=_blank,referrerPolicy=origin')
/>`;
// ----------------------------------------------------------------------

export default function Footer() {
  //
  const isDesktop = useResponsive('up', 'md');

  const renderSmallScreenLinks = (
    <Stack
      spacing={{ xs: 1, sm: 2 }}
      direction="row"
      useFlexGap
      flexWrap="wrap"
      justifyContent="center"
    >
      <ThemeProvider theme={createTheme({ palette: palette('dark') })}>
        {LINKS.map((list) =>
          list.children.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              underline="hover"
              color="text.primary"
              sx={{ opacity: 0.7, border: 1, borderColor: 'divider', p: 0.5, borderRadius: 2 }}
            >
              {link.name}
            </Link>
          ))
        )}
      </ThemeProvider>
    </Stack>
  );

  const renderLargeScreenLinks = LINKS.map((list) => (
    <Stack key={list.headline} spacing={2} alignItems={{ xs: 'center', md: 'flex-start' }}>
      <Typography color="footer.contrastText" component="div" variant="subtitle2">
        {list.headline}
      </Typography>

      {list.children.map((link) => (
        <Link
          key={link.name}
          component={NextLink}
          href={link.href}
          color="footer.contrastText"
          variant="body2"
        >
          {link.name}
        </Link>
      ))}
    </Stack>
  ));

  return (
    <Box dir="rtl" component="footer" sx={{ position: 'relative' }} bgcolor="footer.main">
      <Divider />
      <Container sx={{ pt: 8 }}>
        <Grid
          container
          justifyContent={{
            xs: 'center',
            md: 'space-between',
          }}
          sx={{
            textAlign: {
              xs: 'center',
              md: 'left',
            },
          }}
        >
          <Grid item xs={12} sx={{ mb: 3 }}>
            <Stack
              direction="row"
              justifyContent={{ xs: 'center', md: 'space-between' }}
              alignItems="center"
            >
              <Logo sx={{ mx: { xs: 'auto', md: 'inherit', width: 220 } }} mode="dark" />
              {isDesktop && (
                <>
                  <Divider
                    sx={{
                      width: '70%',
                      borderStyle: 'dashed',
                      borderWidth: '2px',
                    }}
                  />
                  <ChessBishop sx={{ width: 100, height: 100 }} mode="dark" />
                </>
              )}
            </Stack>
          </Grid>

          <Grid item xs={10} sm={8} md={3}>
            <Typography color="footer.contrastText" variant="body2" sx={{ pr: { md: 5 } }}>
              چس تیوبز جایی برای یادگیری و تمرین شطرنج. فروشگاه، دوره‌های آموزشی و اخبار شطرنج.
              بهترین منبع برای علاقه‌مندان به شطرنج.
            </Typography>

            {!isDesktop && (
              <Stack
                direction="row"
                justifyContent={{ xs: 'center', md: 'space-between' }}
                alignItems="center"
                sx={{ my: 2 }}
              >
                <Divider
                  sx={{
                    width: { xs: '80%', sm: '90%' },
                    borderStyle: 'dashed',
                    borderWidth: '2px',
                  }}
                />

                <ChessBishop sx={{ width: 55, height: 55 }} mode="dark" />
              </Stack>
            )}

            <Stack
              spacing={1}
              direction="row"
              justifyContent={{ xs: 'center', md: 'flex-start' }}
              sx={{
                mt: 5,
                mb: { xs: 5, md: 0 },
              }}
            >
              {_socials.map((social) => (
                <Tooltip key={social.name} title={social.name}>
                  <IconButton key={social.name}>
                    <Iconify icon={social.icon} />
                  </IconButton>
                </Tooltip>
              ))}
              {_socials2.map((social) => (
                <Tooltip key={social.name} title={social.name}>
                  <IconButton key={social.name}>
                    <Image alt={social.name} width={25} height={25} src={social.icon} />
                  </IconButton>
                </Tooltip>
              ))}
            </Stack>
          </Grid>

          <Grid item xs={12} md={7}>
            <Stack
              spacing={5}
              justifyContent="space-between"
              direction={{ xs: 'column', md: 'row' }}
            >
              {isDesktop ? renderLargeScreenLinks : renderSmallScreenLinks}
              <Divider variant="middle" />
              <Stack spacing={1} alignItems="flex-start" sx={{ px: { sm: 14, md: 0, xs: 0 } }}>
                <Typography color="footer.contrastText" component="div" variant="subtitle2">
                  خبرنامه
                </Typography>

                <ThemeProvider theme={createTheme({ palette: palette('dark') })}>
                  <SubscribeNewsletterForm />
                </ThemeProvider>
              </Stack>
            </Stack>
          </Grid>
        </Grid>

        <Divider variant="middle" sx={{ my: 6 }} />

        <Stack
          justifyContent="space-between"
          alignItems="center"
          sx={{ flexDirection: { md: 'row', xs: 'column-reverse' } }}
        >
          <Typography
            variant="caption"
            color="footer.contrastText"
            component="div"
            sx={{
              mt: { md: 10, xs: 2 },
              pb: 3,
              textAlign: { xs: 'center', md: 'left' },
            }}
          >
            © 2023-2024 . همه حقوق مادی و معنوی سایت متعلق به چس تیوبز می باشد و هرگونه کپی برداری
            پیگرد قانونی دارد
          </Typography>
          <Box dangerouslySetInnerHTML={{ __html: enamad }} />
        </Stack>
      </Container>
    </Box>
  );
}
