// next
import Head from 'next/head';
// layout
import DashboardLayout from '@/layouts/dashboard/DashboardLayout';
// routes
import { PATH_DASHBOARD, PATH_PAGE } from '@/routes/paths';
// sections
import { FavSection } from '@/sections/@dashboard/fav';

// ----------------------------------------------------------------------

const LINKS = [
  { href: PATH_PAGE.root, name: 'خانه' },
  { href: PATH_DASHBOARD.root, name: 'حساب کاربری' },
  { name: 'علاقه مندی ها' },
];

FavPage.getLayout = (page: React.ReactElement) => (
  <DashboardLayout breadCrumbsLink={LINKS} headerText="علاقه مندی ها">
    {page}
  </DashboardLayout>
);

// ----------------------------------------------------------------------

export default function FavPage() {
  return (
    <>
      <Head>
        <title>علاقه مندی ها | چس تیوبز</title>
      </Head>

      <FavSection />
    </>
  );
}
