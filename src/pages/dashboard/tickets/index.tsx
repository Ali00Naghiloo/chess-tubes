// next
import Head from 'next/head';
// layout
import DashboardLayout from '@/layouts/dashboard/DashboardLayout';
// paths
import { PATH_DASHBOARD, PATH_PAGE } from '@/routes/paths';
// sections
import TicketsSection from '@/sections/@dashboard/tickets/TicketsSection';

// ----------------------------------------------------------------------

const LINKS = [
  { href: PATH_PAGE.root, name: 'خانه' },
  { href: PATH_DASHBOARD.root, name: 'حساب کاربری' },
  { name: 'تیکت ها' },
];

AccountPage.getLayout = (page: React.ReactElement) => (
  <DashboardLayout breadCrumbsLink={LINKS} headerText="تیکت ها">
    {page}
  </DashboardLayout>
);

// ----------------------------------------------------------------------

export default function AccountPage() {
  return (
    <>
      <Head>
        <title>تیکت ها | چس تیوبز</title>
      </Head>

      <TicketsSection />
    </>
  );
}
