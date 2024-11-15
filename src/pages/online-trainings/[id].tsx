// next
import Head from 'next/head';
// layout
import MainLayout from '@/layouts/main/MainLayout';
// sections
import AuthGuard from '@/modules/user/hocs/AuthGuard';
import OnlineTrainingsSection from '@/sections/online-trainings';

// ----------------------------------------------------------------------

OnlineTrainingsPage.getLayout = (page: React.ReactElement) => (
  <AuthGuard>
    <MainLayout>{page}</MainLayout>
  </AuthGuard>
);

// ----------------------------------------------------------------------

export default function OnlineTrainingsPage() {
  return (
    <>
      <Head>
        <title>خرید | چس تیوبز</title>
      </Head>

      <OnlineTrainingsSection />
    </>
  );
}
