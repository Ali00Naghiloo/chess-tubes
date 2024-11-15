// next
import Head from 'next/head';
// layout
import MainLayout from '@/layouts/main/MainLayout';
// sections
import ShopSection from '@/sections/shop/ShopSection';

// ----------------------------------------------------------------------

ShopPage.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function ShopPage() {
  return (
    <>
      <Head>
        <title>فروشگاه | چس تیوبز</title>
      </Head>

      <ShopSection />
    </>
  );
}
