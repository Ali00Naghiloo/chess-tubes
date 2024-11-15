// next
import Head from 'next/head';
// @mui
import { Container } from '@mui/material';
// layouts
import MainLayout from '@/layouts/main/MainLayout';
// sections
import { RulesAccordion, RulesTopSection } from '@/sections/rules';

// ----------------------------------------------------------------------

HomePage.getLayout = (page: React.ReactElement) => <MainLayout> {page} </MainLayout>;

// ----------------------------------------------------------------------

export default function HomePage() {
  return (
    <>
      <Head>
        <title>قوانین چس تیوبز | چس تیوبز</title>
        <meta name="description" content="صفحه قوانین چس تیوبز" />
        <meta property="og:image" content="/assets/images/og/og.png" />
      </Head>

      <Container dir="rtl" sx={{ my: 8, mb: 30 }}>
        <RulesTopSection />
        <RulesAccordion />
      </Container>
    </>
  );
}
