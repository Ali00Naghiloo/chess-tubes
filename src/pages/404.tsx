// next
import Head from 'next/head';
// layouts
import CompactLayout from '@/layouts/compact/CompactLayout';
import dynamic from 'next/dynamic';

const Error404 = dynamic(() => import('@/sections/error404'));

// ----------------------------------------------------------------------

Page404.getLayout = (page: React.ReactElement) => <CompactLayout>{page}</CompactLayout>;

// ----------------------------------------------------------------------

export default function Page404() {
  return (
    <>
      <Head>
        <title>صفحه مورد نظر پیدا نشد - ارور ۴۰۴ |‌ چس تیوبز</title>
      </Head>
      <Error404 />
    </>
  );
}
