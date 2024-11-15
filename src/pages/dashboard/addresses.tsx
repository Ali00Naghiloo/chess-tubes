// next
import Head from 'next/head';
// layout
import DashboardLayout from '@/layouts/dashboard/DashboardLayout';
// routes
import { PATH_DASHBOARD, PATH_PAGE } from '@/routes/paths';
// sections
import { AddressesSection } from '@/sections/@dashboard/addresses';

// ----------------------------------------------------------------------

const LINKS = [
  { href: PATH_PAGE.root, name: 'خانه' },
  { href: PATH_DASHBOARD.root, name: 'حساب کاربری' },
  { name: 'آدرس ها' },
];

AddressesPage.getLayout = (page: React.ReactElement) => (
  <DashboardLayout breadCrumbsLink={LINKS} headerText="آدرس ها">
    {page}
  </DashboardLayout>
);

// ----------------------------------------------------------------------

export default function AddressesPage() {
  return (
    <>
      <Head>
        <title>آدرس ها | چس تیوبز</title>
      </Head>

      <AddressesSection />
    </>
  );
}
