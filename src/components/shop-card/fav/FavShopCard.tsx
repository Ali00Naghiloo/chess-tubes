import { useState } from 'react';
import { toast } from 'react-toastify';
// redux
import { useDispatch } from '@/redux/store';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Link, Paper, PaperProps, Stack, Typography, alpha } from '@mui/material';
import { Delete, ShoppingCart, Star } from '@mui/icons-material';
// utils
import { bgBlur } from '@/utils/cssStyles';
// components
import Image from '@/components/image/';
import SvgColor from '@/components/svg-color/';
// models
import { FavProduct } from '@/modules/product/models/product';
// paths
import { PATH_PAGE } from '@/routes/paths';
// utils
import { enNumToPer, enNumToPerPrice } from '@/utils/persianUtils';
// modules
import addProductToCart from '@/modules/cart/redux/operators/addProductToCart';
import addOrRemoveProductFromFav from '@/modules/product/redux/operators/addOrRemoveProductFromFav';

// ----------------------------------------------------------------------

export type MiniShopCardProps = FavProduct &
  PaperProps & {
    offPrice?: string;
    offPercent?: string;
  };

export default function MiniShopCard({
  id,
  mainImage,
  title,
  price,
  rating,
  offPercent,
  offPrice,
  sx,
  ...other
}: MiniShopCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [operationType, setOperationType] = useState<null | 'del' | 'add'>(null);

  const dispatch = useDispatch();

  const successCallback = (msg: string) => {
    setIsLoading(false);
    setOperationType(null);
    toast.success(msg ?? 'با موفقیت انجام شد');
  };

  const failureCallback = (msg: string) => {
    setIsLoading(false);
    setOperationType(null);
    toast.success(msg ?? 'یه مشکلی پیش اومده');
  };

  const addToCart = () => {
    setIsLoading(true);
    setOperationType('add');
    dispatch(addProductToCart(id, successCallback, failureCallback));
  };

  const removeFromFav = () => {
    setIsLoading(true);
    setOperationType('del');
    dispatch(addOrRemoveProductFromFav(id, successCallback, failureCallback));
  };

  return (
    <Paper
      dir="ltr"
      variant="outlined"
      sx={{
        width: '100%',
        position: 'relative',
        cursor: 'pointer',
        ...sx,
      }}
      {...other}
    >
      <Link href={PATH_PAGE.product(id)} color="inherit" underline="none">
        <Stack direction="column">
          <Box sx={{ p: 2 }}>
            <Image
              alt={title}
              src={PATH_PAGE.productImageUrl(mainImage)}
              style={{ objectFit: 'contain' }}
              sx={{ width: '100%', height: 200, borderRadius: 2 }}
            />
          </Box>
          <Stack sx={{ flexGrow: 1 }} justifyContent="space-between">
            <Box dir="rtl" sx={{ mt: 1.5, flexGrow: 1, display: 'flex', alignItems: 'center' }}>
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
            <Box sx={{ px: 2 }}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ mt: 0.9 }}
              >
                <Stack sx={{ height: 75 }}>
                  <Stack
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center"
                    sx={{ py: 0.1 }}
                  >
                    <Star sx={{ color: 'orange' }} fontSize="small" />
                    <Typography variant="subtitle2" sx={{ opacity: '0.8' }} fontWeight={600}>
                      {enNumToPer(rating)}
                    </Typography>
                  </Stack>
                  <Stack direction="row">
                    <SvgColor
                      src="/assets/icons/products/ic_toman.svg"
                      sx={{ width: 20, ml: 0.5 }}
                    />
                    <Typography variant="subtitle1" fontWeight={600}>
                      {enNumToPerPrice(price)}
                    </Typography>
                  </Stack>

                  {offPrice != null && (
                    <Typography
                      variant="subtitle1"
                      fontWeight={600}
                      sx={{
                        textDecoration: 'line-through rgba(1,1,1,0.3)',
                        color: (theme) => alpha(theme.palette.grey[500], 1),
                        pr: 1,
                      }}
                    >
                      {offPrice}
                    </Typography>
                  )}
                </Stack>

                {offPrice != null && (
                  <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    sx={{
                      bgcolor: (theme) =>
                        bgBlur({ blur: 20, color: theme.palette.error.main, opacity: 0.9 }),
                      padding: 0.5,
                      color: (theme) => theme.palette.error.contrastText,
                      minWidth: 40,
                      borderRadius: 3,
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      sx={{ lineHeight: 0.9 }}
                      fontWeight={600}
                      dir="rtl"
                    >
                      {offPercent}
                    </Typography>
                  </Stack>
                )}
              </Stack>
            </Box>
          </Stack>
        </Stack>
      </Link>
      <Stack direction="row" dir="rtl" sx={{ p: 2 }} spacing={2}>
        <LoadingButton
          onClick={removeFromFav}
          loading={isLoading && operationType === 'del'}
          color="inherit"
          sx={{ opacity: 0.5, px: 2 }}
          variant="outlined"
          startIcon={<Delete />}
        >
          حذف
        </LoadingButton>
        <LoadingButton
          onClick={addToCart}
          loading={isLoading && operationType === 'add'}
          startIcon={<ShoppingCart />}
          variant="outlined"
          fullWidth
        >
          اضافه به سبد خرید
        </LoadingButton>
      </Stack>
    </Paper>
  );
}
