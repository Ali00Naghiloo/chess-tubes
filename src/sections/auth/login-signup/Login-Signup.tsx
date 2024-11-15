// @mui
import { Typography } from '@mui/material';
// layouts
import LoginLayout from '@/layouts/auth/authLayout';
// illustrations
import { LoginIllustration } from '@/assets/illustrations';
// form
import LoginSignupForm from './login-signupForm';

// ----------------------------------------------------------------------

export default function LoginSignup() {
  return (
    <LoginLayout illustrationCom={<LoginIllustration sx={{ width: '100%' }} />}>
      <Typography color="primary" variant="h6" sx={{ my: 2 }} fontWeight="500">
        ورود یا ثبت نام
      </Typography>

      <Typography textAlign="center" variant="body2" fontWeight={500} sx={{ mb: 3 }}>
        درصورتی که برای بار اول می خواهید وارد سایت شوید ،‌ شماره موبایل خود را وارد کنید
      </Typography>

      <LoginSignupForm />
    </LoginLayout>
  );
}
