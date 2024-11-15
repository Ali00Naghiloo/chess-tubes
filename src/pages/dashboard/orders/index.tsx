// next
import Head from 'next/head';
// layout
import DashboardLayout from '@/layouts/dashboard/DashboardLayout';
// paths
import { PATH_DASHBOARD, PATH_PAGE } from '@/routes/paths';
// sections
import OrdersSection from '@/sections/@dashboard/orders/OrdersSection';

// ----------------------------------------------------------------------

const LINKS = [
  { href: PATH_PAGE.root, name: 'خانه' },
  { href: PATH_DASHBOARD.root, name: 'حساب کاربری' },
  { name: 'تاریخچه سفارشات' },
];

OrdersPage.getLayout = (page: React.ReactElement) => (
  <DashboardLayout breadCrumbsLink={LINKS} headerText="تاریخچه سفارشات">
    {page}
  </DashboardLayout>
);

// ----------------------------------------------------------------------

export default function OrdersPage() {
  return (
    <>
      <Head>
        <title>تاریخچه سفارشات | چس تیوبز</title>
      </Head>

      <OrdersSection />
    </>
  );
}
