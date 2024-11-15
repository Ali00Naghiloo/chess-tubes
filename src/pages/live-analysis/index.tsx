import { ReactElement } from 'react';
// next
import Head from 'next/head';
// layout
import MainLayout from '@/layouts/main/MainLayout';
// sections
import LiveAnalysisSection from '@/sections/LiveAnalysis';

LiveAnalysisPage.getLayout = (page: ReactElement) => <MainLayout>{page}</MainLayout>;

export default function LiveAnalysisPage() {
  return (
    <>
      <Head>
        <title>تفسیر زنده | چس تیوبز</title>
      </Head>

      <LiveAnalysisSection />
    </>
  );
}
