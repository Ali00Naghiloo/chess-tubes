import { ChangeEvent, useState } from 'react';
import { toast } from 'react-toastify';
// @mui
import { LoadingButton } from '@mui/lab';
import { InputAdornment, Paper, TextField, Typography } from '@mui/material';
// redux
import { useDispatch } from '@/redux/store';
// modules

import axios from '@/utils/axios';
import { useParams } from 'next/navigation';
import { setCoupon } from '@/modules/online-course/redux/actions';

// ----------------------------------------------------------------------

export default function CheckoutDiscountCode() {
  //

  const [isLoading, setIsLoading] = useState(false);

  const [coupon, setCouponValue] = useState('');

  const params = useParams();

  const dispatch = useDispatch();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCouponValue(e.currentTarget.value);
  };

  const successCallback = (msg?: string) => {
    toast.success(msg ?? 'با موفقیت اعمال شد');
    setIsLoading(false);
  };

  const failureCallback = (msg?: string) => {
    toast.error(msg ?? 'یه مشکلی پیش اومده');
    setIsLoading(false);
  };

  const applyCoupon = async () => {
    setIsLoading(true);
    try {
      const {
        data: { data },
      } = await axios.post<{
        status: boolean;
        data: {
          coupon_discount: number;
          couponId: number;
        };
        message: string;
      }>(`api/online-training/${params.id}/coupon/apply`, {
        code: coupon,
      });
      dispatch(setCoupon({ couponId: data.couponId, coupon_discount: data.coupon_discount }));
      successCallback();
    } catch (error) {
      failureCallback();
    }
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
