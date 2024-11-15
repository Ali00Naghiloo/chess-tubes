import { Dispatch, SetStateAction, useState } from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Button, DialogActions, DialogContent, Divider, Typography } from '@mui/material';
// components
import { RHFTextField } from '@/components/hook-form';
import FormProvider from '@/components/hook-form/FormProvider';
import { toast } from 'react-toastify';
import { LoadingButton } from '@mui/lab';
import { useRouter } from 'next/router';
import { useDispatch } from '@/redux/store';
import changePhoneNumberOtp from '@/modules/user/redux/operators/changePhoneNumberOtp';

// ----------------------------------------------------------------------

type Props = {
  handleClose: VoidFunction;
  setActiveStep: Dispatch<SetStateAction<number>>;
};

type FormValuesProps = {
  phone: string;
  afterSubmit?: string;
};

export default function ChangePhoneStep1({ handleClose, setActiveStep }: Props) {
  //

  const [isLoading, setIsLoading] = useState(false);

  const { push } = useRouter();

  const dispatch = useDispatch();

  const SubmitQuestionSchema = Yup.object().shape({
    phone: Yup.string().required('شماره موبایل جدید خود را وارد کنید'),
  });

  const defaultValues: FormValuesProps = {
    phone: '',
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(SubmitQuestionSchema),
    defaultValues,
  });

  const { reset, setError, handleSubmit } = methods;

  const successCallback = () => {
    setIsLoading(false);
    setActiveStep((s) => s + 1);
  };

  const failureCallback = (msg: string) => {
    setIsLoading(false);
    toast.error(msg);
    reset();
  };

  const onSubmit = (data: FormValuesProps) => {
    try {
      push(`?newPhone=${data.phone}`);
      setIsLoading(true);
      dispatch(changePhoneNumberOtp(data.phone, successCallback, failureCallback));
    } catch (err) {
      reset();
      setError('afterSubmit', { ...err, message: err.message || err });
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
        <Typography fontWeight={500} sx={{ my: 2 }}>
          شماره موبایل جدید خود را وارد کنید
        </Typography>

        <RHFTextField sx={{ mb: 1.5 }} name="phone" label="شماره موبایل جدید" multiline />
      </DialogContent>

      <Divider />
      <DialogActions dir="ltr">
        <Button onClick={handleClose} disableElevation sx={{ ml: 3 }}>
          لغو و خروج
        </Button>

        <LoadingButton loading={isLoading} type="submit" variant="contained" disableElevation>
          ثبت شماره موبایل
        </LoadingButton>
      </DialogActions>
    </FormProvider>
  );
}
