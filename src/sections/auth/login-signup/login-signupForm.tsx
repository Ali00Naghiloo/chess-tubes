import * as Yup from 'yup';
// next
import { useRouter } from 'next/router';
// from
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// toast
import { toast } from 'react-toastify';
// mui
import { LoadingButton } from '@mui/lab';
import { Button, Link, Stack, Typography } from '@mui/material';
// icons
import Iconify from '@/components/iconify/Iconify';
// redux
import { useDispatch, useSelector } from '@/redux/store';
// operators
import loginOrSignup from '@/modules/user/redux/operators/loginOrSignup';
// components
import FormProvider, { RHFCheckbox, RHFTextField } from '@/components/hook-form';
// routes
import { PATH_AUTH, PATH_PAGE } from '@/routes/paths';

// ----------------------------------------------------------------------

type FormValuesProps = {
  phoneNumber: string;
  isAgreeWithRules: boolean;
  afterSubmit?: string;
};

export default function LoginSignupForm() {
  //
  const { isLoading } = useSelector((s) => s.user);

  const { push } = useRouter();

  const dispatch = useDispatch();

  const loginSignupSchema = Yup.object().shape({
    phoneNumber: Yup.string()
      .required('شماره تلفن خود را وارد کنید')
      .matches(/^09/, 'شماره تلفن شما باید با ۰۹ شروع شود!')
      .matches(/^09\d{9}$/, 'شماره تلفن شما باید ۱۱ رقمی و شامل اعداد باشد!'),
    isAgreeWithRules: Yup.boolean()
      .required('')
      .test(
        'check-true',
        'لطفا قوانین را مطالعه کرده و سپس موافقت خود را با آن اعلام کنید',
        (v) => v === true
      ),
  });

  const defaultValues: FormValuesProps = {
    phoneNumber: '',
    isAgreeWithRules: false,
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(loginSignupSchema),
    defaultValues,
  });

  const { reset, handleSubmit, getValues } = methods;

  const failureCallback = (msg: string) => {
    toast.error(msg ?? 'یه مشکلی پیش اومده');
  };

  const successfulCallback = (msg: string) => {
    toast.success(msg ?? 'کد تایید برای شما ارسال شد');
    push(`${PATH_AUTH.verify}?mobile=${getValues().phoneNumber}`);
  };

  const onSubmit = (data: FormValuesProps) => {
    try {
      dispatch(loginOrSignup(data.phoneNumber, successfulCallback, failureCallback));
    } catch (err) {
      reset();
      toast.error(err.message || err);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <RHFTextField
        name="phoneNumber"
        sx={{ mt: 4, mb: 0.2 }}
        fullWidth
        shrinkLabel
        inputProps={{ dir: 'ltr' }}
        label={
          <Stack direction="row" alignContent="center" justifyContent="center">
            شماره همراه
            <Iconify icon="eva:smartphone-fill" sx={{ mr: 0.4 }} />
          </Stack>
        }
      />
      <Stack direction="row" dir="rtl">
        <RHFCheckbox
          label={
            <Typography variant="caption">
              همه <Link href={PATH_PAGE.rules}>قوانین و مقررات چس تیوبز</Link> را مطالعه کردم و می
              پذیرم
            </Typography>
          }
          name="isAgreeWithRules"
        />
      </Stack>
      <Stack direction="row" sx={{ mt: 6 }} justifyContent="space-between">
        <LoadingButton loading={isLoading} type="submit" variant="contained" disableElevation>
          تایید و دریافت کد
        </LoadingButton>
        <Button variant="text" href={PATH_AUTH.loginViaCode}>
          ورود با کلمه عبور
        </Button>
      </Stack>
    </FormProvider>
  );
}
