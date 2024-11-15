import { ChangeEvent, useState } from 'react';
// @mui
import { Button, InputAdornment, Paper, Stack, TextField, Typography } from '@mui/material';
// components
import SvgColor from '@/components/svg-color/SvgColor';
// hooks
import useResponsive from '@/hooks/useResponsive';
import { useRouter } from 'next/router';
import axiosInstance from '@/utils/axios';
import { toast } from 'react-toastify';
import { useSelector } from '@/redux/store';
import WithdrawalDialog from './WithdrawalDialog';

// ----------------------------------------------------------------------

export default function BankingBalance() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [amount, setAmount] = useState('');

  const { push } = useRouter();

  const isDesktop = useResponsive('up', 'md');

  const data = useSelector((s) => s.walletTransactions);

  const handleClose = () => {
    setIsDialogOpen(false);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  // eslint-disable-next-line consistent-return
  const handleChanrgeSubmit = async () => {
    if (+amount < 100000) return toast.warning('حداقل مبلغ شارژ حساب 100,000 تومان می باشد');
    try {
      const {
        data: {
          data: { redirectUrl },
        },
      } = await axiosInstance.post('api/wallet/charge', { amount: +amount });
      push(redirectUrl);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Paper variant="outlined" sx={{ py: 2, px: { sm: 2, md: 3, lg: 4, xs: 2 } }}>
      <Typography
        variant="h6"
        sx={{
          mb: 2,
          '&::before': { content: "'•'", color: 'primary.main', mr: 0.5 },
        }}
      >
        موجودی
      </Typography>
      <Stack
        direction={{ md: 'row', xs: 'column' }}
        justifyContent="space-between"
        alignItems="flex-start"
      >
        <Stack
          sx={{ ...(!isDesktop && { mb: 2, width: '100%' }) }}
          spacing={1}
          justifyContent="space-between"
        >
          <Stack
            sx={{
              minWidth: { md: 280, xs: '100%' },
              width: 'fit-content',
              bgcolor: 'primary.main',
              p: 1,
              borderRadius: 2,
              color: (t) => t.palette.primary.contrastText,
            }}
          >
            <Typography fontWeight={600}>موجودی :</Typography>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <SvgColor
                src="/assets/icons/home/ic_wallet.svg"
                sx={{ width: 50, height: 50, bgcolor: 'primary.contrastText' }}
              />
              <Stack direction="row" dir="ltr" alignItems="center">
                <SvgColor
                  src="/assets/icons/products/ic_toman.svg"
                  sx={{ width: 30, ml: 0.5, bgcolor: 'primary.contrastText' }}
                />
                <Typography variant="h4">
                  {data.data?.balance.toLocaleString() || '----'}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
          <Stack direction="row" alignItems="center">
            <Typography variant="body2">انتقال موجودی به حساب بانکی :</Typography>
            <Button onClick={() => setIsDialogOpen(true)}>ثبت درخواست</Button>
          </Stack>
        </Stack>
        <Stack
          sx={{ mb: 2, ...(!isDesktop && { width: '100%' }) }}
          direction="row"
          alignItems="center"
          alignSelf="flex-end"
        >
          <TextField
            label="افزایش موجودی"
            size="small"
            placeholder="مبلغ مد نظر به تومان"
            fullWidth
            onChange={handleChange}
            value={amount}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Button
                    variant="contained"
                    disableElevation
                    disableRipple
                    size="small"
                    onClick={handleChanrgeSubmit}
                  >
                    پرداخت
                  </Button>
                </InputAdornment>
              ),
            }}
          />
        </Stack>
      </Stack>

      <WithdrawalDialog open={isDialogOpen} handleClose={handleClose} />
    </Paper>
  );
}
