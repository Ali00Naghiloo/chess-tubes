// next
import Head from 'next/head';
// layout
import MainLayout from '@/layouts/main/MainLayout';
// sections
import NewsSection from '@/sections/news/internal/NewsSection';

// ----------------------------------------------------------------------

InternalNewsPage.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function InternalNewsPage() {
  return (
    <>
      <Head>
        <title>اخبار داخلی | چس تیوبز</title>
      </Head>

      <NewsSection />
    </>
  );
}
