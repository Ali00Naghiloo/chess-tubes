import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import * as Yup from 'yup';
// toast
import { toast } from 'react-toastify';
// from
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// redux
import { useDispatch, useSelector } from '@/redux/store';
// components
import FormProvider, { RHFCodes } from '@/components/hook-form';
// @mui
import {
  Button,
  DialogActions,
  DialogContent,
  Divider,
  FormHelperText,
  Stack,
  Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useRouter } from 'next/router';
import { notNullAndEmpty } from '@/utils/typeChecl';
import changePhoneNumber from '@/modules/user/redux/operators/changePhoneNumber';
import changePhoneNumberOtp from '@/modules/user/redux/operators/changePhoneNumberOtp';

// ----------------------------------------------------------------------

const RESEND_CODE_TIME = 120;

// ----------------------------------------------------------------------
type Props = {
  handleClose: VoidFunction;
  setActiveStep: Dispatch<SetStateAction<number>>;
};

type FormValuesProps = {
  code1: string;
  code2: string;
  code3: string;
  code4: string;
  code5: string;
  afterSubmit?: string;
};

export default function ChangePhoneStep2({ handleClose, setActiveStep }: Props) {
  //

  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const { query } = useRouter();

  useEffect(() => {
    if (!notNullAndEmpty(query.newPhone)) {
      setActiveStep(0);
    }
  }, [query, setActiveStep]);

  const { error, message } = useSelector((s) => s.user);

  const [timer, setTimer] = useState(RESEND_CODE_TIME);

  const [whichOperator, setWhichOperator] = useState<null | 'resend' | 'submit'>(null);

  useEffect(() => {
    if (error) {
      toast.error(message);
    }
  }, [error, message]);

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

  const successCallback = (msg: string) => {
    setIsLoading(false);
    toast.success(msg ?? 'با موفقیت تغییر یافت');
    setActiveStep((s) => s + 1);
  };

  const successOtpCallback = (msg: string) => {
    setIsLoading(false);
    toast.success(msg ?? 'کد مجددا ارسال شد');
    setTimer(RESEND_CODE_TIME);
  };

  const failureCallback = (msg: string) => {
    setIsLoading(false);
    toast.error(msg);
    reset();
  };

  const onSubmit = (data: FormValuesProps) => {
    try {
      const code = `${data.code1}${data.code2}${data.code3}${data.code4}${data.code5}`;
      setWhichOperator('submit');
      setIsLoading(true);
      dispatch(changePhoneNumber(code, query.newPhone as string, successCallback, failureCallback));
    } catch (err) {
      reset();
      toast.error(err.message || err);
    }
  };

  const resendOtpSubmit = () => {
    try {
      setWhichOperator('resend');
      setIsLoading(true);
      dispatch(changePhoneNumberOtp(query.newPhone as string, successOtpCallback, failureCallback));
    } catch (err) {
      toast.error(err.message || err);
    }
  };

  return (
    <FormProvider
      methods={methods}
      onSubmit={handleSubmit(onSubmit)}
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <DialogContent sx={{ flexGrow: 1 }}>
        <Typography fontWeight={500} sx={{ mt: 2 }}>
          کد تاییدیه به شماره شما ارسال شده است، لطفا آن را وارد کنید
        </Typography>

        <RHFCodes
          sx={{ mt: 2, mb: 0.6 }}
          keyName="code"
          inputs={['code1', 'code2', 'code3', 'code4', 'code5']}
        />

        {(!!errors.code1 ||
          !!errors.code2 ||
          !!errors.code3 ||
          !!errors.code4 ||
          !!errors.code5) && (
          <FormHelperText error sx={{ px: 2 }}>
            لطفا کد تاییدیه را به درستی وارد کنید
          </FormHelperText>
        )}

        <Button
          onClick={() => setActiveStep(0)}
          color="info"
          size="small"
          sx={{ mt: 1, opacity: 0.5 }}
        >
          شماره همراه را اشتباه وارد کردید؟
        </Button>
      </DialogContent>

      <Divider />

      <DialogActions dir="ltr">
        <Stack direction="row" justifyContent="space-between">
          <LoadingButton
            dir="rtl"
            disabled={timer >= 0}
            onClick={resendOtpSubmit}
            loading={isLoading && whichOperator === 'resend'}
          >
            {timer >= 0 ? `${timer} ثانیه تا ارسال مجدد کد` : 'ارسال مجدد کد تاییدیه'}
          </LoadingButton>
          <LoadingButton
            variant="contained"
            disableElevation
            loading={isLoading && whichOperator === 'submit'}
            type="submit"
          >
            تایید شماره و ادامه
          </LoadingButton>
        </Stack>
      </DialogActions>
    </FormProvider>
  );
}
