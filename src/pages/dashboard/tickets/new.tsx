// next
import Head from 'next/head';
// layout
import DashboardLayout from '@/layouts/dashboard/DashboardLayout';
import { PATH_DASHBOARD, PATH_PAGE } from '@/routes/paths';
import NewTicketSection from '@/sections/@dashboard/new-ticket';

// ----------------------------------------------------------------------

const LINKS = [
  { href: PATH_PAGE.root, name: 'خانه' },
  { href: PATH_DASHBOARD.root, name: 'حساب کاربری' },
  { href: PATH_DASHBOARD.tickets, name: 'تیکت ها' },
  { name: 'افزودن تیکت جدید' },
];

AccountPage.getLayout = (page: React.ReactElement) => (
  <DashboardLayout breadCrumbsLink={LINKS} headerText="افزودن تیکت جدید">
    {page}
  </DashboardLayout>
);

// ----------------------------------------------------------------------

export default function AccountPage() {
  return (
    <>
      <Head>
        <title>تیکت جدید | چس تیوبز</title>
      </Head>

      <NewTicketSection />
    </>
  );
}
