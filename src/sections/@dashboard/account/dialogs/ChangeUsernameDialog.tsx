import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Button, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
// components
import { DialogAnimate } from '@/components/animate';
import { RHFTextField } from '@/components/hook-form';
import FormProvider from '@/components/hook-form/FormProvider';
// hooks
import useResponsive from '@/hooks/useResponsive';
// utils
import { enNumToPer } from '@/utils/persianUtils';
import { useState } from 'react';
import { useDispatch } from '@/redux/store';
import { LoadingButton } from '@mui/lab';
import editUsername from '@/modules/user/redux/operators/editUsername';
import { toast } from 'react-toastify';

// ----------------------------------------------------------------------

type Props = {
  open: boolean;
  handleClose: VoidFunction;
};

export default function ChangeUsernameDialog({ handleClose, open }: Props) {
  //

  const isMobile = useResponsive('down', 'sm');

  return (
    <DialogAnimate open={open} onClose={handleClose} dir="rtl" fullScreen={isMobile}>
      <DialogTitle>تغییر نام کاربری</DialogTitle>

      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <Close />
      </IconButton>

      <ChangeUsernameDialogForm handleClose={handleClose} />
    </DialogAnimate>
  );
}

// ----------------------------------------------------------------------

const MAX_LENGTH_QUESTION = 100;

// ----------------------------------------------------------------------

type ChangeUsernameDialogFormProps = {
  handleClose: VoidFunction;
};

type FormValuesProps = {
  username: string;
  afterSubmit?: string;
};

function ChangeUsernameDialogForm({ handleClose }: ChangeUsernameDialogFormProps) {
  //

  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const SubmitQuestionSchema = Yup.object().shape({
    username: Yup.string().required('نام کاربری خود را وارد کنید'),
  });

  const defaultValues: FormValuesProps = {
    username: '',
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(SubmitQuestionSchema),
    defaultValues,
  });

  const { reset, setError, handleSubmit, watch } = methods;

  const successCallback = () => {
    setIsLoading(false);
    toast.success('با موفقیت تغییر یافت');
    handleClose();
    reset();
  };

  const failureCallback = (msg: string) => {
    setIsLoading(false);
    toast.error(msg);
    reset();
  };

  const onSubmit = (data: FormValuesProps) => {
    try {
      setIsLoading(true);
      dispatch(editUsername(data.username, successCallback, failureCallback));
    } catch (err) {
      reset();
      setError('afterSubmit', { ...err, message: err.message || err });
    }
  };

  const username = watch('username');

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
      <DialogContent dividers sx={{ flexGrow: 1 }}>
        <RHFTextField
          sx={{ mb: 1.5 }}
          name="username"
          label="نام کاربری جدید"
          helperText={`${enNumToPer(username.length)}/${enNumToPer(MAX_LENGTH_QUESTION)}`}
          inputProps={{
            maxLength: MAX_LENGTH_QUESTION,
          }}
        />
      </DialogContent>

      <DialogActions dir="ltr">
        <Button onClick={handleClose} disableElevation sx={{ ml: 3 }}>
          لغو و خروج
        </Button>

        <LoadingButton loading={isLoading} type="submit" variant="contained" disableElevation>
          ثبت نام کاربری
        </LoadingButton>
      </DialogActions>
    </FormProvider>
  );
}
