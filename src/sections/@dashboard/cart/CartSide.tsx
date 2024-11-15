// components
import SvgColor from '@/components/svg-color/SvgColor';
// hooks
import useResponsive from '@/hooks/useResponsive';
// redux
import { useSelector } from '@/redux/store';
// routes
import { PATH_PAGE } from '@/routes/paths';
// utils
import { enNumToPer, enNumToPerPrice } from '@/utils/persianUtils';
import { calcDiscountPercent } from '@/utils/priceUtils';
// @mui
import { Box, Button, Paper, Stack, Typography } from '@mui/material';

// ----------------------------------------------------------------------

export default function CartSide() {
  //

  const isDesktop = useResponsive('up', 'md');

  const { totalPrice, totalCount, couponDiscount, totalDiscount } = useSelector((s) => s.cart);

  // const prices: any = cartItems?.map((i) => {
  //   const total = Number(i.price) * Number(i.quantity);
  //   const discountValue = total * (Number(i.discount) / 100);
  //   const realValue = total - discountValue;
  //   return { realValue, discountValue };
  // });

  // const priceWithDiscount = prices.map((p: any) => p.realValue).reduce((f: any, s: any) => f + s);

  // const discountValue = prices.map((p: any) => p.discountValue).reduce((f: any, s: any) => f + s);

  return (
    <Box
      sx={{
        position: { md: 'sticky', xs: 'static' },
        right: 0,
        top: 150,
        width: { md: 350, xs: '100%' },
        height: 'fit-content',
        pb: { md: 0, xs: 3 },
      }}
    >
      <Paper variant="outlined" sx={{ p: 2, ...(!isDesktop && { border: 'none' }) }}>
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
              سود شما از خرید
            </Typography>
            <Stack direction="row">
              <Typography variant="subtitle1" color="error.light" fontWeight={600}>
                (
                {enNumToPer(
                  calcDiscountPercent(
                    totalPrice,
                    Number(totalDiscount ?? '0') + Number(couponDiscount ?? '0')
                  ).toFixed(0)
                )}
                ٪) {enNumToPerPrice(Number(totalDiscount ?? '0') + Number(couponDiscount ?? '0'))}
              </Typography>
              <SvgColor
                src="/assets/icons/products/ic_toman.svg"
                sx={{ width: 20, ml: 0.5, bgcolor: 'error.light' }}
              />
            </Stack>
          </Stack>

          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="subtitle2">جمع سبد خرید</Typography>
            <Stack direction="row">
              <Typography variant="subtitle1" fontWeight={600}>
                {enNumToPerPrice(
                  Number(totalPrice ?? '0') -
                    (Number(totalDiscount ?? '0') + Number(couponDiscount ?? '0'))
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
            <Button href={PATH_PAGE.checkout} fullWidth variant="contained" disableElevation>
              ثبت سفارش
            </Button>
          )}
        </Stack>
      </Paper>
      <Typography color="text.secondary" variant="body2" fontWeight={500} sx={{ px: 1, mt: 1 }}>
        هزینه این سفارش هنوز پرداخت نشده و درصورت اتمام موجودی، کالا ها از سبد خرید حذف می شوند
      </Typography>
    </Box>
  );
}
