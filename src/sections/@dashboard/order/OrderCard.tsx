import { toast } from 'react-toastify';
import { useState } from 'react';
// @mui
import { Box, Button, Divider, Paper, Stack, Typography } from '@mui/material';
import { Cancel, Check, ErrorRounded, KeyboardReturn, Pending } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
// utils
import { fDate, fDistance } from '@/utils/formatTime';
import { enNumToPer, enNumToPerPrice } from '@/utils/persianUtils';
// components
import SvgColor from '@/components/svg-color/SvgColor';
// hooks
import useResponsive from '@/hooks/useResponsive';
// operators
import resumeOrder from '@/modules/order/redux/operators/resumeOrder';
// redux
import { useDispatch } from '@/redux/store';
// types
import { Order } from '@/modules/order/models/order';
import Link from 'next/link';
import OrderItems from './OrderItems';
import Dialog from './Dialog';

// ----------------------------------------------------------------------

const orderStateMapper = {
  completed: { color: 'success.main', icon: <Check fontSize="small" color="success" /> },
  cancelled: { color: 'error.main', icon: <Cancel fontSize="small" color="error" /> },
  inProgress: { color: 'success.main', icon: <Pending fontSize="small" color="success" /> },
  pending: { color: 'warning.main', icon: <ErrorRounded fontSize="small" color="warning" /> },
  returned: { color: 'text.secondary', icon: <KeyboardReturn fontSize="small" color="disabled" /> },
};

// ----------------------------------------------------------------------

export default function OrderCard({
  orderDate,
  orderDiscount,
  orderId,
  orderItems,
  orderPrice,
  shipment,
  status,
  state,
  orderExpire,
}: Order) {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const isDesktop = useResponsive('up', 'md');

  const dispatch = useDispatch();

  const successCallback = () => {
    setIsLoading(false);
    toast.success('با موفقیت انجام شد');
  };

  const failureCallback = (msg: string) => {
    setIsLoading(false);
    toast.error(msg);
  };

  const resumeOrderHandler = () => {
    setIsLoading(true);
    dispatch(resumeOrder(`${orderId}`, successCallback, failureCallback));
  };

  const handleClose = () => {
    setIsOpen(false);
  };
  const handleOpenModal = () => {
    setIsOpen(true);
  };

  return (
    <Paper variant="outlined">
      <Dialog open={isOpen} handleClose={handleClose} />
      <Stack
        spacing={1}
        sx={{ p: 1, px: 2, my: 1 }}
        direction={{ md: 'row', xs: 'column' }}
        justifyContent="space-between"
        alignItems={{ md: 'center', xs: 'flex-start' }}
      >
        <Stack direction="row" alignItems="center" spacing={0.5}>
          {orderStateMapper[state].icon}
          <Typography fontWeight={500} variant="body2" color={orderStateMapper[state].color}>
            {state !== 'pending'
              ? status
              : ` سفارش شما در صورت عدم پرداخت (${fDistance(
                  new Date(orderExpire as number) as Date
                )}) دیگر لغو خواهد شد`}
          </Typography>
        </Stack>
        {state === 'pending' && (
          <Button
            fullWidth={!isDesktop}
            variant="contained"
            disableElevation
            onClick={handleOpenModal}
          >
            پرداخت
          </Button>
        )}
      </Stack>

      <Divider />

      <Stack
        spacing={1}
        flexWrap="wrap"
        sx={{ p: 1, px: 2, my: 1 }}
        direction={{ md: 'row', xs: 'column' }}
        justifyContent="space-between"
        alignItems={{ md: 'center', xs: 'flex-start' }}
      >
        <Stack
          direction={{ md: 'row', xs: 'column' }}
          spacing={1}
          sx={{ mt: 1 }}
          alignItems="center"
          flexWrap="wrap"
          dir="rtl"
          divider={
            isDesktop && <Box sx={{ bgcolor: 'grey.300', borderRadius: 2, width: 5, height: 5 }} />
          }
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={0.5}
            sx={{ ...(!isDesktop && { width: '100%' }) }}
          >
            <Typography variant="body2" fontWeight={400}>
              کد پیگیری سفارش :
            </Typography>
            <Typography fontWeight={600}>
              {enNumToPer(shipment.trackingCode || '------')}
            </Typography>
          </Stack>

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={0.5}
            sx={{ ...(!isDesktop && { width: '100%' }) }}
          >
            <Typography variant="body2" fontWeight={400}>
              تاریخ ثبت سفارش :
            </Typography>
            <Typography fontWeight={600}>{fDate(orderDate)}</Typography>
          </Stack>
        </Stack>

        {shipment.trackingUrl && (
          <Link href={shipment.trackingUrl} style={{ width: !isDesktop ? '100%' : 'fit-content' }}>
            <Button
              fullWidth={!isDesktop}
              variant="contained"
              disableElevation
              sx={{ ...(!isDesktop && { width: '100%' }) }}
            >
              پیگیری سفارش
            </Button>
          </Link>
        )}
      </Stack>

      <Divider sx={{ my: 1 }} variant="middle" />

      <Stack
        direction={{ md: 'row', xs: 'column' }}
        spacing={1}
        sx={{ p: 1, px: 2 }}
        alignItems="center"
        flexWrap="wrap"
        divider={
          isDesktop && <Box sx={{ bgcolor: 'grey.300', borderRadius: 2, width: 5, height: 5 }} />
        }
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={0.5}
          sx={{ ...(!isDesktop && { width: '100%' }) }}
        >
          <Typography variant="body2" fontWeight={400}>
            تحویل گیرنده :
          </Typography>
          <Typography fontWeight={600}>{shipment.recipientName}</Typography>
        </Stack>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={0.5}
          sx={{ ...(!isDesktop && { width: '100%' }) }}
        >
          <Typography variant="body2" fontWeight={400}>
            شماره موبایل :
          </Typography>
          <Typography fontWeight={600}>{enNumToPer(shipment.mobile)}</Typography>
        </Stack>
      </Stack>

      <Stack
        direction={{ md: 'row', xs: 'column' }}
        justifyContent="space-between"
        alignItems="center"
        sx={{ px: 2 }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={0.5}
          sx={{ ...(!isDesktop && { width: '100%' }) }}
        >
          <Typography variant="body2" fontWeight={400}>
            آدرس :
          </Typography>
          <Typography fontWeight={600}>{shipment.address}</Typography>
        </Stack>
      </Stack>

      <Divider sx={{ my: 1 }} />

      <Stack
        direction={{ md: 'row', xs: 'column' }}
        spacing={1}
        sx={{ p: 1, px: 2 }}
        alignItems="center"
        flexWrap="wrap"
        divider={
          isDesktop && <Box sx={{ bgcolor: 'grey.300', borderRadius: 2, width: 5, height: 5 }} />
        }
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={0.5}
          sx={{ ...(!isDesktop && { width: '100%' }) }}
        >
          <Typography variant="body2" fontWeight={400}>
            مبلغ :
          </Typography>
          <Stack direction="row" dir="ltr">
            <SvgColor src="/assets/icons/products/ic_toman.svg" sx={{ width: 15, ml: 0.5 }} />
            <Typography fontWeight={600}>{enNumToPerPrice(orderPrice)}</Typography>
          </Stack>
        </Stack>

        {orderDiscount !== null && (
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={0.5}
            sx={{ ...(!isDesktop && { width: '100%' }) }}
          >
            <Typography variant="body2" fontWeight={400}>
              سود شما از خرید :
            </Typography>
            <Stack direction="row" dir="ltr">
              <SvgColor src="/assets/icons/products/ic_toman.svg" sx={{ width: 15, ml: 0.5 }} />
              <Typography fontWeight={600}>{enNumToPerPrice(orderDiscount)}</Typography>
            </Stack>
          </Stack>
        )}
      </Stack>

      <Stack
        direction={{ md: 'row', xs: 'column' }}
        spacing={1}
        sx={{ p: 1, px: 2 }}
        alignItems="center"
        flexWrap="wrap"
        divider={
          isDesktop && <Box sx={{ bgcolor: 'grey.300', borderRadius: 2, width: 5, height: 5 }} />
        }
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={0.5}
          sx={{ ...(!isDesktop && { width: '100%' }) }}
        >
          <Typography variant="body2" fontWeight={400}>
            نوع ارسال
          </Typography>
          <Typography fontWeight={600}>{shipment.shipping_title}</Typography>
        </Stack>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={0.5}
          sx={{ ...(!isDesktop && { width: '100%' }) }}
        >
          <Typography variant="body2" fontWeight={400}>
            نوع پرداخت
          </Typography>
          <Typography fontWeight={600}>{shipment.payType}</Typography>
        </Stack>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={0.5}
          sx={{ ...(!isDesktop && { width: '100%' }) }}
        >
          <Typography variant="body2" fontWeight={400}>
            هزینه ارسال :
          </Typography>
          <Stack direction="row" dir="ltr">
            <SvgColor src="/assets/icons/products/ic_toman.svg" sx={{ width: 15, ml: 0.5 }} />
            <Typography fontWeight={600}>{enNumToPerPrice(shipment.cost)}</Typography>
          </Stack>
        </Stack>
      </Stack>

      <Divider sx={{ my: 2 }} />
      <Stack
        direction={{ md: 'row', xs: 'column' }}
        alignItems="center"
        justifyContent="space-between"
        sx={{ p: 1, px: 2 }}
        spacing={1}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={0.5}
          sx={{ ...(!isDesktop && { width: '100%' }) }}
        >
          <Typography variant="body2" fontWeight={400}>
            تحویل :
          </Typography>
          <Stack direction="row" alignItems="center" spacing={1.5}>
            <Typography fontWeight={500}>{fDate(orderDate)}</Typography>
            <Typography fontWeight={500}>الی</Typography>
            <Typography fontWeight={500}>
              {fDate(
                new Date(Number(orderDate)).setDate(new Date(Number(orderDate)).getDate() + 5)
              )}
            </Typography>
          </Stack>
        </Stack>
      </Stack>

      <Divider sx={{ borderStyle: 'dotted', my: 1, mb: 4 }} variant="middle" />

      <OrderItems items={orderItems} />

      {state === 'cancelled' && (
        <>
          <Divider sx={{ my: 2 }} />
          <Box sx={{ p: 2 }}>
            <LoadingButton
              loading={isLoading}
              endIcon={<KeyboardReturn />}
              variant="contained"
              disableElevation
              onClick={resumeOrderHandler}
            >
              از سرگیری سفارش
            </LoadingButton>
          </Box>
        </>
      )}
    </Paper>
  );
}
