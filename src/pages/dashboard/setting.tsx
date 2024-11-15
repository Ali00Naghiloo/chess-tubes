// next
import Head from 'next/head';
// layout
import DashboardLayout from '@/layouts/dashboard/DashboardLayout';
import { PATH_DASHBOARD, PATH_PAGE } from '@/routes/paths';
import { SettingSection } from '@/sections/@dashboard/setting';

// ----------------------------------------------------------------------

const LINKS = [
  { href: PATH_PAGE.root, name: 'خانه' },
  { href: PATH_DASHBOARD.root, name: 'حساب کاربری' },
  { name: 'تنظیمات حساب' },
];

SettingPage.getLayout = (page: React.ReactElement) => (
  <DashboardLayout breadCrumbsLink={LINKS} headerText="تنظیمات حساب">
    {page}
  </DashboardLayout>
);

// ----------------------------------------------------------------------

export default function SettingPage() {
  return (
    <>
      <Head>
        <title>تنظیمات حساب | چس تیوبز</title>
      </Head>

      <SettingSection />
    </>
  );
}
