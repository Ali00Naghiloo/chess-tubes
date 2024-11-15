import { useState } from 'react';
import { toast } from 'react-toastify';
// next
import { useRouter } from 'next/router';
// @mui
import { Box, Divider, Paper, Stack, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '@/components/iconify/Iconify';
import SvgColor from '@/components/svg-color/SvgColor';
// hooks
import useMustLoggedInAlert from '@/hooks/useMustLoggedInAlert';
// redux
import { useDispatch, useSelector } from '@/redux/store';
// utils
import { enNumToPerPrice } from '@/utils/persianUtils';
import { calcDiscount } from '@/utils/priceUtils';
// modules
import addCourseToCart from '@/modules/cart/redux/operators/addCourseToCart';

// ----------------------------------------------------------------------

export default function CourseSidePricing() {
  //

  const [isLoading, setIsLoading] = useState(false);

  const { isReady } = useRouter();

  const dispatch = useDispatch();

  const { price, discount, courseId, title, subtitle } = useSelector((s) => s.course.course);

  const checkLogin = useMustLoggedInAlert();

  const failureCallBack = (msg?: string) => {
    setIsLoading(false);

    toast.error(msg ?? 'یه مشکلی پیش اومده');
  };

  const successCallBack = () => {
    setIsLoading(false);
  };

  const addToCart = () => {
    if (checkLogin() && isReady) {
      setIsLoading(true);
      dispatch(addCourseToCart(courseId, successCallBack, failureCallBack));
    }
  };
  return (
    <Paper
      variant="outlined"
      sx={{
        p: 2,
      }}
    >
      <Typography variant="h6">{title}</Typography>
      <Typography variant="subtitle2" fontWeight={500}>
        {subtitle}
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Stack justifyContent="space-between">
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
              {discount === 0
                ? enNumToPerPrice(price)
                : enNumToPerPrice(calcDiscount(price, discount))}
            </Typography>
          </Stack>
        </Stack>

        <LoadingButton
          loading={isLoading}
          onClick={addToCart}
          sx={{ mt: 2 }}
          variant="contained"
          disableElevation
          color="newError"
          startIcon={<Iconify icon="bi:cart-plus-fill" sx={{ width: 18, height: 18 }} />}
        >
          خرید دوره آموزشی
        </LoadingButton>
      </Stack>
    </Paper>
  );
}
