// next
import { useRouter } from 'next/router';
// @mui
import { Typography } from '@mui/material';
// illustration
import { LoginIllustration } from '@/assets/illustrations';
// layouts
import LoginLayout from '@/layouts/auth/authLayout';
// forms
import ResetPasswordVerifyForm from './resetPasswordVerifyForm';

// ----------------------------------------------------------------------

export default function ResetPasswordVerify() {
  const { query } = useRouter();

  return (
    <LoginLayout illustrationCom={<LoginIllustration sx={{ width: '100%' }} />}>
      <Typography color="primary" variant="h6" sx={{ my: 2 }} fontWeight="500">
        تغییر رمز عبور حساب
      </Typography>

      <Typography textAlign="center" variant="body2" fontWeight={500} sx={{ mb: 3 }}>
        به {query.type === 'email' ? 'ایمیل' : 'شماره همراه'} شما یک کد تاییدیه ارسال شده است، برای
        تغییر رمز عبور حساب خود آن را وارد کنید.
      </Typography>

      <ResetPasswordVerifyForm />
    </LoginLayout>
  );
}
