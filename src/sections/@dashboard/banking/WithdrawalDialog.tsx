import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import { Close } from '@mui/icons-material';
// components
import { DialogAnimate } from '@/components/animate';
import { RHFTextField } from '@/components/hook-form';
import FormProvider from '@/components/hook-form/FormProvider';
// hooks
import useResponsive from '@/hooks/useResponsive';
// utils
import SvgColor from '@/components/svg-color/SvgColor';
import { useDispatch, useSelector } from '@/redux/store';
import axiosInstance from '@/utils/axios';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { LoadingButton } from '@mui/lab';
import getWalletTransactions from '@/modules/wallet/redux/operators/getWalletTransactions';

// ----------------------------------------------------------------------

type Props = {
  open: boolean;
  handleClose: VoidFunction;
};

export default function WithdrawalDialog({ handleClose, open }: Props) {
  //

  const isMobile = useResponsive('down', 'sm');

  return (
    <DialogAnimate open={open} onClose={handleClose} dir="rtl" fullScreen={isMobile}>
      <DialogTitle>ثبت درخواست برداشت</DialogTitle>

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

      <WithdrawalDialogForm handleClose={handleClose} />
    </DialogAnimate>
  );
}

// ----------------------------------------------------------------------

type WithdrawalDialogFormProps = {
  handleClose: VoidFunction;
};

type FormValuesProps = {
  amount: string;
  cardNumber: string;
  shaba?: string;
  afterSubmit?: string;
};

function WithdrawalDialogForm({ handleClose }: WithdrawalDialogFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const data = useSelector((s) => s.walletTransactions);

  const dispatch = useDispatch();

  const SubmitQuestionSchema = Yup.object().shape({
    amount: Yup.string().required('مقدار مورد نظر خود را وارد کنید'),
    cardNumber: Yup.string().required('شماره کارت مورد نظر خود را وارد کنید'),
    shaba: Yup.string(),
  });

  const defaultValues: FormValuesProps = {
    amount: '',
    cardNumber: data.data?.card || '',
    shaba: data.data?.shaba || '',
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(SubmitQuestionSchema),
    defaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit = async ({ amount, shaba, cardNumber }: FormValuesProps) => {
    setIsLoading(true);
    try {
      const { data: res } = await axiosInstance.post('api/wallet/withdraw', {
        amount,
        shaba,
        card: cardNumber,
      });
      toast.success(res.message);
      setIsLoading(false);
      dispatch(getWalletTransactions());
      handleClose();
    } catch (err) {
      toast.error(err.message);
      setIsLoading(false);
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
        <Stack spacing={1} direction="row" alignItems="center" sx={{ my: 1 }}>
          <Typography variant="body2">مقدار قابل برداشت :</Typography>
          <Stack direction="row" dir="ltr">
            <SvgColor src="/assets/icons/products/ic_toman.svg" sx={{ width: 15, ml: 0.5 }} />
            <Typography fontWeight={600}>{data.data?.balance.toLocaleString()}</Typography>
          </Stack>
        </Stack>
        <RHFTextField
          sx={{ mb: 1.5 }}
          name="amount"
          label="مقدار مورد نظر "
          helperText="به تومان وارد کنید"
        />

        <RHFTextField sx={{ mb: 1.5 }} name="cardNumber" label="شماره کارت مقصد" />
        <RHFTextField sx={{ mb: 1.5 }} name="shaba" label="شماره شبا مقصد" />
      </DialogContent>

      <DialogActions dir="ltr">
        <Button onClick={handleClose} disableElevation sx={{ ml: 3 }}>
          لغو و خروج
        </Button>

        <LoadingButton type="submit" variant="contained" disableElevation loading={isLoading}>
          ثبت درخواست
        </LoadingButton>
      </DialogActions>
    </FormProvider>
  );
}
