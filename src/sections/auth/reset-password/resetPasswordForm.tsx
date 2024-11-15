import { useState } from 'react';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
// next
import { useRouter } from 'next/router';
// from
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Button, IconButton, InputAdornment, Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// icons
import Iconify from '@/components/iconify/Iconify';
// redux
import { useDispatch, useSelector } from '@/redux/store';
// operators
import resetPassword from '@/modules/user/redux/operators/resetPassword';
// components
import FormProvider, { RHFTextField } from '@/components/hook-form';
// routes
import { PATH_AUTH } from '@/routes/paths';
import { PATH_AFTER_LOGIN } from '@/config-global';

// ----------------------------------------------------------------------

type FormValuesProps = {
  password: string;
  repeatPassword: string;
  afterSubmit?: string;
};

export default function ResetPasswordForm() {
  //
  const { isLoading } = useSelector((s) => s.user);

  const { push } = useRouter();

  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);

  const [showRepeatPassword, setRepeatShowPassword] = useState(false);

  const loginSignupSchema = Yup.object().shape({
    password: Yup.string()
      .required('رمز عبور جدید خود را وارد کنید')
      .min(6, 'رمز عبور باید حداقل ۶ کلمه باشد'),
    repeatPassword: Yup.string()
      .required('رمز عبور جدید خود را وارد کنید')
      .min(6, 'رمز عبور باید حداقل ۶ کلمه باشد')
      .oneOf([Yup.ref('password')], 'رمز عبور و تکرار ان باید مشابه باشند'),
  });

  const defaultValues: FormValuesProps = {
    password: '',
    repeatPassword: '',
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(loginSignupSchema),
    defaultValues,
  });

  const { reset, setError, handleSubmit } = methods;

  const successCallback = (msg: string) => {
    toast.success(msg ?? 'رمز عبور شما با موفقیت تغییر یافت');
    toast.success('در حال انتقال به حساب کاربری...');

    setTimeout(() => {
      //  * Reload to load the user data in Redux!
      push(PATH_AFTER_LOGIN);
    }, 3000);
  };

  const failureCallback = (msg: string) => {
    toast.success(msg ?? 'یه مشکلی پیش اومده');

    // push('/');
    // setTimeout(() => {
    //   //  * Reload to load the user data in Redux!
    //   reload();
    // }, 500);
  };

  const onSubmit = (data: FormValuesProps) => {
    try {
      const passToken = sessionStorage.getItem('passToken');
      dispatch(resetPassword(data.password, successCallback, failureCallback, passToken as string));
    } catch (err) {
      reset();
      setError('afterSubmit', { ...err, message: err.message || err });
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <RHFTextField
        name="password"
        shrinkLabel
        sx={{ my: 3 }}
        type={showPassword ? 'text' : 'password'}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
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

      <RHFTextField
        name="repeatPassword"
        shrinkLabel
        type={showRepeatPassword ? 'text' : 'password'}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setRepeatShowPassword(!showRepeatPassword)} edge="end">
                <Iconify icon={showRepeatPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
              </IconButton>
            </InputAdornment>
          ),
        }}
        label={
          <Stack direction="row" alignContent="center" justifyContent="center">
            تکرار رمز عبور
            <Iconify icon="eva:unlock-fill" sx={{ mr: 0.4 }} />
          </Stack>
        }
      />

      <Stack direction="row" sx={{ mt: 6 }} justifyContent="space-between">
        <LoadingButton variant="contained" disableElevation loading={isLoading} type="submit">
          تغییر رمز عبور
        </LoadingButton>
        <Button variant="text" href={PATH_AUTH.login}>
          ورود با رمز یکبار مصرف
        </Button>
      </Stack>
    </FormProvider>
  );
}
