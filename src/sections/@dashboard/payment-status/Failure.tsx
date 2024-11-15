// @mui
import { Alert, Button, Paper, Stack, Typography } from '@mui/material';
import { Info } from '@mui/icons-material';
// routes
import { PATH_DASHBOARD } from '@/routes/paths';
// utils
import { fDate } from '@/utils/formatTime';
//
import { FailurePaymentIllustration } from '@/assets/illustrations';

// ----------------------------------------------------------------------

export default function Failure() {
  return (
    <Stack spacing={4}>
      <Paper variant="outlined" sx={{ py: 2, px: { md: 4, xs: 2 } }}>
        <Stack
          direction={{ md: 'row', xs: 'column-reverse' }}
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack spacing={1} alignItems={{ md: 'flex-start', xs: 'center' }} sx={{ mb: 4 }}>
            <Typography variant="h5" color="error.main">
              متاسفانه پرداخت شما ناموفق بود !
            </Typography>
            <Stack direction="row" alignItems="center">
              <Typography variant="body2">شماره سفارش :</Typography>
              <Typography fontWeight={600}>۵۱۲۲۳۴۴</Typography>
            </Stack>
          </Stack>
          <FailurePaymentIllustration sx={{ width: 150, height: 150 }} />
        </Stack>
        <Stack alignItems={{ md: 'flex-start', xs: 'center' }} spacing={2}>
          <Alert severity="error">
            <Typography color="error.dark" fontWeight={600}>
              این سفارش ثبت نهایی نشده و تا حدود ۴۸ دقیقه دیگر برای شما رزرو شده است. جهت ثبت نهایی
              سفارش نسبت به پرداخت اقدام نمایید
            </Typography>
          </Alert>
          <Button
            href={PATH_DASHBOARD.order('1')}
            variant="contained"
            disableElevation
            size="large"
          >
            پرداخت مجدد
          </Button>
        </Stack>
      </Paper>

      <Paper variant="outlined" sx={{ py: 2, px: { md: 4, xs: 2 } }}>
        <Stack direction="row" alignItems="center" sx={{ opacity: 0.5, mb: 4, mt: 1 }} spacing={2}>
          <Info />
          <Typography fontWeight={500}>
            چنانچه مبلغی از حساب شما کسر شده است، تا ۲۴ ساعت آینده به حساب شما باز خواهد گشت.
          </Typography>
        </Stack>

        <Typography variant="h6" sx={{ mb: 2 }}>
          جزییات پرداخت
        </Typography>
        <Stack spacing={0.5}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent={{ sm: 'flex-start', xs: 'space-between' }}
            spacing={1}
          >
            <Typography variant="body2">درگاه : </Typography>
            <Typography fontWeight={500}>بانک ملی</Typography>
          </Stack>

          <Stack
            direction="row"
            alignItems="center"
            justifyContent={{ sm: 'flex-start', xs: 'space-between' }}
            spacing={1}
          >
            <Typography variant="body2">شماره پیگیری : </Typography>
            <Typography fontWeight={500}>۲۱۲۴۵۱۲</Typography>
          </Stack>

          <Stack
            direction="row"
            alignItems="center"
            justifyContent={{ sm: 'flex-start', xs: 'space-between' }}
            spacing={1}
          >
            <Typography variant="body2">تاریخ : </Typography>
            <Typography fontWeight={500}>{fDate(new Date())}</Typography>
          </Stack>
        </Stack>
      </Paper>
    </Stack>
  );
}
