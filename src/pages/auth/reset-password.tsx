// next
import Head from 'next/head';
// sections
import ResetPassword from '@/sections/auth/reset-password';
// Hoc
import AuthGuard from '@/modules/user/hocs/AuthGuard';

// ----------------------------------------------------------------------

export default function ResetPasswordPage() {
  return (
    <>
      <Head>
        <title>تغییر رمز عبور |‌ چس تیوبز</title>
      </Head>

      <AuthGuard>
        <ResetPassword />
      </AuthGuard>
    </>
  );
}
