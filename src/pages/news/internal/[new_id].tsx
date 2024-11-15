// next
import Head from 'next/head';
// layout
import MainLayout from '@/layouts/main/MainLayout';
// sections
import { NewSection } from '@/sections/new';
// redux
import { useSelector } from '@/redux/store';

// ----------------------------------------------------------------------

InternalNewPage.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function InternalNewPage() {
  //

  const { title } = useSelector((s) => s.news.news);

  return (
    <>
      <Head>
        <title>{title} | چس تیوبز</title>
      </Head>

      <NewSection />
    </>
  );
}
