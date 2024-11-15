// next
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import Head from 'next/head';
// sections
import ResetPasswordVerify from '@/sections/auth/reset-password-verify/ResetPasswordVerify';
// Hoc
import GuestGuard from '@/modules/user/hocs/GuestGuard';
// routes
import { PATH_AUTH } from '@/routes/paths';

// ----------------------------------------------------------------------

export default function ResetPasswordPage() {
  return (
    <>
      <Head>
        <title>تغییر رمز عبور |‌ چس تیوبز</title>
      </Head>

      <GuestGuard>
        <ResetPasswordVerify />
      </GuestGuard>
    </>
  );
}

// ----------------------------------------------------------------------

export const getServerSideProps: GetServerSideProps = async ({
  query,
}: GetServerSidePropsContext) => {
  if (!(!!query.type && !!query.userInput)) {
    return {
      redirect: { destination: PATH_AUTH.login, permanent: true },
    };
  }

  return { props: {} };
};
