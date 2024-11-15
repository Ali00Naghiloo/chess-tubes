// next
import Head from 'next/head';
// layout
import MainLayout from '@/layouts/main/MainLayout';
// sections
import CourseSection from '@/sections/courses';

// ----------------------------------------------------------------------

CoursesPage.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function CoursesPage() {
  return (
    <>
      <Head>
        <title>دوره های آموزشی | چس تیوبز</title>
      </Head>

      <CourseSection />
    </>
  );
}
