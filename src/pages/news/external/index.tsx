// next
import Head from 'next/head';
// layout
import MainLayout from '@/layouts/main/MainLayout';
// sections
import NewsSection from '@/sections/news/external';

// ----------------------------------------------------------------------

ExternalNewsPage.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function ExternalNewsPage() {
  return (
    <>
      <Head>
        <title>اخبار خارجی | چس تیوبز</title>
      </Head>

      <NewsSection />
    </>
  );
}
