// next
import Head from 'next/head';
// layout
import DashboardLayout from '@/layouts/dashboard/DashboardLayout';
import { PATH_DASHBOARD, PATH_PAGE } from '@/routes/paths';
import BankingSection from '@/sections/@dashboard/banking/BankingSection';

// ----------------------------------------------------------------------

const LINKS = [
  { href: PATH_PAGE.root, name: 'خانه' },
  { href: PATH_DASHBOARD.root, name: 'حساب کاربری' },
  { name: 'موجودی و تراکنش' },
];

BankingPage.getLayout = (page: React.ReactElement) => (
  <DashboardLayout breadCrumbsLink={LINKS} headerText="موجودی و تراکنش">
    {page}
  </DashboardLayout>
);

// ----------------------------------------------------------------------

export default function BankingPage() {
  return (
    <>
      <Head>
        <title>موجودی و تراکنش | چس تیوبز</title>
      </Head>

      <BankingSection />
    </>
  );
}
