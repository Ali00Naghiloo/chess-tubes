/* eslint-disable eqeqeq */

// ----------------------------------------------------------------------

import { MouseEvent, useState } from 'react';
// @mui
import { Box, Divider, Paper, Stack, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '@/components/iconify/Iconify';
import SvgColor from '@/components/svg-color/SvgColor';
// redux
import { dispatch, useSelector } from '@/redux/store';
// hooks
import useResponsive from '@/hooks/useResponsive';
import useMustLoggedInAlert from '@/hooks/useMustLoggedInAlert';
// utils
import { enNumToPerPrice } from '@/utils/persianUtils';
import { calcDiscount } from '@/utils/priceUtils';
//
import addProductToCart from '@/modules/cart/redux/operators/addProductToCart';
import { toast } from 'react-toastify';
import ReportBetterPriceDialog from '../ReportBetterPriceDialog';

// ----------------------------------------------------------------------

const SLOGAN = [
  {
    name: 'گارانتی و اصالت کالا',
    icon: 'jam:crown-f',
  },
  {
    name: 'تضمین اصالت و سلامت فیزیکی',
    icon: 'fluent:checkmark-starburst-20-filled',
  },
  {
    name: ' ارسال رایگان سبد های بالاتر از ۲۵۰،۰۰۰',
    icon: 'eva:car-fill',
  },
];

// ----------------------------------------------------------------------

export default function ProductPricing() {
  //

  const isMobile = useResponsive('down', 'md');

  const { price, discount, id } = useSelector((s) => s.product.product);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const needToLogin = useMustLoggedInAlert();

  const [isLoading, setIsLoading] = useState(false);

  const [isSuccess, setIsSuccess] = useState(false);

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const failureCallback = (msg: string) => {
    setIsLoading(false);
    toast.error(msg);
  };

  const successCallback = () => {
    setIsLoading(false);
    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 2000);
  };

  const addToCart = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!isSuccess && needToLogin()) {
      setIsLoading(true);
      dispatch(addProductToCart(id as string, successCallback, failureCallback));
    }
  };

  return (
    <Paper variant="outlined" sx={{ p: 2 }}>
      <Stack spacing={2}>
        {SLOGAN.map((s) => (
          <Stack key={s.name} direction="row">
            <Iconify color="text.secondary" icon={s.icon} sx={{ mr: 0.8 }} />

            <Typography color="text.secondary" variant="body1" fontWeight={500}>
              {s.name}
            </Typography>
          </Stack>
        ))}
      </Stack>

      <Divider sx={{ my: 3 }} />

      <Stack
        direction={{ md: 'column', xs: 'row-reverse' }}
        sx={{
          ...(isMobile && {
            position: 'fixed',
            bottom: 0,
            left: 0,
            zIndex: (theme) => theme.zIndex.appBar,
            backgroundColor: 'background.paper',
            width: '100%',
            px: { xs: 2, sm: 4 },
            alignItems: 'center',
            boxShadow: (theme) => theme.shadows[16],
          }),
        }}
        justifyContent="space-between"
        component={isMobile ? Paper : Stack}
      >
        <Stack>
          {discount !== 0 && (
            <Stack direction="row" dir="ltr" spacing={2}>
              <Stack direction="row" sx={{ opacity: 0.5 }}>
                <SvgColor src="/assets/icons/products/ic_toman.svg" sx={{ width: 20, ml: 0.5 }} />
                <Typography
                  variant="subtitle1"
                  fontWeight={600}
                  sx={{ textDecoration: 'line-through' }}
                >
                  {enNumToPerPrice(price)}
                </Typography>
              </Stack>
              <Box />
              <Box sx={{ backgroundColor: 'error.light', px: 0.9, borderRadius: 2 }}>
                <Typography color="error.contrastText" variant="subtitle2" dir="rtl">
                  {`${discount}%`} تخفیف
                </Typography>
              </Box>
            </Stack>
          )}

          <Stack direction="row" dir="ltr" sx={{ mt: 1 }}>
            <SvgColor src="/assets/icons/products/ic_toman.svg" sx={{ width: 25, ml: 0.5 }} />
            <Typography letterSpacing={2} variant="h5" fontWeight={600}>
              {discount == 0
                ? enNumToPerPrice(price)
                : enNumToPerPrice(calcDiscount(price, discount))}
            </Typography>
          </Stack>
        </Stack>

        <LoadingButton
          onClick={addToCart}
          loading={isLoading}
          sx={{ my: 4 }}
          fullWidth={!isMobile}
          variant="contained"
          disableElevation
          color="newError"
          startIcon={<Iconify icon="bi:cart-plus-fill" sx={{ width: 18, height: 18 }} />}
        >
          افزودن به سبد خرید
        </LoadingButton>
      </Stack>

      <Stack
        direction="row"
        alignItems="center"
        spacing={1}
        sx={{ mb: 1, cursor: 'pointer', opacity: 0.9 }}
      >
        <Iconify icon="ep:flag" color="error.light" />
        <Typography onClick={() => setIsDialogOpen(true)} variant="body2">
          گزارش قیمت بهتر برای این محصول
        </Typography>
      </Stack>

      <ReportBetterPriceDialog open={isDialogOpen} handleClose={handleDialogClose} />
    </Paper>
  );
}
