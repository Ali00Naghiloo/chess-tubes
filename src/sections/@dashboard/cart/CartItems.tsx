import { useState } from 'react';
import { toast } from 'react-toastify';
// next
import Link from 'next/link';
// @mui
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  IconButton,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { DeleteOutlineOutlined } from '@mui/icons-material';
// hooks
import useResponsive from '@/hooks/useResponsive';
// redux
import { useDispatch, useSelector } from '@/redux/store';
// components
import Iconify from '@/components/iconify/Iconify';
import Image from '@/components/image/Image';
import SvgColor from '@/components/svg-color/SvgColor';
import ConfirmationDialog from '@/components/delete-confirmation-dialog';
// utils
import { enNumToPer, enNumToPerPrice } from '@/utils/persianUtils';
// operators
import decreaseProductFromCart from '@/modules/cart/redux/operators/decreaseProductFromCart copy';
import addProductToCart from '@/modules/cart/redux/operators/addProductToCart';
// routes
import { PATH_PAGE } from '@/routes/paths';
// utils
import uuidv4 from '@/utils/uuidv4';
import { calcDiscount } from '@/utils/priceUtils';
// modules
import emptyCart from '@/modules/cart/redux/operators/emptyCart';
import removeItemFromCart from '@/modules/cart/redux/operators/removeItemFromCart';
// models
import { CartItem } from '@/modules/cart/models/cart';
//
import CartSide from './CartSide';

// ----------------------------------------------------------------------

export default function CartItems() {
  //
  const isDesktop = useResponsive('up', 'md');

  const { cartItems, totalCount } = useSelector((s) => s.cart);

  const dispatch = useDispatch();

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => {
    setIsDialogOpen(false);
  };

  const successCallback = (msg: string) => {
    toast.success(msg ?? 'با موفقیت حذف شد');
    setIsLoading(false);
  };

  const failureCallback = (msg: string) => {
    toast.error(msg ?? 'یه مشکلی پیش اومده');
    setIsLoading(false);
  };

  const deleteAllItemsFromCart = () => {
    setIsLoading(true);
    dispatch(emptyCart(successCallback, failureCallback));
  };

  return (
    <Box sx={{ flexGrow: 1, pt: 1 }}>
      <Paper variant="outlined">
        <Container sx={{ mt: 2 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="h5">سبد خرید شما</Typography>
              <Typography variant="caption">شامل {enNumToPer(totalCount)} محصول</Typography>
            </Box>
            <Button
              onClick={() => setIsDialogOpen(true)}
              color="inherit"
              startIcon={<DeleteOutlineOutlined />}
              sx={{ opacity: 0.6 }}
            >
              حذف همه
            </Button>
          </Stack>
        </Container>

        <Divider sx={{ my: 2, mb: 4 }} />
        <Stack spacing={4}>
          {cartItems?.map((p, i) => (
            <Stack key={p.itemId} spacing={2}>
              <Item {...p} />
              <Divider />
            </Stack>
          ))}

          {!isDesktop && <CartSide />}
        </Stack>
      </Paper>

      <ConfirmationDialog
        open={isDialogOpen}
        isLoading={isLoading}
        handleClose={handleClose}
        actionText="حذف همه"
        bodyText="همه کالاها از سبد خرید حذف شوند؟"
        headText="حذف همه کالاها از سبد خرید"
        action={deleteAllItemsFromCart}
      />
    </Box>
  );
}
// ----------------------------------------------------------------------

function Item({
  Title,
  image,
  discount,
  price,
  quantity,
  itemId,
  productId,
  messages,
  itemType,
}: CartItem) {
  return (
    <Link href={itemType === 'course' ? PATH_PAGE.course(productId) : PATH_PAGE.product(productId)}>
      <Stack direction="row" spacing={2} component={Container}>
        <Stack alignItems="center" spacing={2}>
          <Image
            src={PATH_PAGE.productImageUrl(image)}
            alt={Title}
            sx={{ width: 150, height: 150, borderRadius: 2 }}
          />
          <BuyButton
            itemId={itemId}
            itemType={itemType}
            quantity={Number(quantity)}
            productId={productId}
          />
        </Stack>

        <Stack flexGrow={1}>
          <Typography variant="subtitle1">{Title}</Typography>

          <Box sx={{ mt: 2 }}>
            {discount != null && discount !== 0 && (
              <Stack direction="row" alignItems="center">
                <Typography variant="overline" fontWeight={600} color="error.light">
                  {enNumToPerPrice(((Number(price) * Number(discount)) / 100) * Number(quantity))}
                </Typography>
                <SvgColor
                  src="/assets/icons/products/ic_toman.svg"
                  sx={{ width: 15, mx: 0.5, bgcolor: 'error.light' }}
                />
                <Typography variant="overline" fontWeight={600} color="error.light">
                  تخفیف
                </Typography>
              </Stack>
            )}
            <Stack direction="row" sx={{ mb: 1 }}>
              <Typography variant="h5" fontWeight={600}>
                {enNumToPerPrice(calcDiscount(Number(price) * Number(quantity), discount))}
              </Typography>
              <SvgColor src="/assets/icons/products/ic_toman.svg" sx={{ width: 20, ml: 0.5 }} />
            </Stack>
            {messages?.map((msg) => (
              <Alert key={uuidv4()} severity="info">
                <Typography fontWeight={600} variant="caption">
                  {msg}
                </Typography>
              </Alert>
            ))}
          </Box>
        </Stack>
      </Stack>
    </Link>
  );
}

// ----------------------------------------------------------------------

type BuyButtonProps = {
  quantity: number;
  productId: number | string;
  itemType: 'product' | 'course';
  itemId: string | number;
};

function BuyButton({ quantity, productId, itemType, itemId }: BuyButtonProps) {
  //

  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const failureCallback = (msg: string) => {
    setIsLoading(false);
    toast.error(msg);
  };

  const successCallback = () => {
    setIsLoading(false);
  };

  const handleIconClick = (type: 'increase' | 'decrease') => {
    if (type === 'decrease' && quantity >= 1) {
      setIsLoading(true);
      if (quantity === 1) {
        dispatch(removeItemFromCart(itemId, successCallback, failureCallback));
      } else {
        dispatch(decreaseProductFromCart(productId, successCallback, failureCallback));
      }
    } else if (type === 'increase' && quantity <= 9) {
      setIsLoading(true);
      dispatch(addProductToCart(productId, successCallback, failureCallback));
    }
  };

  return (
    <Stack
      sx={{
        border: 1,
        borderColor: 'primary.main',
        color: 'primary.main',
        borderRadius: 2,
        width: 'fit-content',
        minWidth: 50,
      }}
      direction="row"
      spacing={1}
      justifyContent="space-between"
      alignItems="center"
    >
      <IconButton
        onClick={(e) => {
          e.preventDefault();
          handleIconClick('increase');
        }}
        disabled={isLoading || itemType === 'course'}
        size="small"
        sx={{ color: 'primary.main' }}
      >
        <Iconify icon="ic:baseline-plus" />
      </IconButton>
      {isLoading ? (
        <CircularProgress size={20} />
      ) : (
        <Typography sx={{ userSelect: 'none' }} fontWeight="600">
          {enNumToPer(quantity)}
        </Typography>
      )}
      <IconButton
        disabled={isLoading}
        onClick={(e) => {
          e.preventDefault();
          handleIconClick('decrease');
        }}
        size="small"
        sx={{ color: 'primary.main' }}
      >
        <Iconify icon={quantity === 1 ? 'ic:outline-delete' : 'ic:baseline-minus'} />
      </IconButton>
    </Stack>
  );
}
