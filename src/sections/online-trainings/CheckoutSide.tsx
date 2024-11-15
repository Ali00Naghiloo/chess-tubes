import { useState } from 'react';
import { toast } from 'react-toastify';
// components
import SvgColor from '@/components/svg-color/SvgColor';
// redux
import { useDispatch, useSelector } from '@/redux/store';
// hooks
import useResponsive from '@/hooks/useResponsive';
// utils
import { enNumToPerPrice } from '@/utils/persianUtils';
import { calcDiscount } from '@/utils/priceUtils';
// @mui
import { Box, Paper, Stack, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// modules
import registerOnlineTraining from '@/modules/global/redux/operators/registerOnlineTraining';
import { useParams } from 'next/navigation';

// ----------------------------------------------------------------------

export default function CheckoutSide() {
  const isDesktop = useResponsive('up', 'md');

  const {
    price,
    discount: { discountPercent },
  } = useSelector((s) => s.onlineCourse.course);
  const { coupon_discount, couponId } = useSelector((s) => s.onlineCourse.copun);

  const [isLoading, setIsLoading] = useState(false);

  const params = useParams();

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
      registerOnlineTraining(
        {
          id: Number(params.id),
          paytype: sessionStorage.getItem('paymentType') as 'gate' | 'wallet',
          copunId: couponId,
          copun_discount: coupon_discount,
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
            <Typography variant="subtitle2">قیمت</Typography>
            <Stack direction="row">
              <Typography variant="subtitle1" fontWeight={600}>
                {enNumToPerPrice(price)}
              </Typography>
              <SvgColor src="/assets/icons/products/ic_toman.svg" sx={{ width: 20, ml: 0.5 }} />
            </Stack>
          </Stack>

          {!!coupon_discount && (
            <Stack
              sx={{ mt: 2 }}
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="subtitle2">کد تخفیف</Typography>
              <Stack direction="row">
                <Typography variant="subtitle1" fontWeight={600}>
                  {enNumToPerPrice(coupon_discount)}
                </Typography>
                <SvgColor src="/assets/icons/products/ic_toman.svg" sx={{ width: 20, ml: 0.5 }} />
              </Stack>
            </Stack>
          )}

          {!!-calcDiscount(discountPercent, price) && (
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography color="error.light" variant="subtitle2">
                سود خرید
              </Typography>
              <Stack direction="row">
                <Typography variant="subtitle1" color="error.light" fontWeight={600}>
                  {enNumToPerPrice(-calcDiscount(discountPercent, price) + coupon_discount)}
                </Typography>
                <SvgColor
                  src="/assets/icons/products/ic_toman.svg"
                  sx={{ width: 20, ml: 0.5, bgcolor: 'error.light' }}
                />
              </Stack>
            </Stack>
          )}

          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="subtitle2">مبلغ قابل پرداخت</Typography>
            <Stack direction="row">
              <Typography variant="subtitle1" fontWeight={600}>
                {enNumToPerPrice(calcDiscount(price, discountPercent) - coupon_discount)}
              </Typography>
              <SvgColor src="/assets/icons/products/ic_toman.svg" sx={{ width: 20, ml: 0.5 }} />
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
    </Box>
  );
}
