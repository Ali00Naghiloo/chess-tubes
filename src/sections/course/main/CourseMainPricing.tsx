import { toast } from 'react-toastify';
import { useState } from 'react';
// next
import { useRouter } from 'next/router';
// @mui
import { Box, Stack, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '@/components/iconify/Iconify';
import SvgColor from '@/components/svg-color/SvgColor';
// hooks
import useMustLoggedInAlert from '@/hooks/useMustLoggedInAlert';
import useResponsive from '@/hooks/useResponsive';
// redux
import { useDispatch, useSelector } from '@/redux/store';
// utils
import { enNumToPerPrice } from '@/utils/persianUtils';
import { calcDiscount } from '@/utils/priceUtils';
// modules
import addCourseToCart from '@/modules/cart/redux/operators/addCourseToCart';

// ----------------------------------------------------------------------

export default function CourseMainPricing() {
  //

  const isMobile = useResponsive('down', 'sm');

  const [isLoading, setIsLoading] = useState(false);

  const { isReady } = useRouter();

  const dispatch = useDispatch();

  const { price, discount, courseId } = useSelector((s) => s.course.course);

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
    <Box>
      <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 3 }}>
        <Iconify
          icon="dashicons:welcome-learn-more"
          color="text.secondary"
          sx={{ width: 35, height: 35 }}
        />

        <Typography variant="h6">همین الان شروع به یادگیری کنید!</Typography>
      </Stack>
      <Stack direction="row-reverse" justifyContent="space-between" alignItems="flex-start">
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
                  {`${discount}%`} {!isMobile ?? 'تخفیف'}
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
    </Box>
  );
}
