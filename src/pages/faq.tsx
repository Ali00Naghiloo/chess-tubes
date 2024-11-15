// next
import Head from 'next/head';
// @mui
import {Container } from '@mui/material';
// layouts
import MainLayout from '@/layouts/main/MainLayout';
// sections
import { FaqTopSection } from '@/sections/faq';


// ----------------------------------------------------------------------

HomePage.getLayout = (page: React.ReactElement) => <MainLayout> {page} </MainLayout>;

// ----------------------------------------------------------------------

export default function HomePage() {
 
  return (
    <>
      <Head>
        <title>سوالات متداول | چس تیوبز</title>
        <meta name="description" content="صفحه سوالات متداول چس تیوبز" />
        <meta property="og:image" content="/assets/images/og/og.png" />
      </Head>

      <Container dir="rtl" sx={{ my: 8, mb: 30 }}>
      <FaqTopSection />
       
      </Container>
    </>
  );
}
