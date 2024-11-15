// next
import Head from 'next/head';
// sections
import LoginSignup from '@/sections/auth/login-signup';
// Hoc
import GuestGuard from '@/modules/user/hocs/GuestGuard';

// ----------------------------------------------------------------------

export default function LoginSignupPage() {
  return (
    <>
      <Head>
        <title>ورود به حساب |‌ چس تیوبز</title>
      </Head>

      <GuestGuard>
        <LoginSignup />
      </GuestGuard>
    </>
  );
}
