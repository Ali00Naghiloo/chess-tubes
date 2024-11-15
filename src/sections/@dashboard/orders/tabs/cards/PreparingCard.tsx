// next
import Link from 'next/link';
// components
import Image from '@/components/image/Image';
import SvgColor from '@/components/svg-color/SvgColor';
// routes
import { PATH_DASHBOARD, PATH_PAGE } from '@/routes/paths';
// utils
import { fDate } from '@/utils/formatTime';
import { enNumToPer, enNumToPerPrice } from '@/utils/persianUtils';
// @mui
import { NavigateBefore, Pending } from '@mui/icons-material';
import { Box, Divider, IconButton, Paper, Stack, Typography } from '@mui/material';
// components
import Scrollbar from '@/components/scrollbar/Scrollbar';
// hooks
import useResponsive from '@/hooks/useResponsive';
// types
import { OrdersListItem } from '@/modules/order/models/order';

// ----------------------------------------------------------------------

export default function PreparingCard({
  discount,
  orderDate,
  orderId,
  orderItems,
  price,
  status,
}: OrdersListItem) {
  const isDesktop = useResponsive('up', 'md');

  console.log(orderItems);

  return (
    <Paper
      variant="outlined"
      sx={{
        ...(!isDesktop && { border: 'none' }),
      }}
      component={Link}
      href={PATH_DASHBOARD.order(orderId)}
    >
      <Stack sx={{ p: 1 }} direction="row" justifyContent="space-between" alignItems="center">
        <Stack direction="row" alignItems="center" spacing={1}>
          <Pending color="success" />
          <Typography variant="subtitle1">{status}</Typography>
        </Stack>
        <IconButton>
          <NavigateBefore />
        </IconButton>
      </Stack>

      <Stack flexWrap="wrap" direction="row" alignItems="center" spacing={1} sx={{ p: 1 }}>
        <Typography>{fDate(Number(orderDate))}</Typography>

        <Box sx={{ bgcolor: 'grey.300', borderRadius: 2, width: 5, height: 5 }} />

        <Stack direction="row" alignItems="center" spacing={0.5}>
          <Typography variant="body2" fontWeight={400}>
            کد سفارش
          </Typography>
          <Typography fontWeight={600}>{enNumToPer(orderId)}</Typography>
        </Stack>

        <Box sx={{ bgcolor: 'grey.300', borderRadius: 2, width: 5, height: 5 }} />

        <Stack direction="row" alignItems="center" spacing={0.5}>
          <Typography variant="body2" fontWeight={400}>
            مبلغ
          </Typography>
          <Stack direction="row" dir="ltr">
            <SvgColor src="/assets/icons/products/ic_toman.svg" sx={{ width: 15, ml: 0.5 }} />
            <Typography fontWeight={600}>{enNumToPerPrice(price)}</Typography>
          </Stack>
        </Stack>

        {discount !== null && (
          <>
            <Box sx={{ bgcolor: 'grey.300', borderRadius: 2, width: 5, height: 5 }} />

            <Stack direction="row" alignItems="center" spacing={0.5}>
              <Typography variant="body2" fontWeight={400}>
                تخفیف
              </Typography>
              <Stack direction="row" dir="ltr">
                <SvgColor src="/assets/icons/products/ic_toman.svg" sx={{ width: 15, ml: 0.5 }} />
                <Typography fontWeight={600}>{enNumToPerPrice(discount)}</Typography>
              </Stack>
            </Stack>
          </>
        )}
      </Stack>

      {isDesktop && <Divider sx={{ my: 1 }} />}

      <Scrollbar>
        <Stack direction="row" alignItems="center" spacing={2} sx={{ p: 1, mb: { md: 1, xs: 0 } }}>
          {orderItems.map((item) => (
            <Link
              onClick={(e) => {
                e.stopPropagation();
              }}
              key={item.item_id}
              href={
                // eslint-disable-next-line no-nested-ternary
                item.itemType === 'product'
                  ? PATH_PAGE.product(item.item_id)
                  : item.itemType === 'course'
                    ? PATH_PAGE.course(item.item_id)
                    : PATH_PAGE.onlineCourse(item.item_id)
              }
              rel="noopener noreferrer"
              target="_blank"
              color="red"
            >
              <Image
                src={
                  // eslint-disable-next-line no-nested-ternary
                  item.itemType === 'product'
                    ? PATH_PAGE.productImageUrl(item.image)
                    : item.itemType === 'course'
                      ? PATH_PAGE.productImageUrl(item.image)
                      : PATH_PAGE.productImageUrl(item.image)
                }
                sx={{ width: 60, height: 60, borderRadius: 2 }}
                alt={item.title}
              />
            </Link>
          ))}
        </Stack>
      </Scrollbar>
    </Paper>
  );
}
