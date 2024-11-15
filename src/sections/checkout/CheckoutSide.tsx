import { useState } from 'react';
import { toast } from 'react-toastify';
// components
import SvgColor from '@/components/svg-color/SvgColor';
// redux
import { useDispatch, useSelector } from '@/redux/store';
// hooks
import useResponsive from '@/hooks/useResponsive';
// utils
import { enNumToPer, enNumToPerPrice } from '@/utils/persianUtils';
import { calcDiscountPercent } from '@/utils/priceUtils';
// @mui
import { Box, Paper, Stack, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// modules
import placeNewOrder from '@/modules/global/redux/operators/placeNewOrder';

// ----------------------------------------------------------------------

export default function CheckoutSide() {
  //

  const isDesktop = useResponsive('up', 'md');

  const { totalCount, totalDiscount, couponDiscount, totalPrice } = useSelector((s) => s.cart);

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
        position: { md: 'sticky', xs: 'static' },
        right: 0,
        top: 150,
        width: { md: 400, xs: '100%' },
        minWidth: 300,
        height: 'fit-content',
        pb: { md: 0, xs: 3 },
      }}
    >
      <Paper variant="outlined" sx={{ p: 2 }}>
        {!isDesktop && (
          <Typography
            variant="h6"
            sx={{
              mb: 3,
              '&::before': { content: "'•'", color: 'primary.main', mr: 0.5 },
            }}
          >
            خلاصه قیمت و تخفیف‌ها
          </Typography>
        )}
        <Stack spacing={2}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="subtitle2">قیمت کالاها ({enNumToPer(totalCount)})</Typography>
            <Stack direction="row">
              <Typography variant="subtitle1" fontWeight={600}>
                {enNumToPerPrice(totalPrice)}
              </Typography>
              <SvgColor src="/assets/icons/products/ic_toman.svg" sx={{ width: 20, ml: 0.5 }} />
            </Stack>
          </Stack>

          {couponDiscount != null && couponDiscount !== 0 && (
            <Stack
              sx={{ mt: 2 }}
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="subtitle2">کد تخفیف</Typography>
              <Stack direction="row">
                <Typography variant="subtitle1" fontWeight={600}>
                  {enNumToPerPrice(Number(couponDiscount))}
                </Typography>
                <SvgColor src="/assets/icons/products/ic_toman.svg" sx={{ width: 20, ml: 0.5 }} />
              </Stack>
            </Stack>
          )}

          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography color="error.light" variant="subtitle2">
              سود خرید
            </Typography>
            <Stack direction="row">
              <Typography variant="subtitle1" color="error.light" fontWeight={600}>
                (
                {enNumToPer(
                  calcDiscountPercent(
                    totalPrice,
                    Number(totalDiscount) + Number(couponDiscount)
                  ).toFixed(0)
                )}
                %) {enNumToPerPrice(Number(totalDiscount) + Number(couponDiscount))}
              </Typography>
              <SvgColor
                src="/assets/icons/products/ic_toman.svg"
                sx={{ width: 20, ml: 0.5, bgcolor: 'error.light' }}
              />
            </Stack>
          </Stack>

          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="subtitle2">مبلغ قابل پرداخت</Typography>
            <Stack direction="row">
              <Typography variant="subtitle1" fontWeight={600}>
                {enNumToPerPrice(
                  Number(totalPrice) - (Number(totalDiscount) + Number(couponDiscount))
                )}
              </Typography>
              <SvgColor src="/assets/icons/products/ic_toman.svg" sx={{ width: 20, ml: 0.5 }} />
            </Stack>
          </Stack>

          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="subtitle2">هزینه ارسال</Typography>
            <Stack direction="row">
              <Typography variant="subtitle1" fontWeight={600}>
                به عهده مشتری
              </Typography>
            </Stack>
          </Stack>
          {isDesktop && (
            <LoadingButton
              onClick={pay}
              loading={isLoading}
              fullWidth
              variant="contained"
              disableElevation
            >
              پرداخت
            </LoadingButton>
          )}
        </Stack>
      </Paper>
      {isShipmentNeed && (
        <Typography variant="body2" fontWeight={600}>
          سبد خرید شما دارای محصول فیزیکی است
        </Typography>
      )}
    </Box>
  );
}
