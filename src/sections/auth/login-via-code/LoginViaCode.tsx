// @mui
import { Typography } from '@mui/material';
// layouts
import LoginLayout from '@/layouts/auth/authLayout';
// illustrations
import { LoginV2Illustration } from '@/assets/illustrations';
// forms
import LoginViaCodeForm from './loginViaCodeForm';

// ----------------------------------------------------------------------

export default function LoginViaCode() {
  return (
    <LoginLayout
      illustrationCom={
        <LoginV2Illustration sx={{ width: '100%', borderRadius: 20, overflow: 'hidden' }} />
      }
    >
      <Typography color="primary" variant="h6" sx={{ my: 2 }} fontWeight="500">
        ورود با کلمه عبور
      </Typography>

      <Typography textAlign="center" variant="body2" fontWeight={500} sx={{ mb: 3 }}>
        نام کاربری یا ایمیل به همراه کلمه عبور خود را چنانچه قبلا در سایت ثبت نموده اید، وارد نمایید
        و در غیر این صورت با شماره همراه و رمز یکبار مصرف وارد شوید
      </Typography>

      <LoginViaCodeForm />
    </LoginLayout>
  );
}
