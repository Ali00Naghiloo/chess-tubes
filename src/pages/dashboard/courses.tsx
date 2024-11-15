// next
import Head from 'next/head';
// layout
import DashboardLayout from '@/layouts/dashboard/DashboardLayout';
// routes
import { PATH_DASHBOARD, PATH_PAGE } from '@/routes/paths';
// sections
import { CoursesSection } from '@/sections/@dashboard/myCourses';

// ----------------------------------------------------------------------

const LINKS = [
  { href: PATH_PAGE.root, name: 'خانه' },
  { href: PATH_DASHBOARD.root, name: 'حساب کاربری' },
  { name: 'دوره های آموزشی من' },
];

CoursesPage.getLayout = (page: React.ReactElement) => (
  <DashboardLayout breadCrumbsLink={LINKS} headerText="دوره های آموزشی من">
    {page}
  </DashboardLayout>
);

// ----------------------------------------------------------------------

export default function CoursesPage() {
  return (
    <>
      <Head>
        <title>دوره های آموزشی من | چس تیوبز</title>
      </Head>

      <CoursesSection />
    </>
  );
}
