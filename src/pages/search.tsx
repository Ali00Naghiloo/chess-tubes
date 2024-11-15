// next
import Head from 'next/head';
// layouts
import MainLayout from '@/layouts/main/MainLayout';
// sections
import SearchSection from '@/sections/search';

// ----------------------------------------------------------------------

SearchPage.getLayout = (page: React.ReactElement) => <MainLayout> {page} </MainLayout>;

// ----------------------------------------------------------------------

export default function SearchPage() {
  return (
    <>
      <Head>
        <title>
          جست و جو میان هزاران محصول شطرنجی و دوره های آموزشی جذاب و اخبار تازه شطرنج | چس تیوبز
        </title>
        <meta name="description" content="صفحه جست و جو چس تیوبز" />
      </Head>

      <SearchSection />
    </>
  );
}
