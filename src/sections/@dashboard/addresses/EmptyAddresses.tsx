// @mui
import { EmptyAddressesIllustration } from '@/assets/illustrations';
import { Button, Stack, Typography } from '@mui/material';

// ----------------------------------------------------------------------

type Props = {
  openDialog: any;
};

export function EmptyAddresses({ openDialog }: Props) {
  return (
    <Stack alignItems="center" justifyContent="center" sx={{ height: '75vh' }}>
      <Typography variant="h5">هیچ آدرسی یافت نشد!</Typography>
      <EmptyAddressesIllustration sx={{ width: 200 }} />
      <Typography variant="subtitle2" sx={{ mt: 1, textAlign: 'center' }}>
        برای پردازش سفارش و ارسال محصولات نیاز به ثبت محل دریافت محصول می باشد
      </Typography>
      <Button onClick={openDialog} variant="contained" disableElevation sx={{ mt: 2 }}>
        ثبت آدرس جدید
      </Button>
    </Stack>
  );
}
