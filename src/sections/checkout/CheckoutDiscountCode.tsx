import { ChangeEvent, useState } from 'react';
import { toast } from 'react-toastify';
// @mui
import { LoadingButton } from '@mui/lab';
import { InputAdornment, Paper, TextField, Typography } from '@mui/material';
// redux
import { useDispatch } from '@/redux/store';
// modules
import applyCouponToCart from '@/modules/cart/redux/operators/applyCouponToCart';

// ----------------------------------------------------------------------

export default function CheckoutDiscountCode() {
  //

  const [isLoading, setIsLoading] = useState(false);

  const [coupon, setCoupon] = useState('');

  const dispatch = useDispatch();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCoupon(e.currentTarget.value);
  };

  const successCallback = (msg: string) => {
    toast.success(msg ?? 'با موفقیت اعمال شد');
    setIsLoading(false);
  };

  const failureCallback = (msg: string) => {
    toast.error(msg ?? 'یه مشکلی پیش اومده');
    setIsLoading(false);
  };

  const applyCoupon = () => {
    setIsLoading(true);
    dispatch(applyCouponToCart(coupon, successCallback, failureCallback));
  };

  return (
    <Paper variant="outlined" sx={{ py: 2, px: { sm: 2, md: 3, lg: 4, xs: 2 } }}>
      <Typography
        variant="h6"
        sx={{
          mb: 3,
          '&::before': { content: "'•'", color: 'primary.main', mr: 0.5 },
        }}
      >
        کد تخفیف
      </Typography>

      <TextField
        size="small"
        placeholder="کد تخفیف خود را وارد کنید"
        value={coupon}
        onChange={handleChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <LoadingButton
                loading={isLoading}
                onClick={applyCoupon}
                variant="contained"
                disableElevation
                disableRipple
                size="small"
              >
                اعمال
              </LoadingButton>
            </InputAdornment>
          ),
        }}
      />
    </Paper>
  );
}
