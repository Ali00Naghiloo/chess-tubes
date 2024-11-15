// next
import Head from 'next/head';
// layouts
import MainLayout from '@/layouts/main/MainLayout';
// sections
import HomeSection from '@/sections/home';

// ----------------------------------------------------------------------

HomePage.getLayout = (page: React.ReactElement) => <MainLayout> {page} </MainLayout>;

// ----------------------------------------------------------------------

export default function HomePage() {
  return (
    <>
      <Head>
        <title>صفحه اصلی | چس تیوبز</title>
        <meta name="description" content="صفحه اصلی چس تیوبز" />
        <meta property="og:image" content="/assets/images/og/og.png" />
      </Head>

      <HomeSection />
    </>
  );
}
