import { MouseEvent, useState } from 'react';
import { toast } from 'react-toastify';
// @mui
import { Box, Link, Paper, PaperProps, Stack, Typography, alpha } from '@mui/material';
import { Star } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
// utils
import { enNumToPer, enNumToPerPrice } from '@/utils/persianUtils';
import { bgBlur } from '@/utils/cssStyles';
// types
import { ProductCardProps } from '@/modules/product/models/product';
// redux
import { useDispatch } from '@/redux/store';
// utils
import { calcDiscount } from '@/utils/priceUtils';
// components
import Image from '@/components/image/';
import SvgColor from '@/components/svg-color/';
import Iconify from '@/components/iconify/Iconify';
// routes
import { PATH_PAGE } from '@/routes/paths';
// operators
import addProductToCart from '@/modules/cart/redux/operators/addProductToCart';
import useMustLoggedInAlert from '@/hooks/useMustLoggedInAlert';

// ----------------------------------------------------------------------

export type ShopCardProps = ProductCardProps & {
  paperProps?: PaperProps;
};

export default function ShopCard({
  discount,
  id,
  mainImage,
  title,
  price,
  rating,
  paperProps,
}: ShopCardProps) {
  //
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const [isSuccess, setIsSuccess] = useState(false);

  const needToLogin = useMustLoggedInAlert();

  const failureCallback = (msg: string) => {
    setIsLoading(false);
    toast.error(msg);
  };

  const successCallback = () => {
    setIsLoading(false);
    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 2000);
  };

  const addToCart = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!isSuccess && needToLogin()) {
      setIsLoading(true);
      dispatch(addProductToCart(id as string, successCallback, failureCallback));
    }
  };

  return (
    <Paper
      dir="ltr"
      variant="outlined"
      sx={{
        width: 200,
        height: 330,
        position: 'relative',
        cursor: 'pointer',
        ...(paperProps != null && { ...paperProps.sx }),
        ...(discount != null && {
          border: 1,
          borderColor: (t) => alpha(t.palette.error.light, 0.5),
          boxShadow: (t) => `0px 1px 7px 0.5px ${t.palette.primary.light}`,
        }),
      }}
    >
      <Link href={PATH_PAGE.product(id)} color="inherit" underline="none">
        <Image
          alt={title}
          src={PATH_PAGE.productImageUrl(mainImage)}
          style={{ objectFit: 'contain' }}
          sx={{ width: '100%', height: 200, borderRadius: 0.5 }}
        />
        <Box dir="rtl" sx={{ mt: 1.5 }}>
          <Typography
            variant="button"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: '2',
              WebkitBoxOrient: 'vertical',
              height: 37,
              lineHeight: 1.4,
              px: 1,
            }}
            fontWeight={600}
          >
            {title}
          </Typography>
        </Box>
        <Box sx={{ px: 1 }}>
          {discount != null && (
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              sx={{
                position: 'absolute',
                top: 12,
                left: 15,
                bgcolor: (theme) =>
                  discount.discountPercent
                    ? bgBlur({ blur: 20, color: theme.palette.error.main, opacity: 0.9 })
                    : {},
                padding: 0.5,
                color: (theme) => theme.palette.error.contrastText,
                minWidth: 40,
                borderRadius: 3,
              }}
            >
              {!!discount.discountPercent && (
                <Typography variant="subtitle2" sx={{ lineHeight: 0.9 }} fontWeight={600} dir="rtl">
                  {enNumToPer(discount.discountPercent)}%
                </Typography>
              )}
            </Stack>
          )}

          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ mt: 0.9 }}
          >
            <Stack direction="row">
              <SvgColor src="/assets/icons/products/ic_toman.svg" sx={{ width: 20, ml: 0.5 }} />
              <Typography variant="subtitle1" fontWeight={600}>
                {enNumToPerPrice(calcDiscount(price, discount?.discountPercent))}
              </Typography>
            </Stack>
            <Stack direction="row" justifyContent="flex-start" alignItems="center" sx={{ py: 0.1 }}>
              <Star sx={{ color: 'orange' }} fontSize="small" />
              <Typography variant="subtitle2" sx={{ opacity: '0.8' }} fontWeight={600}>
                {enNumToPer(rating)}
              </Typography>
            </Stack>
          </Stack>
          <Stack
            alignItems="flex-start"
            direction="row"
            justifyContent="space-between"
            dir="rtl"
            sx={{ mt: 0.7 }}
          >
            {/* <BuyButton /> */}
            <LoadingButton
              loading={isLoading}
              onClick={addToCart}
              variant="contained"
              disableElevation
              disableRipple
              size="small"
              color={isSuccess ? 'success' : 'primary'}
              sx={{ width: 'fit-content', minWidth: 'fit-content' }}
            >
              <Iconify
                sx={{ width: 20, height: 20 }}
                icon={isSuccess ? 'material-symbols:check' : 'fa-solid:cart-plus'}
              />
            </LoadingButton>

            {discount != null && !!discount?.discountPercent && (
              <Stack alignItems="flex-end">
                <Typography
                  variant="subtitle1"
                  fontWeight={600}
                  sx={{
                    textDecoration: 'line-through rgba(1,1,1,0.3)',
                    color: (theme) => alpha(theme.palette.grey[500], 1),
                    pr: 0,
                  }}
                >
                  {enNumToPerPrice(price)}
                </Typography>
                {/* <CountdownTimer endDate={discount?.end_date} /> */}
              </Stack>
            )}
          </Stack>
        </Box>
      </Link>
    </Paper>
  );
}

// ----------------------------------------------------------------------

// type CountDownProps = {
//   endDate: number | string;
// };

// const CountdownTimer = ({ endDate }: CountDownProps) => {
//   const [timeLeft, setTimeLeft] = useState({
//     hours: 0,
//     minutes: 0,
//     seconds: 0,
//   });

//   useEffect(() => {
//     const countDownDate = new Date(endDate).getTime();

//     const updateTimer = setInterval(() => {
//       const now = new Date().getTime();
//       const distance = countDownDate - now;

//       // Calculate the hours, minutes, and seconds
//       const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//       const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
//       const seconds = Math.floor((distance % (1000 * 60)) / 1000);

//       setTimeLeft({ hours, minutes, seconds });

//       if (distance < 0) {
//         clearInterval(updateTimer);
//         setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
//       }
//     }, 1000);

//     return () => clearInterval(updateTimer);
//   }, [endDate]);

//   return (
//     <Typography dir="ltr" color="error.main" fontWeight={600}>
//       {enNumToPer(timeLeft.hours)} : {enNumToPer(timeLeft.minutes)} : {enNumToPer(timeLeft.seconds)}
//     </Typography>
//   );
// };
