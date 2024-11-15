// next
import Link from 'next/link';
// components
import Image from '@/components/image/Image';
import SvgColor from '@/components/svg-color/SvgColor';
// routes
import { PATH_DASHBOARD, PATH_PAGE } from '@/routes/paths';
// utils
import { fDate, fDistance } from '@/utils/formatTime';
import { enNumToPer } from '@/utils/persianUtils';
// @mui
import { ErrorRounded, NavigateBefore } from '@mui/icons-material';
import {
  Box,
  Button,
  Divider,
  IconButton,
  LinearProgress,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
// hooks
import useResponsive from '@/hooks/useResponsive';
// components
import Scrollbar from '@/components/scrollbar/Scrollbar';
// types
import { InProgressProps } from '../types';
// ----------------------------------------------------------------------

export default function WaitForPayCard({
  date,
  id,
  price,
  offPrice,
  expireDate,
  currentStep,
  items,
  nextStep,
  deliveryDate,
}: InProgressProps) {
  //

  const isDesktop = useResponsive('up', 'md');

  return (
    <Paper
      variant="outlined"
      sx={{
        ...(!isDesktop && { border: 'none' }),
      }}
      component={Link}
      href={PATH_DASHBOARD.order(id)}
    >
      <Stack sx={{ p: 1 }} direction="row" justifyContent="space-between" alignItems="center">
        <Stack direction="row" alignItems="center" spacing={1}>
          <ErrorRounded color="warning" />
          <Typography variant="subtitle1">در انتظار پرداخت</Typography>
        </Stack>
        <IconButton>
          <NavigateBefore />
        </IconButton>
      </Stack>

      <Stack flexWrap="wrap" direction="row" alignItems="center" spacing={1} sx={{ p: 1 }}>
        <Typography>{fDate(date)}</Typography>

        <Box sx={{ bgcolor: 'grey.300', borderRadius: 2, width: 5, height: 5 }} />

        <Stack direction="row" alignItems="center" spacing={0.5}>
          <Typography variant="body2" fontWeight={400}>
            کد سفارش
          </Typography>
          <Typography fontWeight={600}>{enNumToPer(id)}</Typography>
        </Stack>

        <Box sx={{ bgcolor: 'grey.300', borderRadius: 2, width: 5, height: 5 }} />

        <Stack direction="row" alignItems="center" spacing={0.5}>
          <Typography variant="body2" fontWeight={400}>
            مبلغ
          </Typography>
          <Stack direction="row" dir="ltr">
            <SvgColor src="/assets/icons/products/ic_toman.svg" sx={{ width: 15, ml: 0.5 }} />
            <Typography fontWeight={600}>{enNumToPer(price)}</Typography>
          </Stack>
        </Stack>

        {offPrice !== null && (
          <>
            <Box sx={{ bgcolor: 'grey.300', borderRadius: 2, width: 5, height: 5 }} />

            <Stack direction="row" alignItems="center" spacing={0.5}>
              <Typography variant="body2" fontWeight={400}>
                تخفیف
              </Typography>
              <Stack direction="row" dir="ltr">
                <SvgColor src="/assets/icons/products/ic_toman.svg" sx={{ width: 15, ml: 0.5 }} />
                <Typography fontWeight={600}>{enNumToPer(offPrice)}</Typography>
              </Stack>
            </Stack>
          </>
        )}
      </Stack>

      {isDesktop && <Divider sx={{ my: 1 }} />}

      {isDesktop && (
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ p: 1 }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="body2" fontWeight={400}>
              تحویل
            </Typography>
            <Typography fontWeight={500} variant="body2">
              {fDate(deliveryDate)} الی {fDate(new Date(deliveryDate).setHours(24 * 5))}
            </Typography>
          </Stack>

          <Stack spacing={0.5} sx={{ p: 1 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={8}>
              <Typography variant="body2" fontWeight={600} color="warning.main">
                در انتظار پرداخت
              </Typography>
              <Stack direction="row" alignItems="center" spacing={0.5}>
                <Typography variant="body2">مبلغ قابل پرداخت</Typography>
                <Stack direction="row" dir="ltr">
                  <SvgColor src="/assets/icons/products/ic_toman.svg" sx={{ width: 15, ml: 0.5 }} />
                  <Typography fontWeight={600}>{enNumToPer(price)}</Typography>
                </Stack>
              </Stack>
            </Stack>
            <LinearProgress
              color="warning"
              variant="determinate"
              value={10}
              sx={{ transform: 'scale(-1)' }}
            />
          </Stack>
        </Stack>
      )}

      <Scrollbar>
        <Stack direction="row" alignItems="center" spacing={2} sx={{ p: 1, mb: 1 }}>
          {items.map((i) => (
            <Link key={i.id} href={PATH_PAGE.product(i.id)}>
              <Image src={i.src} sx={{ width: 60, height: 60, borderRadius: 2 }} alt={i.name} />
            </Link>
          ))}
        </Stack>
      </Scrollbar>

      <Stack
        spacing={1}
        sx={{ p: 1, px: 2, mb: 1 }}
        direction={{ md: 'row', xs: 'column' }}
        justifyContent="space-between"
        alignItems={{ md: 'center', xs: 'flex-start' }}
      >
        <Stack direction="row" alignItems="center" spacing={0.5}>
          <ErrorRounded fontSize="small" color="warning" />
          <Typography fontWeight={500} variant="body2" color="warning.main">
            سفارش شما در صورت عدم پرداخت {`${fDistance(expireDate as Date)}`} دیگر لغو خواهد شد
          </Typography>
        </Stack>
        <Button fullWidth={!isDesktop} variant="contained" disableElevation>
          پرداخت
        </Button>
      </Stack>
    </Paper>
  );
}
