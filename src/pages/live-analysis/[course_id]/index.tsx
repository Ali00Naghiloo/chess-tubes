// next
import Head from 'next/head';
// layout
import MainLayout from '@/layouts/main/MainLayout';
// redux
import { useSelector } from '@/redux/store';
// sections
import { OnlineCourseSection } from '@/sections/onlineCourse';

// ----------------------------------------------------------------------

ProductPage.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function ProductPage() {
  const { title } = useSelector((s) => s.onlineCourse.course);

  return (
    <>
      <Head>
        <title>چس تیوبز | {title}</title>
      </Head>

      <OnlineCourseSection />
    </>
  );
}
