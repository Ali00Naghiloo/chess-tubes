// @mui
import { Typography } from '@mui/material';
// layouts
import LoginLayout from '@/layouts/auth/authLayout';
// illustration
import { LoginIllustration } from '@/assets/illustrations';
// forms
import VerifyForm from './VerifyForm';

// ----------------------------------------------------------------------

export default function Verify() {
  return (
    <LoginLayout illustrationCom={<LoginIllustration sx={{ width: '100%' }} />}>
      <Typography color="primary" variant="h6" sx={{ my: 2 }} fontWeight="500">
        تاییدیه حساب کاربری
      </Typography>

      <Typography textAlign="center" variant="body2" fontWeight={500} sx={{ mb: 3 }}>
        به شماره همراه شما یک کد تاییدیه ارسال شده است، برای ورود به حساب خود آن را وارد کنید
      </Typography>

      <VerifyForm />
    </LoginLayout>
  );
}
