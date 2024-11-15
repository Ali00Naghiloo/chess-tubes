import { useState } from 'react';
import { toast } from 'react-toastify';
// components
import { IconButtonAnimate } from '@/components/animate';
import MenuPopover from '@/components/menu-popover';
import Scrollbar from '@/components/scrollbar/Scrollbar';
import SvgColor from '@/components/svg-color/SvgColor';
import Image from '@/components/image';
import EmptyContent from '@/components/empty-content';
import Iconify from '@/components/iconify';
// @mui
import {
  Badge,
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
// redux
import { useDispatch, useSelector } from '@/redux/store';
// routes
import { PATH_DASHBOARD, PATH_PAGE } from '@/routes/paths';
// utils
import { enNumToPer, enNumToPerPrice } from '@/utils/persianUtils';
import { calcDiscount } from '@/utils/priceUtils';
// operators
import addProductToCart from '@/modules/cart/redux/operators/addProductToCart';
import decreaseProductFromCart from '@/modules/cart/redux/operators/decreaseProductFromCart copy';
import removeItemFromCart from '@/modules/cart/redux/operators/removeItemFromCart';
// models
import { CartItem } from '@/modules/cart/models/cart';

// ----------------------------------------------------------------------

export default function CartPopover() {
  //

  const { totalCount, cartItems, totalPrice, totalDiscount } = useSelector((s) => s.cart);

  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  return (
    <>
      <Tooltip title="سبد خرید">
        <IconButtonAnimate
          color={openPopover ? 'primary' : 'default'}
          onClick={handleOpenPopover}
          sx={{ width: 40, height: 40 }}
        >
          <Badge
            badgeContent={totalCount}
            color="primary"
            anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
          >
            <SvgColor src="/assets/icons/navbar/ic_cart.svg" />
          </Badge>
        </IconButtonAnimate>
      </Tooltip>
      <MenuPopover
        arrow="top-left"
        open={openPopover}
        onClose={handleClosePopover}
        sx={{ width: 360, p: 0 }}
      >
        <Box dir="rtl" sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1">سبد خرید ({enNumToPer(totalCount || 0)})</Typography>
          </Box>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        {totalCount ? (
          <>
            <Scrollbar sx={{ height: 340 }}>
              <Stack spacing={2} sx={{ my: 2 }} divider={<Divider />}>
                {cartItems?.map((i) => <Item key={i.itemId} {...i} />)}
              </Stack>
            </Scrollbar>

            <Divider sx={{ borderStyle: 'dashed' }} />

            <Stack direction="row" sx={{ p: 1 }} justifyContent="space-between" alignItems="center">
              <Stack spacing={0.5}>
                <Typography variant="body2">مبلغ قابل پرداخت : </Typography>
                <Stack direction="row">
                  <Typography variant="subtitle1" fontWeight={600}>
                    {enNumToPerPrice(Number(totalPrice) - Number(totalDiscount))}
                  </Typography>
                  <SvgColor src="/assets/icons/products/ic_toman.svg" sx={{ width: 20, ml: 0.5 }} />
                </Stack>
              </Stack>

              <Button href={PATH_DASHBOARD.cart} disableRipple variant="contained" disableElevation>
                ثبت سفارش
              </Button>
            </Stack>
          </>
        ) : (
          <EmptyContent title="سبد خرید خالی میباشد" />
        )}
      </MenuPopover>
    </>
  );
}

// ----------------------------------------------------------------------

function Item({ Title, image, discount, price, quantity, productId, itemId, itemType }: CartItem) {
  return (
    <Stack direction="row" spacing={2} component={Container}>
      <Stack alignItems="center" spacing={2}>
        <Image
          src={PATH_PAGE.productImageUrl(image)}
          alt={Title}
          style={{ objectFit: 'contain' }}
          sx={{ width: 100, height: 100, borderRadius: 2 }}
        />
        <BuyButton
          itemType={itemType}
          itemId={itemId}
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
          <Stack direction="row">
            <Typography variant="h5" fontWeight={600}>
              {enNumToPerPrice(calcDiscount(Number(price) * Number(quantity), discount))}
            </Typography>
            <SvgColor src="/assets/icons/products/ic_toman.svg" sx={{ width: 20, ml: 0.5 }} />
          </Stack>
        </Box>
      </Stack>
    </Stack>
  );
}

// ----------------------------------------------------------------------

type BuyButtonProps = {
  quantity: number;
  productId: number | string;
  itemId: string | number;
  itemType: 'course' | 'product';
};

function BuyButton({ quantity, productId, itemId, itemType }: BuyButtonProps) {
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
