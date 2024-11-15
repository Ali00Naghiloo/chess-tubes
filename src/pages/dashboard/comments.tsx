// next
import Head from 'next/head';
// layout
import DashboardLayout from '@/layouts/dashboard/DashboardLayout';
import { PATH_DASHBOARD, PATH_PAGE } from '@/routes/paths';
import { CommentSection } from '@/sections/@dashboard/comments';

// ----------------------------------------------------------------------

const LINKS = [
  { href: PATH_PAGE.root, name: 'خانه' },
  { href: PATH_DASHBOARD.root, name: 'حساب کاربری' },
  { name: 'نظرات' },
];

CommentsPage.getLayout = (page: React.ReactElement) => (
  <DashboardLayout breadCrumbsLink={LINKS} headerText="نظرات">
    {page}
  </DashboardLayout>
);

// ----------------------------------------------------------------------

export default function CommentsPage() {
  return (
    <>
      <Head>
        <title>نظرات | چس تیوبز</title>
      </Head>

      <CommentSection />
    </>
  );
}
