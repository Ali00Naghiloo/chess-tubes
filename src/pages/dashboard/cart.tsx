// next
import Head from 'next/head';
// layout
import MainLayout from '@/layouts/main/MainLayout';
// sections
import { CartSection } from '@/sections/@dashboard/cart';
// HOC
import AuthGuard from '@/modules/user/hocs/AuthGuard';

// ----------------------------------------------------------------------

CartPage.getLayout = (page: React.ReactElement) => (
  <AuthGuard>
    <MainLayout>{page}</MainLayout>
  </AuthGuard>
);

// ----------------------------------------------------------------------

export default function CartPage() {
  return (
    <>
      <Head>
        <title>سبد خرید | چس تیوبز</title>
      </Head>

      <CartSection />
    </>
  );
}
