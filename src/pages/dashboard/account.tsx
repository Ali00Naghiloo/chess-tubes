// next
import Head from 'next/head';
// layout
import DashboardLayout from '@/layouts/dashboard/DashboardLayout';
import { PATH_DASHBOARD, PATH_PAGE } from '@/routes/paths';
import AccountSection from '@/sections/@dashboard/account/AccountSection';

// ----------------------------------------------------------------------

const LINKS = [
  { href: PATH_PAGE.root, name: 'خانه' },
  { href: PATH_DASHBOARD.root, name: 'حساب کاربری' },
  { name: 'اطلاعات حساب کاربری' },
];

AccountPage.getLayout = (page: React.ReactElement) => (
  <DashboardLayout breadCrumbsLink={LINKS} headerText="اطلاعات حساب کاربری">
    {page}
  </DashboardLayout>
);

// ----------------------------------------------------------------------

export default function AccountPage() {
  return (
    <>
      <Head>
        <title>اطلاعات حساب کاربری | چس تیوبز</title>
      </Head>

      <AccountSection />
    </>
  );
}
