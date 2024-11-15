import { useState } from 'react';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Close } from '@mui/icons-material';
// redux
import { useDispatch } from '@/redux/store';
// components
import { DialogAnimate } from '@/components/animate';
import { RHFTextField } from '@/components/hook-form';
import FormProvider from '@/components/hook-form/FormProvider';
import Iconify from '@/components/iconify/Iconify';
// hooks
import useResponsive from '@/hooks/useResponsive';
//
import resetProfilePassword from '@/modules/user/redux/operators/resetProfilePassword';

// ----------------------------------------------------------------------

type Props = {
  open: boolean;
  handleClose: VoidFunction;
};

export default function ChangePasswordDialog({ handleClose, open }: Props) {
  //

  const isMobile = useResponsive('down', 'sm');

  return (
    <DialogAnimate open={open} onClose={handleClose} dir="rtl" fullScreen={isMobile}>
      <DialogTitle>تغییر رمز عبور</DialogTitle>

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

      <ChangePasswordDialogForm handleClose={handleClose} />
    </DialogAnimate>
  );
}

// ----------------------------------------------------------------------

type ChangePasswordDialogFormProps = {
  handleClose: VoidFunction;
};

type FormValuesProps = {
  password: string;
  retypePassword: string;
  afterSubmit?: string;
};

function ChangePasswordDialogForm({ handleClose }: ChangePasswordDialogFormProps) {
  //

  const [showPassword, setShowPassword] = useState(false);

  const [showPasswordRetype, setShowPasswordRetype] = useState(false);

  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const SubmitQuestionSchema = Yup.object().shape({
    password: Yup.string()
      .required('رمز عبور جدید را وارد کنید')
      .min(6, 'رمز عبور باید حداقل ۶ کلمه باشد'),
    retypePassword: Yup.string()
      .required('تکرار رمز عبور را وارد کنید')
      .oneOf([Yup.ref('password')], 'رمز عبور و تکرار آن باید یکسان باشد'),
  });

  const defaultValues: FormValuesProps = {
    password: '',
    retypePassword: '',
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(SubmitQuestionSchema),
    defaultValues,
  });

  const { reset, setError, handleSubmit } = methods;

  const successCallback = () => {
    setIsLoading(false);
    toast.success('رمز عبور جدید با موفقیت تغییر یافت');
    reset();
    handleClose();
  };

  const failureCallback = () => {
    setIsLoading(false);
    toast.error('یه مشکلی پیش اومده');
  };
  const onSubmit = (data: FormValuesProps) => {
    const dto: { password_confirmation: string; password: string } = {
      password: data.password,
      password_confirmation: data.retypePassword,
    };
    try {
      setIsLoading(true);
      dispatch(resetProfilePassword(dto, successCallback, failureCallback));
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
      <DialogContent dividers sx={{ flexGrow: 1 }}>
        <RHFTextField
          name="password"
          sx={{ mb: 2 }}
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
          label="رمز عبور جدید"
        />

        <RHFTextField
          name="retypePassword"
          type={showPasswordRetype ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPasswordRetype(!showPasswordRetype)} edge="end">
                  <Iconify icon={showPasswordRetype ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          label="تکرار رمز عبور"
        />
      </DialogContent>

      <DialogActions dir="ltr">
        <Button onClick={handleClose} disableElevation sx={{ ml: 3 }}>
          لغو و خروج
        </Button>

        <LoadingButton loading={isLoading} type="submit" variant="contained" disableElevation>
          ثبت رمز عبور
        </LoadingButton>
      </DialogActions>
    </FormProvider>
  );
}
