import { ReactElement } from 'react';
// next
import Head from 'next/head';
// layout
import MainLayout from '@/layouts/main/MainLayout';
// sections
import OnlineCourseSection from '@/sections/OnlineCourses';

OnlineCoursesPage.getLayout = (page: ReactElement) => <MainLayout>{page}</MainLayout>;

export default function OnlineCoursesPage() {
  return (
    <>
      <Head>
        <title>دوره های آنلاین | چس تیوبز</title>
      </Head>

      <OnlineCourseSection />
    </>
  );
}
