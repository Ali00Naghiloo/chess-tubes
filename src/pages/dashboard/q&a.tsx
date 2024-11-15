// next
import Head from 'next/head';
// layout
import DashboardLayout from '@/layouts/dashboard/DashboardLayout';
// paths
import { PATH_DASHBOARD, PATH_PAGE } from '@/routes/paths';
// sections
import QuestionAndAnswersSection from '@/sections/@dashboard/q&a/QuestionAndAnswersSection';

// ----------------------------------------------------------------------

const LINKS = [
  { href: PATH_PAGE.root, name: 'خانه' },
  { href: PATH_DASHBOARD.root, name: 'حساب کاربری' },
  { name: 'پرسش و پاسخ ها' },
];

QuestionAndAnswers.getLayout = (page: React.ReactElement) => (
  <DashboardLayout breadCrumbsLink={LINKS} headerText="پرسش و پاسخ ها">
    {page}
  </DashboardLayout>
);

// ----------------------------------------------------------------------

export default function QuestionAndAnswers() {
  return (
    <>
      <Head>
        <title>پرسش و پاسخ | چس تیوبز</title>
      </Head>

      <QuestionAndAnswersSection />
    </>
  );
}
