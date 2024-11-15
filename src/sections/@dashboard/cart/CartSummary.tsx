// components
import SvgColor from '@/components/svg-color/SvgColor';
// hooks
import useResponsive from '@/hooks/useResponsive';
// @mui
import { Box, Button, Paper, Stack, Typography } from '@mui/material';
// routes
import { PATH_PAGE } from '@/routes/paths';
// redux
import { useSelector } from '@/redux/store';
// utils
import { enNumToPerPrice } from '@/utils/persianUtils';

// ----------------------------------------------------------------------

export default function CartSummary() {
  //

  const isMobile = useResponsive('down', 'md');

  const { totalPrice, couponDiscount, totalDiscount } = useSelector((s) => s.cart);

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
        <Button href={PATH_PAGE.checkout} size="large" variant="contained" disableElevation>
          ثبت سفارش
        </Button>

        <Stack justifyContent="space-between" alignItems="center">
          <Typography variant="subtitle2">جمع سبد خرید</Typography>
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
