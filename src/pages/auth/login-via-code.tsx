// next
import Head from 'next/head';
// sections
import LoginViaCode from '@/sections/auth/login-via-code';
// Hoc
import GuestGuard from '@/modules/user/hocs/GuestGuard';

// ----------------------------------------------------------------------

export default function LoginViaCodePage() {
  return (
    <>
      <Head>
        <title>ورود به حساب با پسورد |‌ چس تیوبز</title>
      </Head>

      <GuestGuard>
        <LoginViaCode />
      </GuestGuard>
    </>
  );
}
