// next
import Head from 'next/head';
// layout
import DashboardLayout from '@/layouts/dashboard/DashboardLayout';

// ----------------------------------------------------------------------

DashboardPage.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function DashboardPage() {
  return (
    <>
      <Head>
        <title>اطلاعات حساب کاربری | چس تیوبز</title>
      </Head>

      {/*  */}
    </>
  );
}
