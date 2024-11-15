import { useState } from 'react';
import * as Yup from 'yup';
// next
import { useRouter } from 'next/router';
// toast
import { toast } from 'react-toastify';
// from
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Box, Button, IconButton, InputAdornment, Link, Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// icons
import Iconify from '@/components/iconify/Iconify';
// redux
import { useDispatch, useSelector } from '@/redux/store';
// operators
import loginViaCode from '@/modules/user/redux/operators/loginViaCode';
// components
import FormProvider, { RHFTextField } from '@/components/hook-form';
// routes
import { PATH_AUTH } from '@/routes/paths';

// ----------------------------------------------------------------------

type FormValuesProps = {
  phoneNumber: string;
  password: string;
  afterSubmit?: string;
};

export default function LoginViaCodeForm() {
  //
  const { isLoading } = useSelector((s) => s.user);

  const { push, reload } = useRouter();

  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);

  const loginSignupSchema = Yup.object().shape({
    phoneNumber: Yup.string().required('شماره تلفن، ایمیل و یا نام کاربری خود را وارد کنید'),
    password: Yup.string()
      .required('رمز عبور برای ورود ضروری است')
      .min(6, 'رمز عبور باید حداقل ۶ کلمه باشد'),
  });

  const defaultValues: FormValuesProps = {
    phoneNumber: '',
    password: '',
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(loginSignupSchema),
    defaultValues,
  });

  const { reset, setError, handleSubmit } = methods;

  const successCallback = (msg: string) => {
    toast.success(msg ?? 'با موفقیت وارد شدید');

    push('/');

    //  * Reload to load the user data in Redux!
    reload();
  };

  const failureCallback = (msg: string) => {
    toast.error(msg ?? 'یه مشکلی پیش اومده');
  };

  const onSubmit = (data: FormValuesProps) => {
    try {
      dispatch(loginViaCode(data.phoneNumber, data.password, successCallback, failureCallback));
    } catch (err) {
      reset();
      setError('afterSubmit', { ...err, message: err.message || err });
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <RHFTextField
        shrinkLabel
        name="phoneNumber"
        // disableError
        sx={{ my: 3 }}
        inputProps={{ dir: 'ltr' }}
        label={
          <Stack direction="row" alignContent="center" justifyContent="center">
            آدرس ایمیل یا شماره همراه
            <Iconify icon="eva:smartphone-fill" sx={{ mr: 0.4 }} />
          </Stack>
        }
      />

      <RHFTextField
        name="password"
        // disableError
        shrinkLabel
        sx={{ mb: 1 }}
        inputProps={{ dir: 'ltr' }}
        type={showPassword ? 'text' : 'password'}
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
              </IconButton>
            </InputAdornment>
          ),
        }}
        label={
          <Stack direction="row" alignContent="center" justifyContent="center">
            رمز عبور
            <Iconify icon="eva:unlock-fill" sx={{ mr: 0.4 }} />
          </Stack>
        }
      />

      <Box dir="rtl">
        <Link href={PATH_AUTH.forgetPassword} underline="hover" variant="caption" color="gray">
          رمز عبور خود را فراموش کرده اید؟
        </Link>
      </Box>

      <Stack direction="row" sx={{ mt: 6 }} justifyContent="space-between">
        <LoadingButton variant="contained" disableElevation loading={isLoading} type="submit">
          ورود به حساب
        </LoadingButton>
        <Button variant="text" href={PATH_AUTH.login}>
          ورود با رمز یکبار مصرف
        </Button>
      </Stack>
    </FormProvider>
  );
}
