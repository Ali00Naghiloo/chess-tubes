// next
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import Head from 'next/head';
// sections
import Verify from '@/sections/auth/verify';
// Hoc
import GuestGuard from '@/modules/user/hocs/GuestGuard';
import { PATH_AUTH } from '@/routes/paths';

// ----------------------------------------------------------------------

export default function VerifyPage() {
  return (
    <>
      <Head>
        <title>تایید حساب |‌ چس تیوبز</title>
      </Head>

      <GuestGuard>
        <Verify />
      </GuestGuard>
    </>
  );
}

// ----------------------------------------------------------------------

export const getServerSideProps: GetServerSideProps = async ({
  query,
}: GetServerSidePropsContext) => {
  if (!query.mobile) {
    return {
      redirect: { destination: PATH_AUTH.login, permanent: true },
    };
  }

  return { props: {} };
};
