// next
import Head from 'next/head';
// layout
import DashboardLayout from '@/layouts/dashboard/DashboardLayout';
// routes
import { PATH_DASHBOARD, PATH_PAGE } from '@/routes/paths';
// sections
import { RecentlySection } from '@/sections/@dashboard/recently';

// ----------------------------------------------------------------------

const LINKS = [
  { href: PATH_PAGE.root, name: 'خانه' },
  { href: PATH_DASHBOARD.root, name: 'حساب کاربری' },
  { name: 'بازدید های اخیر' },
];

RecentlyPage.getLayout = (page: React.ReactElement) => (
  <DashboardLayout breadCrumbsLink={LINKS} headerText="بازدید های اخیر">
    {page}
  </DashboardLayout>
);

// ----------------------------------------------------------------------

export default function RecentlyPage() {
  return (
    <>
      <Head>
        <title>بازدید های اخیر | چس تیوبز</title>
      </Head>

      <RecentlySection />
    </>
  );
}
