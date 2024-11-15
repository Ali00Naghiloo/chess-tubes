// @mui
import { Button, DialogTitle, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
// components
import { DialogAnimate } from '@/components/animate';
// hooks
import useResponsive from '@/hooks/useResponsive';
import CheckoutPaymentType from '@/sections/checkout/CheckoutPaymentType';
import { toast } from 'react-toastify';
import axiosInstance from '@/utils/axios';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import { LoadingButton } from '@mui/lab';
import { useRouter } from 'next/router';
// utils

// ----------------------------------------------------------------------

type Props = {
  open: boolean;
  handleClose: VoidFunction;
};

export default function Dialog({ handleClose, open }: Props) {
  const [isLoading, setIsLoading] = useState(false);

  const params = useParams();
  const { push } = useRouter();

  const isMobile = useResponsive('down', 'sm');

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const { data } = await axiosInstance.post(
        `api/order/completing/${params.orderId}`,
        undefined,
        {
          params: { paytype: sessionStorage.getItem('paymentType') as 'gate' | 'wallet' },
        }
      );
      if (sessionStorage.getItem('paymentType') === 'gate') {
        push(data.data.redirectUrl);
      } else {
        toast.success(data.message);
        push('/dashboard/orders');
      }
    } catch (err) {
      toast.error(err.message);
    }
    setIsLoading(false);
  };

  return (
    <DialogAnimate open={open} onClose={handleClose} dir="rtl" fullScreen={isMobile}>
      <DialogTitle>نحوه پرداخت</DialogTitle>

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

      <CheckoutPaymentType title={false} />
      <LoadingButton variant="contained" onClick={handleSubmit} loading={isLoading} fullWidth>
        پرداخت
      </LoadingButton>
    </DialogAnimate>
  );
}
