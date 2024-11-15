import React from 'react';
// @mui
import { Chip, Divider, Paper, Stack, Typography } from '@mui/material';
// components
import Iconify from '@/components/iconify/Iconify';
import Image from '@/components/image/Image';
import Scrollbar from '@/components/scrollbar/Scrollbar';
import SvgColor from '@/components/svg-color/SvgColor';
import HorizontalScrollbar from '@/components/horizontal-scrollbar';
// utils
import { fDate } from '@/utils/formatTime';
import { enNumToPer, enNumToPerPrice } from '@/utils/persianUtils';
// redux
import { useSelector } from '@/redux/store';
// paths
import { PATH_PAGE } from '@/routes/paths';

// ----------------------------------------------------------------------

export default function CheckoutSummaryItems() {
  //

  const { totalDiscount, totalPrice, couponDiscount, cartItems, totalCount } = useSelector(
    (s) => s.cart
  );

  return (
    <Paper variant="outlined" sx={{ py: 2, px: { sm: 2, md: 3, lg: 4, xs: 2 } }}>
      <Typography
        variant="h6"
        sx={{
          mb: 3,
          '&::before': { content: "'•'", color: 'primary.main', mr: 0.5 },
        }}
      >
        خلاصه سفارش
      </Typography>

      <Stack spacing={2} alignItems="center" direction="row" justifyContent="flex-start">
        <Iconify color="info.main" icon="mdi:truck-fast" sx={{ width: 25, height: 25 }} />
        <Typography variant="h6">
          {fDate(new Date().getTime() / 1000)} الی{' '}
          {fDate(new Date().getTime() / 1000 + 24 * 7 * 60 * 60)}
        </Typography>
        <Chip label={`${enNumToPer(totalCount)} محصول`} size="small" />
      </Stack>

      <Stack sx={{ mt: 1 }} direction="row" alignItems="center" spacing={1}>
        <Typography variant="body2">هزینه ارسال :</Typography>
        <Typography fontWeight={500}>به عهده مشتری</Typography>
      </Stack>

      <Stack spacing={2} sx={{ mt: 2 }}>
        <Stack>
          <Scrollbar>
            <HorizontalScrollbar disableArrows>
              <Stack
                divider={<Divider orientation="vertical" flexItem />}
                direction="row"
                spacing={1}
                dir="rtl"
                justifyContent="flex-start"
                sx={{ display: 'inline-flex', width: { lg: '100%', xs: 'inherit' } }}
              >
                {cartItems?.map((item, i) => (
                  <React.Fragment key={`${item.itemId}_${i}`}>
                    <Image
                      alt={item.Title}
                      src={PATH_PAGE.productImageUrl(item.image)}
                      sx={{ width: 70, height: 70, borderRadius: 2 }}
                    />
                    {i === cartItems.length - 1 && <Divider orientation="vertical" flexItem />}
                  </React.Fragment>
                ))}
              </Stack>
            </HorizontalScrollbar>
          </Scrollbar>
        </Stack>

        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography variant="body2">مبلغ مرسوله : </Typography>
          <Stack direction="row">
            <Typography variant="subtitle1" fontWeight={600}>
              {enNumToPerPrice(
                Number(totalPrice) - (Number(totalDiscount) + Number(couponDiscount))
              )}
            </Typography>
            <SvgColor src="/assets/icons/products/ic_toman.svg" sx={{ width: 20, ml: 0.5 }} />
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  );
}
