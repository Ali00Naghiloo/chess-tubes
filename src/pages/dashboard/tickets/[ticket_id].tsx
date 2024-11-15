// next
import Head from 'next/head';
// layout
import DashboardLayout from '@/layouts/dashboard/DashboardLayout';
// paths
import { PATH_DASHBOARD, PATH_PAGE } from '@/routes/paths';
// sections
import TicketIdSection from '@/sections/@dashboard/ticket-id/TicketIdSection';

// ----------------------------------------------------------------------

const LINKS = [
  { href: PATH_PAGE.root, name: 'خانه' },
  { href: PATH_DASHBOARD.root, name: 'حساب کاربری' },
  { href: PATH_DASHBOARD.tickets, name: 'تیکت ها' },
  // { name: 'تیکت' },
];

AccountPage.getLayout = (page: React.ReactElement) => (
  <DashboardLayout breadCrumbsLink={LINKS} headerText="تیکت">
    {page}
  </DashboardLayout>
);

// ----------------------------------------------------------------------

export default function AccountPage() {
  return (
    <>
      <Head>
        <title>تیکت | چس تیوبز</title>
      </Head>

      <TicketIdSection />
    </>
  );
}
