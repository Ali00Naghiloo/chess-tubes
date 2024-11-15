// next
import { useRouter } from 'next/router';
// @mui
import { Box, Divider, Paper, Stack, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '@/components/iconify/Iconify';
import SvgColor from '@/components/svg-color/SvgColor';
// hooks
// redux
import { useSelector } from '@/redux/store';
// utils
import { enNumToPerPrice } from '@/utils/persianUtils';
import { calcDiscount } from '@/utils/priceUtils';
// modules

// ----------------------------------------------------------------------

export default function CourseSidePricing() {
  //

  const { push } = useRouter();

  const { price, discount, title, subtitle, id } = useSelector((s) => s.onlineCourse.course);

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
          {discount.discountPercent !== 0 && (
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
                  {`${discount.discountPercent}%`} تخفیف
                </Typography>
              </Box>
            </Stack>
          )}

          <Stack direction="row" dir="ltr" sx={{ mt: 1 }}>
            <SvgColor src="/assets/icons/products/ic_toman.svg" sx={{ width: 25, ml: 0.5 }} />
            <Typography letterSpacing={2} variant="h5" fontWeight={600}>
              {discount.discountPercent === 0
                ? enNumToPerPrice(price)
                : enNumToPerPrice(calcDiscount(price, discount.discountPercent))}
            </Typography>
          </Stack>
        </Stack>

        <LoadingButton
          onClick={() => push(`/online-trainings/${id}`)}
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
