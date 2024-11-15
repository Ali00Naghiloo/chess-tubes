// next
import Head from 'next/head';
// layout
import DashboardLayout from '@/layouts/dashboard/DashboardLayout';
import { PATH_DASHBOARD, PATH_PAGE } from '@/routes/paths';
import { MessagesSection } from '@/sections/@dashboard/messages';

// ----------------------------------------------------------------------

const LINKS = [
  { href: PATH_PAGE.root, name: 'خانه' },
  { href: PATH_DASHBOARD.root, name: 'حساب کاربری' },
  { name: 'پیام های مدیریت' },
];

MessagesPage.getLayout = (page: React.ReactElement) => (
  <DashboardLayout breadCrumbsLink={LINKS} headerText="پیام های مدیریت">
    {page}
  </DashboardLayout>
);

// ----------------------------------------------------------------------

export default function MessagesPage() {
  return (
    <>
      <Head>
        <title>پیام های مدیریت | چس تیوبز</title>
      </Head>

      <MessagesSection />
    </>
  );
}
