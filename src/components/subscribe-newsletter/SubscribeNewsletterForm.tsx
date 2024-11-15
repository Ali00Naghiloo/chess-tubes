import { useState } from 'react';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
// @mui
import { Divider, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// from
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// redux
import { useDispatch } from '@/redux/store';
// operators
import subscribeNewsletter from '@/modules/user/redux/operators/subscribeNewsletter';
// components
import Iconify from '@/components/iconify/Iconify';
import FormProvider, { RHFTextField } from '@/components/hook-form';

// ----------------------------------------------------------------------

type FormValuesProps = {
  email: string;
};

export default function SubscribeNewsletterForm() {
  //

  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const homeNewsletterSchema = Yup.object().shape({
    email: Yup.string().required('ایمیل خود را وارد کنید').email('ایمیل را به صورت صحیح وارد کنید'),
  });

  const defaultValues: FormValuesProps = {
    email: '',
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(homeNewsletterSchema),
    defaultValues,
  });

  const { reset, handleSubmit } = methods;

  const failureCallback = (msg: string) => {
    toast.error(msg ?? 'یه مشکلی پیش اومده');
    setIsLoading(false);
  };

  const successfulCallback = (msg: string) => {
    toast.success(msg ?? 'کد تایید برای شما ارسال شد');
    reset();
    setIsLoading(false);
  };

  const onSubmit = (data: FormValuesProps) => {
    try {
      setIsLoading(true);
      dispatch(subscribeNewsletter(data.email, successfulCallback, failureCallback));
    } catch (err) {
      reset();
      toast.error(err.message || err);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <RHFTextField
        name="email"
        size="small"
        placeholder="ایمیل خود را وارد کنید"
        color="green"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Iconify icon="eva:email-fill" />
              <Divider orientation="vertical" sx={{ height: 20, ml: 0.9 }} />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="start">
              <LoadingButton
                color="green"
                loading={isLoading}
                type="submit"
                size="small"
                variant="contained"
                disableElevation
                disableRipple
              >
                ارسال
              </LoadingButton>
            </InputAdornment>
          ),
        }}
      />
    </FormProvider>
  );
}
