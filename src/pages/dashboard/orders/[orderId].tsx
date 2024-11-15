// next
import Head from 'next/head';
// layout
import DashboardLayout from '@/layouts/dashboard/DashboardLayout';
// paths
import { PATH_DASHBOARD, PATH_PAGE } from '@/routes/paths';
// sections
import OrderSection from '@/sections/@dashboard/order/OrderSection';

// ----------------------------------------------------------------------

const LINKS = [
  { href: PATH_PAGE.root, name: 'خانه' },
  { href: PATH_DASHBOARD.root, name: 'حساب کاربری' },
  { href: PATH_DASHBOARD.orders, name: 'سفارشات' },
  { name: 'جزییات سفارش' },
];

OrderPage.getLayout = (page: React.ReactElement) => (
  <DashboardLayout breadCrumbsLink={LINKS} headerText="جزییات سفارش">
    {page}
  </DashboardLayout>
);

// ----------------------------------------------------------------------

export default function OrderPage() {
  //

  return (
    <>
      <Head>
        <title>جزییات سفارش | چس تیوبز</title>
      </Head>

      <OrderSection />
    </>
  );
}
