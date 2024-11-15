import { useEffect, useState } from 'react';
import * as Yup from 'yup';
// toast
import { toast } from 'react-toastify';
// next
import { useRouter } from 'next/router';
// from
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Box, FormHelperText, Link, Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// redux
import { useDispatch, useSelector } from '@/redux/store';
// operators
import verifyCode from '@/modules/user/redux/operators/verifyCode';
import resendOtp from '@/modules/user/redux/operators/resendOtp';
// components
import FormProvider, { RHFCodes } from '@/components/hook-form';
// routes
import { PATH_AUTH } from '@/routes/paths';

// ----------------------------------------------------------------------

const RESEND_CODE_TIME = 120;

type FormValuesProps = {
  code1: string;
  code2: string;
  code3: string;
  code4: string;
  code5: string;
  afterSubmit?: string;
};

export default function VerifyForm() {
  //
  const dispatch = useDispatch();

  const { isLoading } = useSelector((s) => s.user);

  const { query, push, reload } = useRouter();

  const [timer, setTimer] = useState(RESEND_CODE_TIME);

  const [whichOperator, setWhichOperator] = useState<null | 'resend' | 'submit'>(null);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      if (timer < 0) {
        clearInterval(timerInterval);
      } else {
        setTimer((s) => s - 1);
      }
    }, 1000);
    return () => {
      clearInterval(timerInterval);
    };
  }, [timer]);

  const verifySchema = Yup.object().shape({
    code1: Yup.string().required('Code is required'),
    code2: Yup.string().required('Code is required'),
    code3: Yup.string().required('Code is required'),
    code4: Yup.string().required('Code is required'),
    code5: Yup.string().required('Code is required'),
  });

  const defaultValues: FormValuesProps = {
    code1: '',
    code2: '',
    code3: '',
    code4: '',
    code5: '',
  };

  const methods = useForm<FormValuesProps>({
    mode: 'onChange',
    resolver: yupResolver(verifySchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { errors },
  } = methods;

  const failureCallback = (msg: any) => {
    toast.error(msg ?? 'یه مشکلی پیش اومده');
  };

  const successCallback = (msg: any) => {
    toast.success(msg ?? 'کد تایید صحیح میباشد');

    push('/');

    //  * Reload to load the user data in Redux!
    reload();
  };

  const onSubmit = (data: FormValuesProps) => {
    try {
      setWhichOperator('submit');

      const code = data.code1 + data.code2 + data.code3 + data.code4 + data.code5;

      dispatch(verifyCode(code, query.mobile as string, successCallback, failureCallback));
    } catch (err) {
      reset();
      toast.error(err.message || err);
    }
  };

  const resendOtpSubmit = () => {
    try {
      setWhichOperator('resend');
      dispatch(
        resendOtp(query.mobile as string, () => {
          toast.success('کد تایید مجددا ارسال شد');
          setTimer(RESEND_CODE_TIME);
        })
      );
    } catch (err) {
      toast.error(err.message || err);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <RHFCodes
        sx={{ mt: 2, mb: 0.6 }}
        keyName="code"
        inputs={['code1', 'code2', 'code3', 'code4', 'code5']}
      />

      {(!!errors.code1 || !!errors.code2 || !!errors.code3 || !!errors.code4 || !!errors.code5) && (
        <FormHelperText error sx={{ px: 2 }}>
          لطفا کد تاییدیه را به درستی وارد کنید
        </FormHelperText>
      )}

      <Stack direction="row" justifyContent="space-between" sx={{ mt: 6 }}>
        <LoadingButton
          variant="contained"
          disableElevation
          loading={isLoading && whichOperator === 'submit'}
          type="submit"
        >
          ورود به حساب کاربری
        </LoadingButton>

        <LoadingButton
          dir="rtl"
          disabled={timer >= 0}
          onClick={resendOtpSubmit}
          loading={isLoading && whichOperator === 'resend'}
        >
          {timer >= 0 ? `${timer} ثانیه تا ارسال مجدد کد` : 'ارسال مجدد کد تاییدیه'}
        </LoadingButton>
      </Stack>

      <Box dir="rtl" sx={{ mt: 0.8 }}>
        <Link variant="caption" href={PATH_AUTH.login} underline="hover" color="gray">
          شماره همراه خود را اشتباه وارد کردید؟
        </Link>
      </Box>
    </FormProvider>
  );
}
