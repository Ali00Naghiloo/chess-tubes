// next
import Head from 'next/head';
// layout
import MainLayout from '@/layouts/main/MainLayout';
// sections
import CheckoutSection from '@/sections/checkout';
import AuthGuard from '@/modules/user/hocs/AuthGuard';

// ----------------------------------------------------------------------

CheckoutPage.getLayout = (page: React.ReactElement) => (
  <AuthGuard>
    <MainLayout>{page}</MainLayout>
  </AuthGuard>
);

// ----------------------------------------------------------------------

export default function CheckoutPage() {
  return (
    <>
      <Head>
        <title>تکمیل سفارش | چس تیوبز</title>
      </Head>

      <CheckoutSection />
    </>
  );
}
