import { useState } from 'react';
import { toast } from 'react-toastify';
// components
import SvgColor from '@/components/svg-color/SvgColor';
// hooks
import useResponsive from '@/hooks/useResponsive';
// redux
import { useDispatch, useSelector } from '@/redux/store';
// @mui
import { Box, Paper, Stack, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// utils
import { enNumToPerPrice } from '@/utils/persianUtils';
// modules
import placeNewOrder from '@/modules/global/redux/operators/placeNewOrder';

// ----------------------------------------------------------------------

export default function CheckoutSummary() {
  //

  const isMobile = useResponsive('down', 'md');

  const { couponDiscount, totalDiscount, totalPrice } = useSelector((s) => s.cart);

  const { activeAddress, activeShipmentType, isShipmentNeed } = useSelector((s) => s.global);

  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const successfulCallback = (msg: string) => {
    setIsLoading(false);
    toast.success(msg ?? 'با موفقیت انجام شد');
  };

  const failureCallback = (msg: string) => {
    setIsLoading(false);
    toast.error(msg ?? 'یه مشکلی پیش اومده');
  };

  const pay = () => {
    if (isShipmentNeed) {
      if (activeAddress == null) {
        toast.error('لطفا یک آدرس انتخاب کنید!');
        return;
      }

      if (activeShipmentType == null) {
        toast.error('در این بازه زمانی روشی برای ارسال محصولات موجود نیست!');
        return;
      }
    }

    setIsLoading(true);
    dispatch(
      placeNewOrder(
        {
          shipment: Number(activeShipmentType),
          address: Number(activeAddress),
          paytype: sessionStorage.getItem('paymentType') as 'gate' | 'wallet',
        },
        successfulCallback,
        failureCallback
      )
    );
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        zIndex: (theme) => theme.zIndex.appBar,
        backgroundColor: 'background.paper',
        width: '100%',
        px: { xs: 2, sm: 4 },
        py: 2,
        alignItems: 'center',
        boxShadow: (theme) => theme.shadows[16],
      }}
      justifyContent="space-between"
      elevation={24}
      variant="outlined"
      component={isMobile ? Paper : Stack}
    >
      <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center">
        <LoadingButton
          size="large"
          onClick={pay}
          loading={isLoading}
          variant="contained"
          disableElevation
        >
          پرداخت
        </LoadingButton>

        <Stack justifyContent="space-between" alignItems="center">
          <Typography variant="subtitle2">مبلغ قابل پرداخت</Typography>
          <Stack direction="row">
            <Typography variant="h5" fontWeight={600}>
              {enNumToPerPrice(
                Number(totalPrice) - (Number(totalDiscount) + Number(couponDiscount))
              )}
            </Typography>
            <SvgColor src="/assets/icons/products/ic_toman.svg" sx={{ width: 20, ml: 0.5 }} />
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}
