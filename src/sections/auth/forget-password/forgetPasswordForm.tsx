import * as Yup from 'yup';
// next
import { useRouter } from 'next/router';
// toast
import { toast } from 'react-toastify';
// from
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Button, Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// icons
import Iconify from '@/components/iconify/Iconify';
// redux
import { useDispatch, useSelector } from '@/redux/store';
// operators
import forgetPassword from '@/modules/user/redux/operators/forgetPassword';
// components
import FormProvider, { RHFTextField } from '@/components/hook-form';
// routes
import { PATH_AUTH } from '@/routes/paths';
// utils
import { enNumToPer } from '@/utils/persianUtils';

// ----------------------------------------------------------------------

type FormValuesProps = {
  phoneNumber: string;
  afterSubmit?: string;
};

export default function ForgetPasswordForm() {
  //
  const { isLoading } = useSelector((s) => s.user);

  const { push } = useRouter();

  const dispatch = useDispatch();

  const forgetPasswordSchema = Yup.object().shape({
    phoneNumber: Yup.string()
      .required('شماره تلفن خود را وارد کنید')
      .matches(/^09/, 'شماره تلفن شما باید با ۰۹ شروع شود!')
      .matches(/^09\d{9}$/, 'شماره تلفن شما باید ۱۱ رقمی و شامل اعداد باشد!'),
  });

  const defaultValues: FormValuesProps = {
    phoneNumber: '',
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(forgetPasswordSchema),
    defaultValues,
  });

  const { reset, setError, handleSubmit, getValues } = methods;

  const failureCallback = (msg: string) => {
    toast.error(msg ?? 'یه مشکلی پیش اومده');
  };

  const successCallback = (msg: string, type: string) => {
    toast.success(enNumToPer(msg) ?? 'کد تایید برای شما ارسال شد');
    push(`${PATH_AUTH.resetPasswordVerify}?type=${type}&userInput=${getValues().phoneNumber}`);
  };

  const onSubmit = (data: FormValuesProps) => {
    try {
      dispatch(forgetPassword(data.phoneNumber, successCallback, failureCallback));
    } catch (err) {
      reset();
      setError('afterSubmit', { ...err, message: err.message || err });
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <RHFTextField
        name="phoneNumber"
        sx={{ mt: 4, mb: 0.2 }}
        fullWidth
        shrinkLabel
        label={
          <Stack direction="row" alignContent="center" justifyContent="center">
            شماره همراه
            <Iconify icon="eva:smartphone-fill" sx={{ mr: 0.4 }} />
          </Stack>
        }
        inputProps={{ dir: 'ltr' }}
      />

      <Stack direction="row" sx={{ mt: 6 }} justifyContent="space-between">
        <LoadingButton loading={isLoading} type="submit" variant="contained" disableElevation>
          تایید و دریافت کد
        </LoadingButton>
        <Button variant="text" href={PATH_AUTH.login}>
          ورود با رمز یک بار مصرف
        </Button>
      </Stack>
    </FormProvider>
  );
}
