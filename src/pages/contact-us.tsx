// next
import Head from 'next/head';
// @mui
import { Typography, Container, Stack, Box, Skeleton } from '@mui/material';
// layouts
import MainLayout from '@/layouts/main/MainLayout';
// sections
import { ContactUsSocial } from '@/sections/contact-us';
import ContactUsMainInfo from '@/sections/contact-us/ContactUsMainInfo';
import { ContactUsIllustration } from '@/assets/illustrations';
import useResponsive from '@/hooks/useResponsive';
import { dispatch, useSelector } from '@/redux/store';
import getContactTransactions from '@/modules/contact/redux/operators/getContact';
import { useEffect, useState } from 'react';

// ----------------------------------------------------------------------

HomePage.getLayout = (page: React.ReactElement) => <MainLayout> {page} </MainLayout>;

// ----------------------------------------------------------------------

export default function HomePage() {
  const { contact } = useSelector((s) => s.contact);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    dispatch(
      getContactTransactions(() => {
        setIsLoading(false);
      })
    );
  }, [dispatch]);

  const isMobile = useResponsive('down', 'sm');

  return (
    <>
      <Head>
        <title>ارتباط با ما | چس تیوبز</title>
        <meta name="description" content="صفحه اصلی چس تیوبز" />
      </Head>

      <Container dir="rtl" sx={{ my: 8 }}>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h3" color="primary" fontWeight={800}>
            تماس با ما
          </Typography>
          {isMobile && <ContactUsIllustration sx={{ width: 180 }} />}
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          {isLoading ? (
            <Box width={685}>
              <Skeleton width={685} height={30} sx={{ mt: 5 }} />
              <Skeleton width={400} height={30} />
              <Skeleton width={500} height={30} sx={{ mt: 3 }} />
              <Skeleton width={200} height={30} />
              <Skeleton width={400} height={30} sx={{ mt: 3 }} />
            </Box>
          ) : (
            <Typography
              paragraph
              sx={{
                my: 5,
                whiteSpace: 'pre-line',
              }}
              fontWeight={500}
            >
              {contact?.paragraph1}
            </Typography>
          )}
          {!isMobile && <ContactUsIllustration sx={{ width: 900 }} />}
        </Stack>

        {isLoading ? (
          <Box sx={{ display: 'flex', mt: -1, gap: 2 }}>
            <Skeleton width={220} height={45} />
            <Skeleton width={220} height={45} />
          </Box>
        ) : (
          <ContactUsSocial />
        )}

        {isLoading ? (
          <Box sx={{ mt: 7 }}>
            <Skeleton width={800} height={30} />
            <Skeleton width={220} height={30} />
          </Box>
        ) : (
          <Typography paragraph sx={{ my: 5, whiteSpace: 'pre-line' }} fontWeight={500}>
            {contact?.paragraph2}
          </Typography>
        )}

        {isLoading ? (
          <Box sx={{ mt: 4, gap: 2 }}>
            <Skeleton width={220} height={45} />
            <Skeleton width={220} height={45} />
          </Box>
        ) : (
          <ContactUsMainInfo />
        )}

        <Typography paragraph sx={{ my: 5, whiteSpace: 'pre-line' }} fontWeight={500}>
          {contact?.paragraph3}
        </Typography>
      </Container>
    </>
  );
}
