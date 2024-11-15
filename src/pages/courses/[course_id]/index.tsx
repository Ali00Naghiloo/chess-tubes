// next
import Head from 'next/head';
// layout
import MainLayout from '@/layouts/main/MainLayout';
// redux
import { useSelector } from '@/redux/store';
// sections
import { CourseSection } from '@/sections/course';

// ----------------------------------------------------------------------

ProductPage.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function ProductPage() {
  const { title } = useSelector((s) => s.course.course);

  return (
    <>
      <Head>
        <title>چس تیوبز | {title}</title>
      </Head>

      <CourseSection />
    </>
  );
}
