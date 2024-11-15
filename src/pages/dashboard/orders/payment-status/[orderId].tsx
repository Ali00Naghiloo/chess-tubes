// next
import Head from 'next/head';
// layout
import MainLayout from '@/layouts/main/MainLayout';
// sections
import OrderPaymentStatusSection from '@/sections/@dashboard/payment-status/';

// ----------------------------------------------------------------------

OrderPaymentStatusPage.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function OrderPaymentStatusPage() {
  //

  return (
    <>
      <Head>
        <title>جزییات سفارش | چس تیوبز</title>
      </Head>

      <OrderPaymentStatusSection />
    </>
  );
}
