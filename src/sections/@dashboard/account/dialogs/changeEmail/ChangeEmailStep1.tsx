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
import editUserEmail from '@/modules/user/redux/operators/editUserEmail';

// ----------------------------------------------------------------------

type Props = {
  handleClose: VoidFunction;
  setActiveStep: Dispatch<SetStateAction<number>>;
  activeSteps: number;
};

type FormValuesProps = {
  email: string;
  afterSubmit?: string;
};

export default function ChangeEmailStep1({ handleClose, setActiveStep, activeSteps }: Props) {
  //

  const [isLoading, setIsLoading] = useState(false);

  const { push } = useRouter();

  const dispatch = useDispatch();

  const SubmitQuestionSchema = Yup.object().shape({
    email: Yup.string().email('آدرس ایمیل نادرست است').required('ایمیل خود را وارد کنید'),
  });

  const defaultValues: FormValuesProps = {
    email: '',
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(SubmitQuestionSchema),
    defaultValues,
  });

  const { reset, setError, handleSubmit } = methods;

  const successCallback = () => {
    setIsLoading(false);
    setActiveStep(activeSteps + 1);
    toast.success('کد تائید به پست الکترونیکی شما ایمیل گردید');
  };

  const failureCallback = (msg: string) => {
    setIsLoading(false);
    toast.error(msg);
    reset();
  };

  const onSubmit = (data: FormValuesProps) => {
    try {
      push(`?newEmail=${data.email}`);
      setIsLoading(true);
      dispatch(editUserEmail(data, successCallback, failureCallback));
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
          ایمیل جدید خود را وارد کنید
        </Typography>

        <RHFTextField sx={{ mb: 1.5 }} name="email" label="ایمیل جدید" />
      </DialogContent>

      <Divider />
      <DialogActions dir="ltr">
        <Button onClick={handleClose} disableElevation sx={{ ml: 3 }}>
          لغو و خروج
        </Button>

        <LoadingButton loading={isLoading} type="submit" variant="contained" disableElevation>
          ثبت ایمیل
        </LoadingButton>
      </DialogActions>
    </FormProvider>
  );
}
