// next
import Head from 'next/head';
// sections
import ForgetPassword from '@/sections/auth/forget-password';
// Hoc
import GuestGuard from '@/modules/user/hocs/GuestGuard';

// ----------------------------------------------------------------------

export default function ForgetPasswordPage() {
  return (
    <>
      <Head>
        <title>فراموشی رمز عبور |‌ چس تیوبز</title>
      </Head>

      <GuestGuard>
        <ForgetPassword />
      </GuestGuard>
    </>
  );
}
