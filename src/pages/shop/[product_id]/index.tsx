// next
import Head from 'next/head';
// layout
import MainLayout from '@/layouts/main/MainLayout';
// sections
import ProductSection from '@/sections/product/ProductSection';
import { useSelector } from '@/redux/store';

// ----------------------------------------------------------------------

ProductPage.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function ProductPage() {
  //

  const { title } = useSelector((s) => s.product.product);

  return (
    <>
      <Head>
        <title>{title !== '' ? title : 'فروشگاه اینترنتی چس تیوبز'} | چس تیوبز</title>
      </Head>

      <ProductSection />
    </>
  );
}
