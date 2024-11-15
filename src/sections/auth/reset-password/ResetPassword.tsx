// @mui
import { Typography } from '@mui/material';
// layouts
import LoginLayout from '@/layouts/auth/authLayout';
// illustration
import { LoginIllustration } from '@/assets/illustrations';
// forms
import ResetPasswordForm from './resetPasswordForm';

// ----------------------------------------------------------------------

export default function ResetPassword() {
  return (
    <LoginLayout illustrationCom={<LoginIllustration sx={{ width: '100%' }} />}>
      <Typography color="primary" variant="h6" sx={{ my: 2 }} fontWeight="500">
        بازنشانی رمز عبور
      </Typography>

      <Typography textAlign="center" variant="body2" fontWeight={500} sx={{ mb: 3 }}>
        برای تغییر رمز عبور خود ، رمز عبور جدید خود را وارد کنید
      </Typography>

      <ResetPasswordForm />
    </LoginLayout>
  );
}
