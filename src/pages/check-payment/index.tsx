// next
import Head from 'next/head';
// layout
import MainLayout from '@/layouts/main/MainLayout';
// sections
import CheckPayment from '@/sections/payment';

// ----------------------------------------------------------------------

CheckoutPage.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function CheckoutPage() {
  return (
    <>
      <Head>
        <title>بررسی پرداخت | چس تیوبز</title>
      </Head>

      <CheckPayment />
    </>
  );
}
